import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";

const initialState = {
    enrollments: enrollments,
    enrollment: {
        user: "",
        course: ""
    }
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, action) => {
            const { user, course } = action.payload;

            const alreadyEnrolled = state.enrollments.some(
                (enrollment) => enrollment.user === user && enrollment.course === course
            );

            if (!alreadyEnrolled) {
                state.enrollments.push({
                    user,
                    course,
                    _id: new Date().getTime().toString(),
                });
            }

            state.enrollment = { user: "", course: "" };
        },
        removeEnrollment: (state, action) => {
            const { user, course } = action.payload;
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === user && enrollment.course === course)
            );
        },
    }
});
export const { addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;