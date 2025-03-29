import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)

# Allow requests only from your frontend domain in production
CORS(app, origins=["https://kathanam-bridging-communication-for-the-deaf-and-mute.vercel.app"])  # Replace with your actual frontend URL

# Load the trained model (.h5)
MODEL_PATH = r"numbers_sign_language_model_mobilenetv2.h5" 
model = tf.keras.models.load_model(MODEL_PATH) # Ensure the model file is in the correct folder

# Define class labels (adjust based on your dataset)
CLASS_LABELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

def preprocess_image(image):
    """Preprocess image for prediction"""
    image = image.resize((64, 64))  # Resize to match model input
    image = np.array(image) / 255.0  # Normalize pixels
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
def predict():
    """Handle image prediction"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))  # Open image
    processed_image = preprocess_image(image)  # Preprocess for model

    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get highest probability class

    return jsonify({"predicted_number": int(CLASS_LABELS[predicted_class])})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render gives PORT dynamically
    app.run(host="0.0.0.0", port=port, debug=True)
