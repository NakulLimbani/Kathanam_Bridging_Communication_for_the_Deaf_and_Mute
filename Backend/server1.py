import os
import torch
import torchaudio
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load pre-trained model & processor for Gujarati Speech-to-Text
MODEL_NAME = "gchhablani/wav2vec2-large-xlsr-gu"
processor = Wav2Vec2Processor.from_pretrained(MODEL_NAME)
model = Wav2Vec2ForCTC.from_pretrained(MODEL_NAME)

# Ensure the temp_audio directory exists
TEMP_DIR = "temp_audio"
os.makedirs(TEMP_DIR, exist_ok=True)

def convert_and_resample_audio(audio_path):
    """Convert & resample audio to 16kHz for model compatibility"""
    waveform, original_sample_rate = torchaudio.load(audio_path)

    # Resample to 16kHz if necessary
    if original_sample_rate != 16000:
        resampler = torchaudio.transforms.Resample(orig_freq=original_sample_rate, new_freq=16000)
        waveform = resampler(waveform)

    # Convert stereo to mono
    if waveform.shape[0] > 1:
        waveform = torch.mean(waveform, dim=0, keepdim=True)

    return waveform.squeeze().numpy(), 16000

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    """Handles audio file upload & transcribes to text"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(TEMP_DIR, file.filename)
    file.save(file_path)

    try:
        # Convert and process audio
        audio_input, sample_rate = convert_and_resample_audio(file_path)
        input_values = processor(audio_input, sampling_rate=sample_rate, return_tensors="pt", padding=True).input_values

        # Perform inference
        with torch.no_grad():
            logits = model(input_values).logits

        # Decode transcription
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)[0]

        return jsonify({"transcription": transcription})  # Return transcribed text

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        os.remove(file_path)  # Clean up temp file

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
