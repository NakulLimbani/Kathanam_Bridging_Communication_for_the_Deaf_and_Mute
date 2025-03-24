import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Course data for all three courses
const courseData = {
  isl: {
    Beginner: {
      description: "Learn the basics of ISL, including the alphabet, common words, and simple phrases.",
      videoId: "Vj_13bdU4dU",
    },
    Intermediate: {
      description: "Enhance your ISL skills with more complex sentences and grammar structures.",
      videoId: "VtbYvVDItvg",
    },
    Advanced: {
      description: "Master ISL with fluent conversation practice and advanced signing techniques.",
      videoId: "DOFPRw6Epl0",
    },
  },
  asl: {
    Beginner: {
      description: "Learn the basics of ASL, including the alphabet, common signs, and basic conversation.",
      videoId: "DBQINq0SsAw",
    },
    Intermediate: {
      description: "Improve your ASL skills with more complex conversation and sentence structures.",
      videoId: "U9KnRdcWL7Y",
    },
    Advanced: {
      description: "Master ASL with fluent conversation and advanced signing techniques.",
      videoId: "VOnHnaNiVSM",
    },
  },
  autistic: {
    Beginner: {
      description: "Learn basic communication methods for autism support.",
      videoId: "8xpjvvS4048",
    },
    Intermediate: {
      description: "Enhance your autism communication support skills.",
      videoId: "Dl79ZADT0Zg",
    },
    Advanced: {
      description: "Master advanced autism communication strategies.",
      videoId: "qtf8DOUq8uk",
    },
  },
};

const LevelSelection = () => {
  const { courseId } = useParams(); // Get the course ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Explore ${courseId.toUpperCase()} Course`;
  }, [courseId]);

  const levels = Object.keys(courseData[courseId] || {});

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #264653, #2A9D8F)",
        minHeight: "100vh",
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
        Explore {courseId.toUpperCase()} Course
      </h2>

      <div className="row w-75 mt-4">
        {levels.map((level, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="card shadow-lg text-center p-4"
              style={{
                borderRadius: "20px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#ffffff",
                padding: "20px",
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {/* Course Image */}
              <div
                className="image-frame"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${courseData[courseId][level].videoId}/hqdefault.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "180px",
                  borderRadius: "15px",
                }}
              ></div>

              <h5 className="text-dark mt-3" style={{ fontWeight: "bold" }}>
                {level} Level
              </h5>
              <p className="text-secondary">{courseData[courseId][level].description}</p>

              <button
                className="btn btn-primary w-100 mt-3"
                style={{
                  borderRadius: "10px",
                  padding: "12px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => navigate(`/course-player/${courseId}/${level}`)}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#2A9D8F")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1F7A67")}
              >
                Start {level} Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
