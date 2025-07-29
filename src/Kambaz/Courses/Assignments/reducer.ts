import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
    assignment: { 
        _id: "",
        title: "",
        course: "",
        description: "",
        points: 100,
        due: "",
        available: "",
        until: "",
    }
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description || "",
                points: assignment.points || 100,
                due: assignment.due,
                available: assignment.available,
                until: assignment.until || assignment.due,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
            
            state.assignment = { // Reset
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 100,
                due: "",
                available: "",
                until: "",
            };
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
            

            state.assignment = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 100,
                due: "",
                available: "",
                until: "",
            };
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            ) as any;
        },
        cancelEditAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: false } : a
            ) as any;
        },
        setAssignment: (state, { payload: assignment }) => {
            // For loading assignment data into the editor
            state.assignment = assignment;
        },
        clearAssignment: (state) => {
            // For creating new assignments
            state.assignment = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 100,
                due: "",
                available: "",
                until: "",
            };
        },
    },
});

export const { 
    addAssignment, 
    deleteAssignment, 
    updateAssignment, 
    editAssignment,
    cancelEditAssignment,
    setAssignment,
    clearAssignment
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;