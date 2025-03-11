import React from "react";

const Translator = () => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #264653, #2A9D8F)",
        padding: "50px 0",
      }}
    >
      <h2
        className="text-center text-white"
        style={{
          textShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        Translator Page
      </h2>
      <p className="text-center text-white mt-3" style={{ fontSize: "1.2rem" }}>
        This page will contain our Speech-to-Text, Text-to-Speech, and other
        models.
      </p>
    </div>
  );
};

export default Translator;
