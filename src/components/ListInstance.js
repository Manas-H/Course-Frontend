// src/components/ListCourseInstances.js
import React, { useState } from "react";
import {
  getCourseInstances,
  deleteCourseInstanceById,
  getCourseInstanceById,
} from "../api/course";

const ListInstance = () => {
  const [instances, setInstances] = useState([]);
  const [instanceDetails, setInstanceDetails] = useState(null);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const fetchInstances = () => {
    if (year && semester) {
      getCourseInstances(year, semester)
        .then((response) => setInstances(response.data))
        .catch((error) =>
          console.error(
            "There was an error fetching the course instances!",
            error
          )
        );
    } else {
      alert("Please enter both year and semester");
    }
  };

  const handleDelete = (id) => {
    if (year && semester) {
      deleteCourseInstanceById(year, semester, id)
        .then(() => {
          setInstances(instances.filter((instance) => instance.id !== id));
        })
        .catch((error) =>
          console.error(
            "There was an error deleting the course instance!",
            error
          )
        );
    }
  };

  const handleViewDetails = (id) => {
    if (year && semester) {
      getCourseInstanceById(year, semester, id)
        .then((response) => {
          setInstanceDetails(response.data);
          console.log(response.data);
        })
        .catch((error) =>
          console.error(
            "There was an error fetching the course instance details!",
            error
          )
        );
    }
  };

  return (
    <div className="border-t-2 border-gray-300 my-5">
      <div className=" flex items-center justify-start mx-10 my-6">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-1 mx-2"
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-1 mx-2"
        />
        <button
          onClick={fetchInstances}
          className="bg-blue-600 text-white text-sm font-semibold p-1 rounded-sm px-3 mx-2 hover:bg-blue-400"
        >
          List Instances
        </button>
      </div>

      {instances.length > 0 && (
        <table border="1" className="w-[90%] mx-auto">
          <thead>
            <tr className="bg-blue-500 text-white shadow-xl">
              <th className="md:w-[40%] p-1 pl-3 text-start">Course Title</th>
              <th className="p-1 pl-3 text-start">Year-Semester</th>
              <th className="p-1 pl-3 text-start">Code</th>
              <th className="p-1 pl-3 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((instance, index) => (
              <tr
                key={instance.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-blue-200"}`}
              >
                <td className="md:w-[40%] p-1 pl-3 text-start">
                  {instance.course?.title || "Unknown"}
                </td>
                <td className="border-l border-blue-600 p-1 pl-3 text-start">
                  {instance.year}-{instance.semester}
                </td>
                <td className="border-l border-blue-600 p-1 pl-3 text-start">
                  {instance.course?.code || "Unknown"}
                </td>
                <td className="border-l border-blue-600 p-1 pl-3 text-start">
                  <button onClick={() => handleViewDetails(instance.id)}>
                    <i className="fa fa-search bg-black text-white p-1" />
                  </button>
                  <button onClick={() => handleDelete(instance.id)}>
                    <i className="fa fa-trash pl-3 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {instanceDetails && (
        <div className="absolute z-50 md:left-[450px] flex flex-col items-start border border-gray-400 bg-white rounded-md shadow-lg p-4">
          <button
            className="text-white bg-red-600 p-1 rounded-md"
            onClick={() => setInstanceDetails(null)}
          >
            Close
          </button>
          <h3>Instance Details</h3>
          <p>Course Title: {instanceDetails.course?.title || "Unknown"}</p>
          <p>Year: {instanceDetails.year}</p>
          <p>Semester: {instanceDetails.semester}</p>
          <p>Course Code: {instanceDetails.course?.code || "Unknown"}</p>
        </div>
      )}
    </div>
  );
};

export default ListInstance;
