import React, { useState, useEffect } from "react";
import { createCourseInstance, getCourses } from "../api/course";

const AddCourseInstance = () => {
  const [instance, setInstance] = useState({
    year: "",
    semester: "",
    course: { id: "" },
  });
  const [courses, setCourses] = useState([]);

  const getCourseData = () => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
        console.log("this is data", response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching courses!", error)
      );
  };
  useEffect(() => {
    getCourseData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstance({ ...instance, [name]: value });
  };

  const handleCourseChange = (e) => {
    setInstance({ ...instance, course: { id: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", instance);
    createCourseInstance(instance)
      .then((response) => {
        alert("Course instance created!");
        setInstance({ year: "", semester: "", course: { id: "" } });
      })
      .catch((error) =>
        console.error("There was an error creating the course instance!", error)
      );
  };

  return (
    <div>
      {/* <h2>Create Course Instance</h2> */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="flex items-center">
          {/* Course: */}
          <select
            name="course"
            onChange={handleCourseChange}
            value={instance.course.id}
            className="p-1 border border-gray-300 "
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <span
            type="submit"
            className="bg-blue-600 text-white text-sm font-semibold p-1 rounded-sm px-3 mx-2 cursor-pointer hover:bg-blue-400"
            onClick={getCourseData}
          >
            refresh
          </span>
        </label>
        <label className="flex items-center">
          {/* Year: */}
          <input
            type="number"
            name="year"
            placeholder="Year"
            className="p-1 border border-gray-300 mx-5 my-2 placeholder:pl-2"
            value={instance.year}
            onChange={handleChange}
          />
          {/* Semester: */}
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            className="p-1 border border-gray-300 mx-5 placeholder:pl-2"
            value={instance.semester}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white text-sm font-semibold p-2 rounded-sm w-32 mx-auto hover:bg-blue-400"
        >
          Create Instance
        </button>
      </form>
    </div>
  );
};

export default AddCourseInstance;
