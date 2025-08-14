import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        _id: "",
        title: "",
        course: "",
        description: "",
        points: 0,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: true,
        minutes: 20,
        allowMultipleAttempts: false,
        attemptsAllowed: 1,
        showCorrectAnswers: true,
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestions: false,
        accessCode: "",
        assignTo: "Everyone",
        due: "",
        availableFrom: "",
        availableUntil: "",
        status: "unpublished",
        questions: []
    }
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            // Add the new quiz returned from the server (with real _id)
            state.quizzes = [...state.quizzes, quiz] as any;
            
            // Clear the form
            state.quiz = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 0,
                quizType: "Graded Quiz",
                assignmentGroup: "Quizzes",
                shuffleAnswers: true,
                timeLimit: true,
                minutes: 20,
                allowMultipleAttempts: false,
                attemptsAllowed: 1,
                showCorrectAnswers: true,
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestions: false,
                accessCode: "",
                assignTo: "Everyone",
                due: "",
                availableFrom: "",
                availableUntil: "",
                status: "unpublished",
                questions: []
            };
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
            
            // Clear the form after update
            state.quiz = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 0,
                quizType: "Graded Quiz",
                assignmentGroup: "Quizzes",
                shuffleAnswers: true,
                timeLimit: true,
                minutes: 20,
                allowMultipleAttempts: false,
                attemptsAllowed: 1,
                showCorrectAnswers: true,
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestions: false,
                accessCode: "",
                assignTo: "Everyone",
                due: "",
                availableFrom: "",
                availableUntil: "",
                status: "unpublished",
                questions: []
            };
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
        setQuiz: (state, { payload: quiz }) => {
            // For loading quiz data into the editor
            state.quiz = quiz;
        },
        clearQuiz: (state) => {
            // For creating new quizzes
            state.quiz = {
                _id: "",
                title: "",
                course: "",
                description: "",
                points: 0,
                quizType: "Graded Quiz",
                assignmentGroup: "Quizzes",
                shuffleAnswers: true,
                timeLimit: true,
                minutes: 20,
                allowMultipleAttempts: false,
                attemptsAllowed: 1,
                showCorrectAnswers: true,
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestions: false,
                accessCode: "",
                assignTo: "Everyone",
                due: "",
                availableFrom: "",
                availableUntil: "",
                status: "unpublished",
                questions: []
            };
        }
    },
});

export const {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    editQuiz,
    setQuiz,
    clearQuiz
} = quizzesSlice.actions;

export default quizzesSlice.reducer;