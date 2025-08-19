import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API);
    return data;
};

export const fetchEnrollmentsForUser = async (userId: string) => {
    const { data } = await axios.get(`${USERS_API}/${userId}/enrollments`);
    return data;
};

export const fetchEnrollmentsForCourse = async (courseId: string) => {
    const { data } = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
    return data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const { data } = await axios.post(`${USERS_API}/${userId}/courses/${courseId}/enroll`);
    return data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    const { data } = await axios.delete(`${USERS_API}/${userId}/courses/${courseId}/unenroll`);
    return data;
};