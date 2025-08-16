import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { setQuiz } from "./reducer";
import * as quizzesClient from "./client";

export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quiz } = useSelector((state: any) => state.quizzesReducer);
    const quillRef = useRef(null);

    // State for current questions list
    const [currentQuestions, setCurrentQuestions] = useState<any>([]);
    const [status, setStatus] = useState(false);

    // State for editing individual question
    const [questionId, setQuestionId] = useState("");
    const [questionType, setQuestionType] = useState("multiple choice");
    const [title, setTitle] = useState("");
    const [points, setPoints] = useState(1);
    const [content, setContent] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [possibleAnswers, setPossibleAnswers] = useState<any>(["Possible Answer"]);

    // Load existing questions from Redux quiz
    useEffect(() => {
        console.log("Quiz from Redux changed:", quiz);
        if (quiz && quiz.questions) {
            console.log("Setting current questions:", quiz.questions);
            setCurrentQuestions(quiz.questions);
        }
    }, [quiz]);

    const handleContentChange = (content: string) => {
        setContent(content);
    };

    const addNewQuestion = () => {
        const questId = new Date().getTime().toString();
        const newQuestion = {
            _id: questId,
            editing: true,
            questionType: "multiple choice",
            title: "Untitled Question",
            points: 1,
            content: "",
            correctAnswer: "",
            possibleAnswers: ["Possible Answer"],
            course: cid,
            quiz: qid
        };
        if (questionType === "true false") {
            newQuestion.possibleAnswers = ["true", "false"];
        }


        setCurrentQuestions((prevQuestions: any) => [...prevQuestions, newQuestion]);
        handleClickEdit(newQuestion);
    };

    const handleClickEdit = (question: any) => {
        setQuestionId(question._id);
        setQuestionType(question.questionType);
        setTitle(question.title);
        setPoints(question.points);
        setCorrectAnswer(question.correctAnswer);
        setPossibleAnswers(question.possibleAnswers || ["Possible Answer"]);
        setContent(question.content);

        setCurrentQuestions((prevQuestions: any) =>
            prevQuestions.map((cq: any) =>
                cq._id === question._id ? { ...cq, editing: true } : { ...cq, editing: false }
            )
        );
    };

    const saveQuestion = async () => {
        try {
            const updatedQuestion = {
                ...currentQuestions.find((q: any) => q._id === questionId),
                course: cid,
                quiz: qid,
                title: title,
                points: points,
                questionType: questionType,
                content: content,
                correctAnswer: correctAnswer,
                 possibleAnswers: questionType === "true false" ? ["True", "False"] : possibleAnswers,
                editing: false
            };

            const updatedQuestions = currentQuestions.map((cq: any) =>
                cq._id === questionId ? updatedQuestion : cq
            );

            // Update local state
            setCurrentQuestions(updatedQuestions);

            // Calculate new total points
            const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + q.points, 0);

            // Update Redux and Database immediately
            const updatedQuiz = {
                ...quiz,
                questions: updatedQuestions,
                points: totalPoints
            };

            dispatch(setQuiz(updatedQuiz));
            await quizzesClient.updateQuiz(updatedQuiz);

            console.log("Individual question saved to database!");
        } catch (error) {
            console.error("Failed to save question:", error);
            alert("Failed to save question. Please try again.");
        }
    };


