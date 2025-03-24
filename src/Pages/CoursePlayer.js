import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const courseData = {
  isl: {
    Beginner: {
      title: "ISL Beginner Course",
      lessons: [
        { id: "Vj_13bdU4dU", title: "Lesson 1: ISL Basics" },
        { id: "vnH2BmcSRMA", title: "Lesson 2: Common Phrases" },
        { id: "qtrBGmioR2Q", title: "Lesson 3: Basic Signs" },
      ],
    },
    Intermediate: {
      title: "ISL Intermediate Course",
      lessons: [
        { id: "VtbYvVDItvg", title: "Lesson 1: Intermediate Signs" },
        { id: "lffGJ29IhZQ", title: "Lesson 2: Complex Sentences" },
        { id: "vGRP1nFPS80", title: "Lesson 3: Expressive Signs" },
      ],
    },
    Advanced: {
      title: "ISL Advanced Course",
      lessons: [
        { id: "DOFPRw6Epl0", title: "Lesson 1: Advanced Conversations" },
        { id: "XiyJFuz01PE", title: "Lesson 2: Emotions & Expressions" },
        { id: "8sLVNe576BM", title: "Lesson 3: Storytelling in ISL" },
      ],
    },
  },
  asl: {
    Beginner: {
      title: "ASL Beginner Course",
      lessons: [
        { id: "DBQINq0SsAw", title: "Lesson 1: ASL Basics" },
        { id: "0FcwzMq4iWg", title: "Lesson 2: Common Phrases" },
        { id: "6w1ZDaE-whc", title: "Lesson 3: Basic Signs" },
      ],
    },
    Intermediate: {
      title: "ASL Intermediate Course",
      lessons: [
        { id: "U9KnRdcWL7Y", title: "Lesson 1: Intermediate Signs" },
        { id: "uKtIdUxUqcA", title: "Lesson 2: Complex Sentences" },
        { id: "qm2-kiYSzSs", title: "Lesson 3: Expressive Signs" },
      ],
    },
    Advanced: {
      title: "ASL Advanced Course",
      lessons: [
        { id: "VOnHnaNiVSM", title: "Lesson 1: Advanced Conversations" },
        { id: "i4cMA5yzDlw", title: "Lesson 2: Emotions & Expressions" },
        { id: "K2RUbjE6jA8", title: "Lesson 3: Storytelling in ASL" },
      ],
    },
  },
  autistic: {
    Beginner: {
      title: "Autistic Communication Beginner Course",
      lessons: [
        { id: "8xpjvvS4048", title: "Lesson 1: Basic Signs" },
        { id: "2krqjvHQSCY", title: "Lesson 2: Common Phrases" },
        { id: "cOLFgnLp0E4", title: "Lesson 3: Simple Signs" },
      ],
    },
    Intermediate: {
      title: "Autistic Communication Intermediate Course",
      lessons: [
        { id: "Dl79ZADT0Zg", title: "Lesson 1: Intermediate Signs" },
        { id: "dt3jm6_-UoA", title: "Lesson 2: Complex Sentences" },
        { id: "L9ij9b9JAiw", title: "Lesson 3: Expressive Signs" },
      ],
    },
    Advanced: {
      title: "Autistic Communication Advanced Course",
      lessons: [
        { id: "qtf8DOUq8uk", title: "Lesson 1: Advanced Techniques" },
        { id: "qtf8DOUq8uk", title: "Lesson 2: Advanced Conversation" },
        { id: "EBHwZjsR-Fc", title: "Lesson 3: Storytelling" },
      ],
    },
  },
};

const CoursePlayer = () => {
  const { courseId, level } = useParams();
  const course = courseData[courseId][level];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};
    setCompletedLessons(savedProgress[courseId] || []);
  }, [courseId]);

  const handleVideoEnd = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      const updatedCompleted = [...completedLessons, currentLessonIndex];
      setCompletedLessons(updatedCompleted);
      localStorage.setItem("progress", JSON.stringify({ ...completedLessons, [courseId]: updatedCompleted }));
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const videoCompletionPercentage = ((currentLessonIndex + 1) / course.lessons.length) * 100;

  return (
    <div className="course-container">
      <aside className="course-sidebar">
        <h2>{course.title}</h2>
        <ul className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <li
              key={index}
              className={`lesson-item ${currentLessonIndex === index ? "active" : ""}`}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </aside>

      <div className="video-container">
        <h3>{course.lessons[currentLessonIndex].title}</h3>
        <iframe
          src={`https://www.youtube.com/embed/${course.lessons[currentLessonIndex].id}`}
          title="Course Video"
          className="video-player"
          allowFullScreen
          onEnded={handleVideoEnd}
        ></iframe>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${videoCompletionPercentage}%` }}></div>
        </div>
        <p className="progress-text">{Math.round(videoCompletionPercentage)}% Completed</p>
        <div className="nav-buttons">
          <button onClick={handlePrevLesson} disabled={currentLessonIndex === 0}>
            ⬅ Previous
          </button>
          <button onClick={handleNextLesson} disabled={currentLessonIndex === course.lessons.length - 1}>
            Next ➡
          </button>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        .course-container {
          display: flex;
          min-height: 100vh;
          padding: 20px;
          background: #f5f5f5;
        }

        .course-sidebar {
          width: 25%;
          background: #fff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .course-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #2a9d8f;
        }

        .lesson-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }

        .lesson-item {
          padding: 10px;
          background: #fff;
          margin: 5px 0;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        .lesson-item:hover {
          background: #e0e0e0;
        }

        .lesson-item.active {
          background: #2a9d8f;
          color: #fff;
        }

        .video-container {
          width: 75%;
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .video-player {
          width: 100%;
          height: 400px;
          border-radius: 10px;
        }

        .progress-container {
          width: 100%;
          height: 8px;
          background: #ddd;
          border-radius: 5px;
          margin-top: 20px;
        }

        .progress-bar {
          height: 8px;
          background: #2a9d8f;
          border-radius: 5px;
        }

        .progress-text {
          text-align: center;
          font-size: 1rem;
          margin-top: 5px;
          font-weight: bold;
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .nav-buttons button {
          padding: 10px;
          background: #2a9d8f;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s ease;
        }

        .nav-buttons button:hover {
          background: #21867a;
        }

        @media (max-width: 768px) {
          .course-container {
            flex-direction: column;
          }

          .course-sidebar {
            width: 100%;
            margin-bottom: 20px;
          }

          .video-container {
            width: 100%;
          }

          .video-player {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default CoursePlayer;
