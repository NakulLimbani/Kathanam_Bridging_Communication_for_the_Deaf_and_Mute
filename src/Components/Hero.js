import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  // Importing framer-motion for animations

const Hero = () => {
  // Simulating user login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the user is logged in
    // This should be replaced with actual logic (e.g., checking token, user data)
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Text & Buttons */}
          <div className="col-lg-6 col-md-12 text-left">
            <h1>
              <span className="text-green">Studying</span> Online is now <br />
              much easier
            </h1>
            <p className="lead">
              Welcome Back! <br />
              {isLoggedIn ? `Glad to see you, ${userName}!` : "Glad to see you, Again!"}
            </p>

            {/* CTA Buttons */}
            <div className="d-flex align-items-center gap-3 mt-3">
              {!isLoggedIn ? (
                <Link to="/login" className="btn join-btn">Join for free</Link>
              ) : (
                <button className="btn join-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
              )}
              <a
                href="https://youtu.be/NaV3U9siRWw?si=3T17bcFe67rV5X_K"
                className="watch-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="play-icon">▶</span> Watch how it works
              </a>
            </div>
          </div>

          {/* Right Side - Logo & Floating Cards */}
          <div className="col-lg-6 col-md-12 position-relative text-center">
            {/* Your Logo */}
            <img src="/logo-Photoroom.png" alt="Kathanam Logo" className="hero-logo" />

            {/* Floating Cards with motion animation */}
            <div className="d-flex justify-content-around mt-4">
              <motion.div
                className="floating-card card-1"
                animate={{ x: [0, 10, 0], y: [0, -10, 0] }} // Move the card in a small bouncing animation
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="icon">📊</span>
                <p><strong>250k</strong> Assisted Students</p>
              </motion.div>

              <motion.div
                className="floating-card card-2"
                animate={{ x: [0, -10, 0], y: [0, 10, 0] }} // Another card with different motion
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="icon">🎉</span>
                <p><strong>Congratulations</strong> <br /> Your Registration Completed</p>
              </motion.div>

              <motion.div
                className="floating-card card-3"
                animate={{ x: [0, 10, 0], y: [0, 5, 0] }} // Similar bouncing effect for the 3rd card
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="icon">🎥</span>
                <p><strong>User Experience Videos</strong> <br /> Today at 12:00 PM</p>
                <Link to="/experience-videos" className="btn join-now-btn">Join Now</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curved Shape */}
      <div className="bottom-curve"></div>

      {/* Embedded CSS */}
      <style>{`
        /* Hero Section */
        .hero-section {
          background: linear-gradient(to right, rgba(204, 99, 25, 0.9), rgba(219, 109, 23, 0.9)), url('/path-to-your-image.jpg') no-repeat center center;
          background-size: cover;
          padding: 100px 0 50px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        /* Headings & Text */
        .hero-section h1 {
          font-size: 3.5rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .text-green {
          color: #198754;
        }

        .lead {
          font-size: 1.4rem;
          margin-top: 10px;
        }

        /* Buttons */
        .join-btn {
          background-color: #f8c794;
          color: black;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: bold;
          text-decoration: none;
        }

        .watch-link {
          display: flex;
          align-items: center;
          color: white;
          font-weight: bold;
          text-decoration: none;
        }

        .play-icon {
          background-color: white;
          color: black;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          font-size: 1.2rem;
        }

        /* Right Side Logo */
        .hero-logo {
          width: 320px;
          height: 320px;
          object-fit: contain;
          margin-top: 20px;
        }

        /* Floating Cards */
        .floating-card {
          background: rgba(255, 255, 255, 0.9); /* Slight opacity for better clarity */
          color: #333;
          font-weight: bold;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          font-size: 1rem;
          min-width: 200px;
        }

        .floating-card p {
          margin: 0;
          font-size: 1rem;
          color: #333;
        }

        .floating-card strong {
          color: #000;
        }

        /* Card Layout for User Experience Video */
        .card-1, .card-2, .card-3 {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
        }

        .icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .join-now-btn {
          background-color: #d63384;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
        }

        /* Bottom Curve */
        .bottom-curve {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: white;
          border-top-left-radius: 50% 80px;
          border-top-right-radius: 50% 80px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-section {
            text-align: center;
            padding-bottom: 80px;
          }

          .hero-section h1 {
            font-size: 2.8rem;
          }

          .floating-card {
            position: static;
            margin: 10px auto;
          }

          .floating-card.card-3 {
            flex-direction: column;
            text-align: center;
          }

          .hero-logo {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
