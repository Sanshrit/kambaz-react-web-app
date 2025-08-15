import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as client from "./client";
import DOMPurify from 'dompurify';

export default function ViewAttempt() {
    const [quiz, setQuiz] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid, qid, attemptNumber } = useParams();

    function createMarkup(html: any) {
        return { __html: DOMPurify.sanitize(html) };
    }

    useEffect(() => {
        const loadAttemptData = async () => {
            try {
                setLoading(true);

                // Load quiz data
                const fetchedQuiz = await client.findQuiz(cid as string, qid as string);
                setQuiz(fetchedQuiz[0]);

                // Find the specific attempt
                if (currentUser?.quizAttempts && attemptNumber) {
                    const userAttempts = currentUser.quizAttempts.filter((qa: any) =>
                        qa.course === cid && qa.quiz === qid
                    );

                    const attemptIndex = Number(attemptNumber) - 1;
                    if (userAttempts[attemptIndex]) {
                        setAttempt(userAttempts[attemptIndex]);
                    }
                }
            } catch (error) {
                console.error("Failed to load attempt data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (cid && qid && attemptNumber && currentUser) {
            loadAttemptData();
        }
    }, [cid, qid, attemptNumber, currentUser]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString();
    };

    const getQuestionAnswer = (questionId: string) => {
        if (!attempt?.answers) return null;
        return attempt.answers.find((answer: any) => answer.qid === questionId);
    };

    const isAnswerCorrect = (question: any, userAnswer: any) => {
        if (!userAnswer) return false;

        if (question.questionType === "fill in blank") {
            return question.possibleAnswers.some((correct: string) =>
                correct.toLowerCase() === userAnswer.userAnswer.toLowerCase()
            );
        } else {
            return userAnswer.correctAnswer === userAnswer.userAnswer;
        }
    };

    if (loading) {
        return <div className="m-5">Loading attempt...</div>;
    }

    if (!quiz || !attempt) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    <h4>Attempt Not Found</h4>
                    <p>The requested quiz attempt could not be found.</p>
                    <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="btn btn-primary">
                        Back to Quizzes
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate score from attempt
    const totalScore = attempt.grade || 0;
    const percentage = quiz.points > 0 ? Math.round((totalScore / quiz.points) * 100) : 0;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1>Attempt {attemptNumber}</h1>
                    <h2 className="mb-4">{quiz.title}</h2>

                    {/* Attempt Summary */}
                    <div className="alert alert-info mb-4">
                        <div className="row">
                            <div className="col-md-3">
                                <strong>Score:</strong> {totalScore} out of {quiz.points} points ({percentage}%)
                            </div>
                            <div className="col-md-3">
                                <strong>Submitted:</strong> {formatDate(attempt.time)}
                            </div>
                            <div className="col-md-3">
                                <strong>Attempt:</strong> {attemptNumber} of {quiz.attemptsAllowed || 1}
                            </div>
                            {attempt.timeSpent && (
                                <div className="col-md-3">
                                    <strong>Time Spent:</strong> {Math.round(attempt.timeSpent / 60)} minutes
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Questions and Answers */}
                    {quiz.questions && (
                        <ul id="wd-questions-quiz-attempt" className="list-group rounded-0">
                            {quiz.questions.map((question: any, qindex: number) => {
                                const userAnswer = getQuestionAnswer(question._id);
                                const isCorrect = isAnswerCorrect(question, userAnswer);

                                return (
                                    <li key={qindex} className="wd-module list-group-item p-0 mb-5 fs-5 border-1 border-black">
                                        <div className={`wd-title p-3 ps-2 border-bottom ${isCorrect ? 'bg-success bg-opacity-25 border-black' : 'bg-danger bg-opacity-25 border-black'}`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    {isCorrect ? (
                                                        <FaCheck className="text-success me-2" />
                                                    ) : (
                                                        <FaTimes className="text-danger me-2" />
                                                    )}
                                                    <span className="ms-2">{question.title}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className={`badge me-2 ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                                                        {isCorrect ? `${question.points} pts` : '0 pts'}
                                                    </span>
                                                    <span className="text-secondary">{question.points} pts total</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            {/* Question Content */}
                                            <div className="ms-3 mt-3" dangerouslySetInnerHTML={createMarkup(question.content)} />

                                            {/* Fill in Blank */}
                                            {question.questionType === "fill in blank" && (
                                                <div className="mt-3">
                                                    <div className="ms-3 mb-2">
                                                        <strong>Your Answer:</strong>
                                                        <input
                                                            className="form-control ms-2 w-50 d-inline-block"
                                                            value={userAnswer?.userAnswer || "No answer provided"}
                                                            readOnly
                                                        />
                                                    </div>
                                                    
                                                    {quiz.showCorrectAnswers && (
                                                        <div className="text-success fw-bold ms-3">
                                                            Correct Answer(s):
                                                            <ul className="mt-2">
                                                                {question.possibleAnswers.map((element: any, index: number) => (
                                                                    <li key={index}>{element}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Multiple Choice */}
                                            {question.questionType === "multiple choice" && (
                                                <div className="mt-4">
                                                    {question.possibleAnswers.map((possAns: any, index: number) => (
                                                        <div key={index} className="ms-4 mb-2">
                                                            <input
                                                                type="radio"
                                                                name={`all-possible-answers-${question._id}`}
                                                                className="me-2"
                                                                checked={possAns === userAnswer?.userAnswer}
                                                                readOnly
                                                            />
                                                            <label className={possAns === userAnswer?.userAnswer ? "fw-bold" : ""}>
                                                                {possAns}
                                                            </label>
                                                        </div>
                                                    ))}
                                                                                                        <div className="ms-4 mt-3">
                                                        <strong>Your Answer:</strong>
                                                        <input 
                                                            className="form-control ms-2 w-50 d-inline-block" 
                                                            value={userAnswer?.userAnswer || "No answer provided"} 
                                                            readOnly 
                                                        />
                                                    </div>
                                                    {quiz.showCorrectAnswers && (
                                                        <div className="text-success fw-bold ms-4 mt-3">
                                                            Correct Answer: {question.correctAnswer}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* True/False */}
                                            {question.questionType === "true false" && (
                                                <div className="mt-4">
                                                    <div className="mb-2 ms-4">
                                                        <div className="mb-2">
                                                            <input
                                                                type="radio"
                                                                name={`true-false-${question._id}`}
                                                                className="me-2"
                                                                checked={userAnswer?.userAnswer === "true"}
                                                                readOnly
                                                            />
                                                            <label className={userAnswer?.userAnswer === "true" ? "fw-bold" : ""}>
                                                                True
                                                            </label>
                                                        </div>
                                                        <div className="mb-2">
                                                            <input
                                                                type="radio"
                                                                name={`true-false-${question._id}`}
                                                                className="me-2"
                                                                checked={userAnswer?.userAnswer === "false"}
                                                                readOnly
                                                            />
                                                            <label className={userAnswer?.userAnswer === "false" ? "fw-bold" : ""}>
                                                                False
                                                            </label>
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Your Answer:</strong>
                                                            <input
                                                                className="form-control ms-2 w-50 d-inline-block"
                                                                value={userAnswer?.userAnswer || "No answer provided"}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {quiz.showCorrectAnswers && (
                                                        <div className="text-success fw-bold ms-4">
                                                            Correct Answer: {question.correctAnswer}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {/* Navigation Actions */}
                    <div className="d-flex justify-content-between mt-4">
                        <Link
                            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}
                            className="btn btn-secondary"
                        >
                            Back to Quiz Details
                        </Link>

                        <Link
                            to={`/Kambaz/Courses/${cid}/Quizzes`}
                            className="btn btn-primary"
                        >
                            Back to Quizzes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}