const cancelEdit = () => {
    const questionBeingEdited = currentQuestions.find((q: any) => q._id === questionId);
    
    // If it's a new question (not saved to database yet), remove it completely
    if (questionBeingEdited && !quiz.questions?.find((q: any) => q._id === questionId)) {
        // Remove from local state completely
        setCurrentQuestions((prevQuestions: any) => 
            prevQuestions.filter((cq: any) => cq._id !== questionId)
        );
    } else {
        // If it's an existing question, just stop editing
        setCurrentQuestions((prevQuestions: any) =>
            prevQuestions.map((cq: any) =>
                cq._id === questionId ? { ...cq, editing: false } : cq
            )
        );
    }
};

    const deleteQuestion = async (questionId: string) => {
        try {
            const updatedQuestions = currentQuestions.filter((cq: any) => cq._id !== questionId);
            setCurrentQuestions(updatedQuestions);

            // Calculate new total points
            const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + q.points, 0);

            // Update Redux and Database
            const updatedQuiz = {
                ...quiz,
                questions: updatedQuestions,
                points: totalPoints
            };

            dispatch(setQuiz(updatedQuiz));
            await quizzesClient.updateQuiz(updatedQuiz);

            console.log("Question deleted and database updated!");
        } catch (error) {
            console.error("Failed to delete question:", error);
            alert("Failed to delete question. Please try again.");
        }
    };

    // const deletePossibleAnswer = (index: number) => {
    //     setPossibleAnswers(possibleAnswers.filter((_: any, i: number) => i !== index));
    // };

    const deletePossibleAnswer = (index: number) => {
    const answerToDelete = possibleAnswers[index];
    const newAnswers = possibleAnswers.filter((_: any, i: number) => i !== index);
    setPossibleAnswers(newAnswers);

    // If we're deleting the correct answer, clear it
    if (correctAnswer === answerToDelete) {
        setCorrectAnswer("");
        }
    };

    const addPossibleAnswer = () => {
        setPossibleAnswers([...possibleAnswers, "Possible Answer"]);
    };

    // const updatePossibleAnswer = (index: number, value: string) => {
    //     setPossibleAnswers(possibleAnswers.map((pa: any, i: number) => i === index ? value : pa));
    // };

    const updatePossibleAnswer = (index: number, value: string) => {
    const oldValue = possibleAnswers[index];
    const newAnswers = possibleAnswers.map((pa: any, i: number) => i === index ? value : pa);
    setPossibleAnswers(newAnswers);

    // If the correct answer was the old value, update it to the new value
    if (correctAnswer === oldValue) {
        setCorrectAnswer(value);
        }
    };

    const saveAllQuestions = async () => {
        try {
            console.log("Current questions before save:", currentQuestions);
            console.log("Current quiz from Redux:", quiz);

            // Calculate total points from all questions
            let totalPoints = 0;
            if (currentQuestions.length !== 0) {
                totalPoints = currentQuestions.reduce((sum: number, q: any) => sum + q.points, 0);
            }

            // Update the quiz in Redux with new questions and calculated points
            const updatedQuiz = {
                ...quiz,
                questions: currentQuestions,
                points: totalPoints
            };

            console.log("Updated quiz being dispatched:", updatedQuiz);
            dispatch(setQuiz(updatedQuiz));

            // Save to database
            await quizzesClient.updateQuiz(updatedQuiz);
            console.log("Questions saved to database successfully!");

            setStatus(true);
            setTimeout(() => setStatus(false), 3000);
        } catch (error) {
            console.error("Failed to save questions to database:", error);
            alert("Failed to save questions. Please try again.");
            setStatus(false);
        }
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };


    return (
        <div className="container-fluid text-center">
            {/* Success Alert */}
            {status &&
                <div className="alert alert-success" role="alert">
                    Successfully Saved Questions! Return to 'Details' Page to Save Quiz.
                </div>
            }

            {/* New Question Button */}
            <button
                className="btn btn-lg btn-light mt-5 border border-dark"
                onClick={addNewQuestion}
            >
                + New Question
            </button>
            <br /><br />

            {/* Questions List */}
            <div id="wd-quiz-questions">
                <ul id="wd-questions" className="list-group rounded-0">
                    {currentQuestions.map((q: any) => (
                        q.editing ? (
                            <div id="wd-edit-question" className="mb-4" key={q._id}>
                                {/* Question Header - Title, Type, Points */}
                                <div className="form-group row">
                                    <div className="col-sm-3">
                                        <input
                                            className="form-control w-100"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Question title"
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                    <select
    className="form-control w-100"
    value={questionType}
    onChange={(e) => {
        const newType = e.target.value;
        setQuestionType(newType);
        // Update possibleAnswers when type changes
        if (newType === "true false") {
            setPossibleAnswers(["true", "false"]);
            setCorrectAnswer(""); // Reset correct answer
        } else {
            setPossibleAnswers(["Possible Answer"]);
            setCorrectAnswer(""); // Reset correct answer
        }
    }}
>
                                            <option value="multiple choice">Multiple Choice</option>
                                            <option value="fill in blank">Fill in the Blank</option>
                                            <option value="true false">True or False</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-4">
                                        <span className="fs-5 float-end">
                                            Points:
                                            <input
                                                className="form-control float-end w-25"
                                                type="number"
                                                value={points}
                                                onChange={(e) => setPoints(Number(e.target.value))}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <br />

                                {/* Question Instructions */}
                                <div>
                                    <br />
                                    {questionType === "multiple choice" && "Enter your question, then enter multiple answers and specify the one correct answer."}
                                    {questionType === "fill in blank" && "Enter your question, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer."}
                                    {questionType === "true false" && "Enter your question, then set True or False as the correct answer."}
                                    <br /><br />

                                    {/* Question Content Editor */}
                                    <h1>Question:</h1>
                                    <ReactQuill
                                        style={{ height: 200 }}
                                        theme="snow"
                                        value={content}
                                        onChange={handleContentChange}
                                        ref={quillRef}
                                    />
                                    <br /><br /><br />

                                    {/* Answers Section */}
                                    <h1>Answers:</h1>

                                    {/* True/False Questions */}
                                    {questionType === "true false" ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="text-start">
                                                <div className="mb-1">
                                                    <input
                                                        type="radio"
                                                        name="true-false"
                                                        value="true"
                                                        checked={correctAnswer === "true"}
                                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                                        className="me-2"
                                                        id="tf-true"
                                                    />
                                                    <label htmlFor="tf-true" className="fs-5">True</label>
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="radio"
                                                        name="true-false"
                                                        value="false"
                                                        checked={correctAnswer === "false"}
                                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                                        className="me-2"
                                                        id="tf-false"
                                                    />
                                                    <label htmlFor="tf-false" className="fs-5">False</label>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Multiple Choice & Fill in Blank */
                                        <div>
                                            {possibleAnswers.map((possAns: any, index: number) => (
                                                <div className="d-flex flex-row justify-content-center align-items-center mb-2" key={index}>
                                                    {/* Only show radio button for multiple choice questions */}
                                                    {questionType === "multiple choice" && (
                                                        <input
                                                            type="radio"
                                                            name="correct-answer"
                                                            value={possAns}
                                                            checked={correctAnswer === possAns}
                                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                                            className="me-2"
                                                            id={`correct-${index}`}
                                                        />
                                                    )}
                                                    <input
                                                        type="text"
                                                        className={`form-control w-25 mb-2 ${correctAnswer === possAns ? "text-success fw-bold" : ""}`}
                                                        value={possAns}
                                                        onChange={(e) => updatePossibleAnswer(index, e.target.value)}
                                                    />
                                                    <FaTrash
                                                        className="text-danger ms-2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => deletePossibleAnswer(index)}
                                                    />
                                                </div>
                                            ))}
                                            {/*{possibleAnswers.map((possAns: any, index: number) => (*/}
                                            {/*    <div className="d-flex flex-row justify-content-center align-items-center mb-2" key={index}>*/}
                                            {/*        <input*/}
                                            {/*            type="text"*/}
                                            {/*            className={`form-control w-25 mb-2 ${correctAnswer === possAns ? "text-success fw-bold" : ""}`}*/}
                                            {/*            value={possAns}*/}
                                            {/*            onChange={(e) => updatePossibleAnswer(index, e.target.value)}*/}
                                            {/*        />*/}
                                            {/*        <FaTrash*/}
                                            {/*            className="text-danger ms-2"*/}
                                            {/*            style={{ cursor: 'pointer' }}*/}
                                            {/*            onClick={() => deletePossibleAnswer(index)}*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*))}*/}
                                            <br />

                                            {/* Correct Answer for Multiple Choice */}
                                            {questionType === "multiple choice" && (
                                                <div className="d-flex justify-content-center mb-3">
                                                    <div className="text-center">
                                                        <label className="fw-bold mb-2">Correct Answer:</label><br />
                                                        <div className="p-2 border rounded bg-light" style={{ width: '300px', minHeight: '38px' }}>
                                                            <span className="text-success fw-bold">
                                                                {correctAnswer || "Please select a correct answer above"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <br />

                                            {/* Add Another Answer Button */}
                                            {(questionType === "multiple choice" || questionType === "fill in blank") && (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={addPossibleAnswer}
                                                >
                                                    + Another Answer
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Save/Cancel Question Buttons */}
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-secondary me-2"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={saveQuestion}
                                    >
                                        Save Question
                                    </button>
                                </div>
                                <br />
                            </div>
                        ) : (
                            /* Question Preview Mode */
                            <div key={`div-${q._id}`}>
                                <li className="wd-question list-group-item p-0 mb-5 fs-5 border-gray">
                                    <div className="wd-title p-3 ps-2 bg-secondary">
                                        <button
                                            className="float-start btn btn-warning me-2"
                                            onClick={() => handleClickEdit(q)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="float-start btn btn-danger"
                                            onClick={() => deleteQuestion(q._id)}
                                        >
                                            Delete
                                        </button>
                                        <span className="ms-2">{q.title}</span>
                                        <span className="float-end text-secondary">{q.points} pts</span>
                                    </div>

                                    {/* Question Content Preview */}
                                    <div className="p-3">
                                        <div
                                            className="mt-2"
                                            dangerouslySetInnerHTML={{ __html: q.content }}
                                        />

                                        {/* Question Type Specific Preview */}
                                        {q.questionType === "fill in blank" && (
                                            <div className="row d-flex justify-content-center mt-3">
                                                <input
                                                    className="form-control w-25 ms-4 mb-2"
                                                    placeholder="Your Answer"
                                                    disabled
                                                />
                                            </div>
                                        )}

                                        {q.questionType === "multiple choice" && q.possibleAnswers && (
                                            <div className="d-flex justify-content-center mt-3">
                                                <div className="text-start">
                                                    {q.possibleAnswers.map((possAns: any, index: number) => (
                                                        <div className="mb-2" key={index}>
                                                            <input
                                                                type="radio"
                                                                name={`preview-${q._id}`}
                                                                className="me-2"
                                                                disabled
                                                                id={`preview-${q._id}-${index}`}
                                                            />
                                                            <label htmlFor={`preview-${q._id}-${index}`} className="fs-6">{possAns}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {q.questionType === "true false" && (
                                            <div className="d-flex justify-content-center mt-3">
                                                <div className="text-start">
                                                    <div className="mb-1">
                                                        <input
                                                            type="radio"
                                                            name={`preview-tf-${q._id}`}
                                                            className="me-2"
                                                            disabled
                                                            id={`preview-true-${q._id}`}
                                                        />
                                                        <label htmlFor={`preview-true-${q._id}`} className="fs-6">True</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            name={`preview-tf-${q._id}`}
                                                            className="me-2"
                                                            disabled
                                                            id={`preview-false-${q._id}`}
                                                        />
                                                        <label htmlFor={`preview-false-${q._id}`} className="fs-6">False</label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <br />
                            </div>
                        )
                    ))}
                </ul>
            </div>

            {/* Bottom Actions */}
            <br /><hr />
            <div className="d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-danger"
                    onClick={saveAllQuestions}
                >
                    Save Questions
                </button>
            </div>
        </div>
    );
}