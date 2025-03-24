import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blog = () => {
  const stories = [
    {
      title: "Helen Keller: Overcoming Blindness & Deafness",
      description:
        "Helen Keller, despite being both deaf and blind, became an advocate for people with disabilities, an author, and a lecturer.",
      details:
        "Helen Keller's story is one of resilience and determination. Despite her disabilities, she achieved incredible feats and became a symbol of strength and inspiration for people worldwide.",
    },
    {
      title: "Nyle DiMarco: Advocate for the Deaf Community",
      description:
        "Nyle DiMarco, winner of America's Next Top Model, is a proud deaf man who advocates for deaf culture.",
      details:
        "Nyle DiMarco not only won America's Next Top Model but is also an advocate for the deaf community, working to promote accessibility and acceptance of sign language.",
    },
    {
      title: "Marlee Matlin: Award-Winning Actress",
      description:
        "Marlee Matlin is a deaf actress who won an Academy Award for Best Actress for her role in 'Children of a Lesser God.'",
      details:
        "Marlee Matlin’s accomplishments in film and television have earned her recognition as one of the most talented actresses, breaking barriers for deaf performers in Hollywood.",
    },
    {
      title: "The Story of Sudha Chandran: A Dancer Overcoming Amputation",
      description:
        "Sudha Chandran lost her leg in an accident but became a famous Indian classical dancer, symbolizing resilience.",
      details:
        "Sudha Chandran's journey as a classical dancer after losing her leg in an accident is a testament to the power of perseverance and determination.",
    },
    {
      title: "Dr. V. Shantha: Breaking Barriers in Medicine",
      description:
        "Dr. V. Shantha was a pioneering oncologist who made groundbreaking contributions to cancer treatment.",
      details:
        "Dr. V. Shantha’s work in the field of oncology revolutionized cancer treatment, and she has inspired countless individuals through her medical and humanitarian work.",
    },
    {
      title: "Pranav Deshpande: A Blind Runner",
      description:
        "Pranav Deshpande, a blind marathon runner from India, has completed multiple marathons, proving blindness is not a limitation.",
      details:
        "Pranav Deshpande’s success in marathon running showcases the power of the human spirit and proves that with determination, limitations can be overcome.",
    },
  ];

  return (
    <div className="container mt-5">
      <div
        className="blog-header text-center"
        style={{
          backgroundColor: "#f28500",
          color: "white",
          padding: "50px 0",
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <h1 className="fw-bold">Inspiring Stories</h1>
        <p className="mt-2">Learn from ISL, ASL, & Autism Communities</p>
      </div>

      <div className="row mt-5">
        {stories.map((story, index) => (
          <motion.div
            className="col-md-4 mb-4 d-flex align-items-stretch"
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="card shadow-lg"
              style={{
                border: "none",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              <div className="card-body">
                <Link to={`/blog/${index}`} className="text-decoration-none">
                  <h5 className="card-title text-dark fw-bold">{story.title}</h5>
                </Link>
                <p className="card-text text-secondary">{story.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .container {
          padding: 20px 15px;
        }

        .blog-header h1 {
          font-size: 2.5rem;
        }

        .blog-header p {
          font-size: 1.2rem;
          font-weight: 400;
        }

        .card-body h5 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .card-body p {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Blog;
