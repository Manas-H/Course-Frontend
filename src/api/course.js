import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const createCourse = (course) => {
    return axios.post(`${API_BASE_URL}/courses`, course);
};

export const createCourseInstance = (instance) => {
    return axios.post(`${API_BASE_URL}/instances`, instance);
};

export const getCourses = () => {
    return axios.get(`${API_BASE_URL}/courses`);
};

export const getCourseById = (id) => {
    return axios.get(`${API_BASE_URL}/courses/${id}`);
};

export const deleteCourseById = (id) => {
    return axios.delete(`${API_BASE_URL}/courses/${id}`);
};

export const getCourseInstances = (year, semester) => {
    return axios.get(`${API_BASE_URL}/instances/${year}/${semester}`);
};

export const getCourseInstanceById = (year, semester, id) => {
    return axios.get(`${API_BASE_URL}/instances/${year}/${semester}/${id}`);
};

export const deleteCourseInstanceById = (year, semester, id) => {
    return axios.delete(`${API_BASE_URL}/instances/${year}/${semester}/${id}`);
};
