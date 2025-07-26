import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
    courses: courses,
    course: {
        _id: "1234",
        name: "New Course",
        number: "New Number",
        image: "course.jpg",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
    }
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state) => {
            const newCourse = {
                ...state.course,
                _id: new Date().getTime().toString(),
            };
            state.courses = [...state.courses, newCourse] as any;

            // Reset course form after adding
            state.course = {
                _id: "1234",
                name: "New Course",
                number: "New Number",
                image: "course.jpg",
                startDate: "2023-09-10",
                endDate: "2023-12-15",
                description: "New Description",
            };
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (course: any) => course._id !== courseId
            );
        },
        updateCourse: (state) => {
            state.courses = state.courses.map((c: any) =>
                c._id === state.course._id ? state.course : c
            );

            state.course = {
                _id: "1234",
                name: "New Course",
                number: "New Number",
                image: "course.jpg",
                startDate: "2023-09-10",
                endDate: "2023-12-15",
                description: "New Description",
            };
        },
        setCourse: (state, { payload: course }) => {
            state.course = course;
        },
    },
});

export const {
    addNewCourse,
    deleteCourse,
    updateCourse,
    setCourse
} = coursesSlice.actions;

export default coursesSlice.reducer;