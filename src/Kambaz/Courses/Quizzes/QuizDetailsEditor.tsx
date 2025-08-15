import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import * as quizzesClient from "./client";
import { 
    setQuiz,
    clearQuiz, 
    addQuiz, 
    updateQuiz 
} from "./reducer";

interface DetailsEditorProps {
    quiz: any;
    courseId: string | undefined;
    quizId: string | undefined;
}

export default function QuizDetailsEditor({ quiz, courseId, quizId }: DetailsEditorProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNewQuiz = quizId === "new";

    // ReactQuill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'link', 'color', 'background'
    ];

    const handleSave = async () => {
        try {
            if (isNewQuiz) {
                const newQuiz = await quizzesClient.createQuiz(courseId as string, quiz);
                dispatch(addQuiz(newQuiz));
                navigate(`/Kambaz/Courses/${courseId}/Quizzes/`);
            } else {
                const updatedQuiz = await quizzesClient.updateQuiz(quiz);
                dispatch(updateQuiz(updatedQuiz));
                navigate(`/Kambaz/Courses/${courseId}/Quizzes/`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save quiz. Please try again.");
        }
    };

    const handleSaveAndPublish = async () => {
        try {
            const publishedQuiz = { ...quiz, status: "published" };
            
            if (isNewQuiz) {
                const newQuiz = await quizzesClient.createQuiz(courseId as string, publishedQuiz);
                dispatch(addQuiz(newQuiz));
            } else {
                const updatedQuiz = await quizzesClient.updateQuiz(publishedQuiz);
                dispatch(updateQuiz(updatedQuiz));
            }
            navigate(`/Kambaz/Courses/${courseId}/Quizzes`);
        } catch (error) {
            console.error(error);
            alert("Failed to save and publish quiz. Please try again.");
        }
    };

    const handleCancel = () => {
        dispatch(clearQuiz());
        navigate(`/Kambaz/Courses/${courseId}/Quizzes`);
    };

    return (
        <div className="mt-4">
            {/* Quiz Title */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control border-dark fs-4 fw-bold"
                    value={quiz.title || ""}
                    onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))}
                    style={{ outline: 'none', boxShadow: 'none' }}
                />
            </div>

            {/* Quiz Instructions with ReactQuill */}
            <div className="mb-4">
                <label className="form-label">Quiz Instructions:</label>
                <ReactQuill
                    theme="snow"
                    value={quiz.description || ""}
                    onChange={(value) => dispatch(setQuiz({ ...quiz, description: value }))}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter quiz instructions... Good luck!"
                    style={{ height: '200px', marginBottom: '50px' }}
                />
            </div>

            {/* Quiz Settings - All Required Fields */}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* Quiz Type */}
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Quiz Type</label>
                        </div>
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={quiz.quizType || "Graded Quiz"}
                                onChange={(e) => dispatch(setQuiz({ ...quiz, quizType: e.target.value }))}
                            >
                                <option value="Graded Quiz">Graded Quiz</option>
                                <option value="Practice Quiz">Practice Quiz</option>
                                <option value="Graded Survey">Graded Survey</option>
                                <option value="Ungraded Survey">Ungraded Survey</option>
                            </select>
                        </div>
                    </div>

                    {/* Points */}
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Points</label>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="form-control"
                                value={quiz.points || 0}
                                onChange={(e) => dispatch(setQuiz({ ...quiz, points: parseInt(e.target.value) || 0 }))}
                            />
                        </div>
                    </div>

                    {/* Assignment Group */}
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Assignment Group</label>
                        </div>
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={quiz.assignmentGroup || "Quizzes"}
                                onChange={(e) => dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))}
                            >
                                <option value="Quizzes">Quizzes</option>
                                <option value="Exams">Exams</option>
                                <option value="Assignments">Assignments</option>
                                <option value="Project">Project</option>
                            </select>
                        </div>
                    </div>

                    {/* Access Code */}
                    <div className="row mb-4 align-items-center">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Access Code</label>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                value={quiz.accessCode || ""}
                                onChange={(e) => dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))}
                                placeholder="Enter passcode (optional)"
                            />
                        </div>
                    </div>

                    {/* Options Section */}
                    <div className="row mb-3">
                        <div className="col-md-4 text-end">
                            <strong>Options</strong>
                        </div>
                    </div>

                    {/* Shuffle Answers */}
                    <div className="row mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={quiz.shuffleAnswers !== false} // Default to true
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.checked }))}
                                />
                                <label className="form-check-label">Shuffle Answers</label>
                            </div>
                        </div>
                    </div>

                    {/* Time Limit */}
                    <div className="row mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check d-flex align-items-center">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={quiz.timeLimit !== false} // Default to true
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, timeLimit: e.target.checked }))}
                                />
                                <label className="form-check-label me-2">Time Limit</label>
                                {quiz.timeLimit !== false && (
                                    <>
                                        <input
                                            type="number"
                                            className="form-control d-inline-block me-2"
                                            style={{width: '80px'}}
                                            value={quiz.minutes || 20}
                                            onChange={(e) => dispatch(setQuiz({ ...quiz, minutes: parseInt(e.target.value) || 20 }))}
                                        />
                                        <span>Minutes</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Show Correct Answers */}
                    <div className="row mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={quiz.showCorrectAnswers !== false} // Default to true
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, showCorrectAnswers: e.target.checked }))}
                                />
                                <label className="form-check-label">Show Correct Answers</label>
                            </div>
                        </div>
                    </div>

                    {/* One Question at a Time */}
                    <div className="row mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={quiz.oneQuestionAtATime !== false} // Default to true
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked }))}
                                />
                                <label className="form-check-label">One Question at a Time</label>
                            </div>
                        </div>
                    </div>

                    {/* Webcam Required */}
                    <div className="row mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={quiz.webcamRequired || false} // Default to false
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))}
                                />
                                <label className="form-check-label">Webcam Required</label>
                            </div>
                        </div>
                    </div>

                    {/* Lock Questions After Answering */}
                    <div className="row mb-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={quiz.lockQuestions || false} // Default to false
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, lockQuestions: e.target.checked }))}
                                />
                                <label className="form-check-label">Lock Questions After Answering</label>
                            </div>
                        </div>
                    </div>

                    {/* Multiple Attempts Section */}
                    <div className="row mb-4">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Multiple Attempts</label>
                        </div>
                        <div className="col-md-8">
                            <div className="border border-dark rounded p-3">
                                <div className="d-flex align-items-center">
                                    <div className="form-check me-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={quiz.allowMultipleAttempts || false} // Default to false
                                            onChange={(e) => dispatch(setQuiz({ ...quiz, allowMultipleAttempts: e.target.checked }))}
                                        />
                                        <label className="form-check-label">Allow Multiple Attempts</label>
                                    </div>
                                    {quiz.allowMultipleAttempts && (
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">How Many:</span>
                                            <input
                                                type="number"
                                                className="form-control me-2"
                                                style={{width: '80px'}}
                                                value={quiz.attemptsAllowed || 1}
                                                min="1"
                                                onChange={(e) => dispatch(setQuiz({ ...quiz, attemptsAllowed: parseInt(e.target.value) || 1 }))}
                                            />
                                            <span>Attempts</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assign Section */}
                    <div className="row mb-4">
                        <div className="col-md-4 text-end">
                            <label className="form-label mb-0">Assign</label>
                        </div>
                        <div className="col-md-8">
                            <div className="border border-dark rounded p-4">
                                {/* Assign to */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-2">Assign to</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={quiz.assignTo || "Everyone"}
                                        onChange={(e) => dispatch(setQuiz({ ...quiz, assignTo: e.target.value }))}
                                    />
                                </div>

                                {/* Due Date */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-2">Due</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={quiz.due || ""}
                                        onChange={(e) => dispatch(setQuiz({ ...quiz, due: e.target.value }))}
                                    />
                                </div>

                                {/* Available From and Until */}
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label fw-bold mb-2">Available From</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={quiz.availableFrom || ""}
                                            onChange={(e) => dispatch(setQuiz({ ...quiz, availableFrom: e.target.value }))}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold mb-2">Until</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={quiz.availableUntil || ""}
                                            onChange={(e) => dispatch(setQuiz({ ...quiz, availableUntil: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    {/* Action Buttons with Bootstrap Dropdown */}
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        
                        <div className="dropdown d-inline">
                            <button
                                type="button"
                                className="btn btn-danger dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Save
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleSave}
                                    >
                                        Save
                                        <small className="text-muted d-block">Save changes and go to Quiz Details</small>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleSaveAndPublish}
                                    >
                                        Save and Publish
                                        <small className="text-muted d-block">Save & publish, go to Quiz List</small>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}