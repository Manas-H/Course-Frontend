import React, { useState } from "react";
import { getCourses, deleteCourseById, getCourseById } from "../api/course";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);

  const fetchCourses = () => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
        // console.log(response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching the courses!", error)
      );
  };

  const handleDelete = (id) => {
    deleteCourseById(id)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((error) =>
        console.error("There was an error deleting the course!", error)
      );
  };

  const handleViewDetails = (id) => {
    getCourseById(id)
      .then((response) => setCourseDetails(response.data))
      .catch((error) =>
        console.error("There was an error fetching the course details!", error)
      );
  };

  return (
    <div className="border-t-2 border-gray-300 my-5">
      {/* <h2>Courses</h2> */}
      <button
        onClick={fetchCourses}
        className="bg-blue-600 text-white text-sm font-semibold p-1 rounded-sm px-3 mx-2 mt-5 hover:bg-blue-400"
      >
        List Courses
      </button>

      {courses.length > 0 && (
        <table border="1" className=" w-[90%] mx-auto my-2">
          <thead className="">
            <tr className="bg-blue-500 text-white shadow-xl">
              <th className="md:w-[70%] p-1 pl-3 text-start">Course Title</th>
              <th className="p-1 pl-3 text-start">Code</th>
              <th className="p-1 pl-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-blue-200"}`}
              >
                <td className="md:w-[70%] p-1 pl-3 text-start">
                  {course.title}
                </td>
                <td className="border-l border-blue-600 p-1 pl-3 text-start">
                  {course.code}
                </td>
                <td className="border-l border-blue-600 p-1 pl-3 text-start">
                  <button onClick={() => handleViewDetails(course.id)}>
                    <i className="fa fa-search bg-black text-white p-1" />
                  </button>
                  <button onClick={() => handleDelete(course.id)}>
                    <i className="fa fa-trash pl-3 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {courseDetails && (
        <div className="absolute z-50 md:left-[450px] flex flex-col items-start border border-gray-400 bg-white rounded-md shadow-lg p-4">
          <button
            className="text-white bg-red-600 p-1 rounded-md"
            onClick={() => setCourseDetails(null)}
          >
            Close
          </button>
          <h3>Course Details</h3>
          <p>Title: {courseDetails.title}</p>
          <p>Code: {courseDetails.code}</p>
          <p>Description: {courseDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default ListCourses;
