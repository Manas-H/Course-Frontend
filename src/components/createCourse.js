import React, { useState } from "react";
import { createCourse } from "../api/course";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    code: "",
    description: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse(course)
      .then((response) => {
        alert("Course created!");
        setCourse({ title: "", code: "", description: "" });
      })
      .catch((error) =>
        console.error("There was an error creating the course!", error)
      );
  };

  return (
    <div>
      {/* <h2>Create Course</h2> */}
      <form onSubmit={handleSubmit}>
        <label className="bg-red-600">
          {/* Title: */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            className="m-10"
            value={course.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Code:
          <input
            type="text"
            name="code"
            value={course.code}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
