import React, { useState } from "react";
import { createCourse } from "../api/course";

const AddCourse = () => {
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
      .catch((error) => {
        let errorMessage = "An unexpected error occurred."; // Default message

        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }

        alert(`Error: ${errorMessage}`);
        console.error("There was an error creating the course!", error);
      });
  };

  return (
    <div>
      {/* <h2>Create Course</h2> */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="">
          {/* Title: */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            className="p-1 border border-gray-300 w-96"
            value={course.title}
            onChange={handleChange}
          />
        </label>

        <label className="my-3">
          {/* Code: */}
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            className="p-1 border border-gray-300 w-96"
            value={course.code}
            onChange={handleChange}
          />
        </label>

        <label>
          {/* Description: */}
          <textarea
            name="description"
            placeholder="Course description"
            className="p-1 border border-gray-300 w-96"
            value={course.description}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white text-sm font-semibold p-2 rounded-sm w-32 mx-auto hover:bg-blue-400"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
