import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrollments: [] as any[],
    enrollment: {
        user: "",
        course: ""
    }
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        // Set all enrollments from server
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        
        // Add enrollment
        addEnrollment: (state, action) => {
            const newEnrollment = action.payload;
            
            // Check if already exists to avoid duplicates
            const alreadyEnrolled = state.enrollments.some(
                (enrollment: any) => enrollment.user === newEnrollment.user && enrollment.course === newEnrollment.course
            );

            if (!alreadyEnrolled) {
                state.enrollments.push(newEnrollment);
            }
            
            state.enrollment = { user: "", course: "" };
        },
        
        // Remove enrollment
        removeEnrollment: (state, action) => {
            const { user, course } = action.payload;
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => !(enrollment.user === user && enrollment.course === course)
            );
        },
    }
});

export const { addEnrollment, removeEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;