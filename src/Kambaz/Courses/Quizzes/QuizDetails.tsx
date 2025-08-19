import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";
import * as client from "./client";
import { setQuiz } from "./reducer";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const [userAttempts, setUserAttempts] = useState<any>([]);
    const [quiz, setQuizLocal] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Load quiz data
    useEffect(() => {
        const loadQuiz = async () => {
            try {
                setLoading(true);
                
                //Attempt to find quiz in Redux store
                const existingQuiz = quizzes.find((q: any) => q._id === qid);
                
                if (existingQuiz) {
                    setQuizLocal(existingQuiz);
                    dispatch(setQuiz(existingQuiz));
                } else {
                    // If not in, fetch from API (handles page refresh)
                    const fetchedQuiz = await client.findQuiz(cid as string, qid as string);
                    console.log("Fetched quiz from API:", fetchedQuiz); 
                    setQuizLocal(fetchedQuiz[0]);
                    dispatch(setQuiz(fetchedQuiz[0]));
                }
            } catch (error) {
                console.error("Failed to load quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        if (cid && qid) {
            loadQuiz();
        }
    }, [cid, qid, quizzes, dispatch]);

    // Get user quiz attempts from Redux store
    useEffect(() => {
        const getUserQuizAttempts = () => {
            const attempts = currentUser?.quizAttempts?.filter((attemptObj: any) => 
                attemptObj.course === cid && attemptObj.quiz === qid) || [];
            setUserAttempts(attempts);
        };

        if (currentUser) {
            getUserQuizAttempts();
        }
    }, [currentUser, cid, qid]);

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return "No date set";
        return new Date(dateString).toLocaleString();
    };

    // Check if quiz is available for students
    const isQuizAvailable = () => {
        if (!quiz) return false;
        const now = new Date();
        const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
        const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
        
        const isAfterStart = !availableFrom || availableFrom <= now;
        const isBeforeEnd = !availableUntil || now <= availableUntil;
        
        return isAfterStart && isBeforeEnd;
    };

    // Check if student can take quiz
    const canTakeQuiz = () => {
        if (currentUser?.role !== "STUDENT") return false;
        if (!isQuizAvailable()) return false;
        if (!quiz?.attemptsAllowed) return false;
        
        return userAttempts.length < quiz.attemptsAllowed;
    };

    if (loading) {
        return <div className="m-5">Loading quiz details...</div>;
    }

    if (!quiz) {
        return <div className="m-5">Quiz not found.</div>;
    }

    return (
        <div className="container mt-4">
            {/* Preview and Edit buttons - Only for Faculty/TA */}
            {(currentUser?.role === "FACULTY" || currentUser?.role === "TA") && (
                <div>
                    <div className="d-flex justify-content-center mb-4">
                        <Link 
                            className="btn btn-light btn-lg border border-dark me-2"
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`}
                        >
                            Preview
                        </Link>
                        <Link 
                            className="btn btn-light btn-lg border border-dark"
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`}
                        >
                            <FaPencil className="mb-2"/> Edit
                        </Link>
                    </div>
                    <hr />
                </div>
            )}

            {/* Quiz Title */}
            <h1>{quiz.title}</h1>

            {/* Quiz Details - Only for Faculty/TA */}
            {(currentUser?.role === "FACULTY" || currentUser?.role === "TA") && (
                <div className="mb-4">
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Quiz Type</div>
                        <div className="col-5 text-start">{quiz.quizType || "Graded Quiz"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Points</div>
                        <div className="col-5 text-start">{quiz.points || 0}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Assignment Group</div>
                        <div className="col-5 text-start">{quiz.assignmentGroup || "Quizzes"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Shuffle Answers</div>
                        <div className="col-5 text-start">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Time Limit</div>
                        <div className="col-5 text-start">
                            {quiz.timeLimit ? `${quiz.minutes || 20} Minutes` : "No time limit"}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Multiple Attempts</div>
                        <div className="col-5 text-start">{quiz.allowMultipleAttempts ? "Yes" : "No"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Number of Allowed Attempts</div>
                        <div className="col-5 text-start">{quiz.attemptsAllowed || 1}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Show Correct Answers</div>
                        <div className="col-5 text-start">{quiz.showCorrectAnswers ? "Yes" : "No"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Access Code</div>
                        <div className="col-5 text-start">{quiz.accessCode || "None"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">One Question at a Time</div>
                        <div className="col-5 text-start">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Webcam Required</div>
                        <div className="col-5 text-start">{quiz.webcamRequired ? "Yes" : "No"}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-5 text-end fw-bold">Lock Questions After Answering</div>
                        <div className="col-5 text-start">{quiz.lockQuestions ? "Yes" : "No"}</div>
                    </div>
                    <br />
                </div>
            )}

            {!((currentUser?.role === "FACULTY" || currentUser?.role === "TA")) && <hr />}

            {/* Date/Availability Table - Visible to all users */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available From</th>
                        <th>Available Until</th>
                        <th>Allowed Attempts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formatDate(quiz.due)}</td>
                        <td>{quiz.assignTo || "Everyone"}</td>
                        <td>{formatDate(quiz.availableFrom)}</td>
                        <td>{formatDate(quiz.availableUntil)}</td>
                        <td>{quiz.attemptsAllowed || 1}</td>
                    </tr>
                </tbody>
            </table>

            {/* Student Attempts Table - Only for students with attempts */}
            {currentUser?.role === "STUDENT" && userAttempts.length > 0 && (
                <div className="d-flex justify-content-center mb-4">
                    <table className="table table-bordered" style={{maxWidth: '600px'}}>
                        <thead>
                            <tr className="table-light">
                                <th>Attempt Number</th>
                                <th>Date Taken</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAttempts.map((attempt: any, index: number) => (
                                <tr key={index}>
                                    <td>
                                        <Link 
                                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempts/${index + 1}`} 
                                            className="text-danger"
                                        >
                                            Attempt {index + 1}
                                        </Link>
                                    </td>
                                    {/* <td>{attempt.timeSpent ? `${Math.round(attempt.timeSpent / 60)} minutes` : "N/A"}</td> */}
                                    <td>{attempt.time || (attempt.completedAt ? formatDate(attempt.completedAt) : "N/A")}</td>
                                    <td>{attempt.score || attempt.grade || 0} / {quiz.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Quiz Status Messages for Students */}
            {currentUser?.role === "STUDENT" && (
                <div className="d-flex justify-content-center mb-4">
                    {!isQuizAvailable() && (
                        <div className="alert alert-warning">
                            <strong>Quiz Not Available</strong>
                            <p className="mb-0">
                                This quiz is not currently available. 
                                {quiz.availableFrom && new Date(quiz.availableFrom) > new Date() && 
                                    ` Available from: ${formatDate(quiz.availableFrom)}`
                                }
                            </p>
                        </div>
                    )}
                    
                    {isQuizAvailable() && !canTakeQuiz() && userAttempts.length >= (quiz.attemptsAllowed || 1) && (
                        <div className="alert alert-info">
                            <strong>All Attempts Used</strong>
                            <p className="mb-0">
                                You have used all {quiz.attemptsAllowed || 1} allowed attempts for this quiz.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Start Quiz Button - Only for eligible students */}
            {canTakeQuiz() && (
                <div className="d-flex justify-content-center mb-4">
                    <Link 
                        className="btn btn-lg btn-danger" 
                        to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`}
                    >
                        {userAttempts.length > 0 ? 
                            `Start Attempt ${userAttempts.length + 1}` : 
                            "Start Quiz"
                        }
                    </Link>
                </div>
            )}

            {/* Back to Quizzes Button - For Faculty/TA */}
            {(currentUser?.role === "FACULTY" || currentUser?.role === "TA") && (
                <div className="d-flex justify-content-center mb-4">
                    <Link 
                        className="btn btn-light border-dark" 
                        to={`/Kambaz/Courses/${cid}/Quizzes`}
                    >
                        Back to Quizzes
                    </Link>
                </div>
            )}
        </div>
    );
}