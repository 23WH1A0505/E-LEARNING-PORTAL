import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

function CourseEnrollment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  const uniqueCourses = (items) => {
    const map = new Map();
    items.forEach((course) => {
      const key = course.title ? course.title.trim().toLowerCase() : course._id;
      if (key && !map.has(key)) {
        map.set(key, course);
      }
    });
    return Array.from(map.values());
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCourses(uniqueCourses(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEnroll = async (course) => {
    if (!user?._id) {
      alert("Please login to enroll");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/enroll", {
        studentId: user._id,
        courseId: course._id,
      });

      alert(res.data.msg || "Enrolled successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {courses.map((c) => (
          <CourseCard key={c._id || c.title} course={c} onEnroll={handleEnroll} />
        ))}
      </div>
    </div>
  );
}

export default CourseEnrollment;
