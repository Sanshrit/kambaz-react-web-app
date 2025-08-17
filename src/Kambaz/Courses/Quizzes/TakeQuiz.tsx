import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import * as usersClient from "../../Account/client";
import { setQuiz } from "./reducer";
import { setCurrentUser } from "../../Account/reducer";

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const [quiz, setQuizLocal] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [attemptNumber, setAttemptNumber] = useState(1);
    const [canTakeQuiz, setCanTakeQuiz] = useState(true);
    const [lastAttempt, setLastAttempt] = useState<any>(null);

    const isPreview = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

    // Load quiz data
    useEffect(() => {
        const loadQuiz = async () => {
            try {
                setLoading(true);
                let currentQuizData = null; // Single variable for quiz reference

                // find quiz in Redux store first
                const existingQuiz = quizzes.find((q: any) => q._id === qid);

                if (existingQuiz) {
                    setQuizLocal(existingQuiz);
                    dispatch(setQuiz(existingQuiz));
                    currentQuizData = existingQuiz;
                } else {
                    // Fetch from API if not in store
                    const fetchedQuiz = await client.findQuiz(cid as string, qid as string);
                    setQuizLocal(fetchedQuiz[0]); // API returns array
                    dispatch(setQuiz(fetchedQuiz[0]));
                    currentQuizData = fetchedQuiz[0]; // Use the same variable
                }

                // For students, check attempt status
                if (!isPreview && currentUser?._id && currentQuizData) {
                    const userAttempts = currentUser.quizAttempts?.filter((attempt: any) =>
                        attempt.course === cid && attempt.quiz === qid) || [];

                    if (userAttempts.length > 0) {
                        const lastAttemptData = userAttempts[userAttempts.length - 1];
                        setLastAttempt(lastAttemptData);
                        setAttemptNumber(userAttempts.length + 1);

                        // Check if student can take another attempt - but allow one more if they just completed
                        if (userAttempts.length >= (currentQuizData.attemptsAllowed || 1) && !isCompleted) {
                            setCanTakeQuiz(false);
                        }
                    }
                }
                // if (!isPreview && currentUser?._id && currentQuizData) {
                //     const userAttempts = currentUser.quizAttempts?.filter((attempt: any) =>
                //         attempt.course === cid && attempt.quiz === qid) || [];
                //
                //     if (userAttempts.length > 0) {
                //         const lastAttemptData = userAttempts[userAttempts.length - 1];
                //         setLastAttempt(lastAttemptData);
                //         setAttemptNumber(userAttempts.length + 1);
                //
                //         // Check if student can take another attempt - now uses currentQuizData
                //         if (userAttempts.length >= (currentQuizData.attemptsAllowed || 1)) {
                //             setCanTakeQuiz(false);
                //         }
                //     }
                // }

            } catch (error) {
                console.error("Failed to load quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        if (cid && qid) {
            loadQuiz();
        }
    }, [cid, qid, currentUser, isPreview, quizzes, dispatch]);

    // Set timer when quiz loads
    useEffect(() => {
        if (quiz && !isPreview && quiz.timeLimit && quiz.minutes && canTakeQuiz) {
            setTimeRemaining(quiz.minutes * 60); // Convert minutes to seconds
        }
    }, [quiz, isPreview, canTakeQuiz]);

    // Timer countdown (only for student attempts)
    useEffect(() => {
        if (!isPreview && timeRemaining !== null && timeRemaining > 0 && !isCompleted) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev && prev <= 1) {
                        handleSubmitQuiz(); // Auto-submit when time runs out
                        return 0;
                    }
                    return prev ? prev - 1 : 0;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeRemaining, isCompleted, isPreview]);

    useEffect(() => {
        // Recalculate attempt number when currentUser.quizAttempts changes
        if (currentUser?.quizAttempts && cid && qid && !isCompleted) {
            const userAttempts = currentUser.quizAttempts.filter((attempt: any) =>
                attempt.course === cid && attempt.quiz === qid
            );

            const newAttemptNumber = userAttempts.length + 1;
            setAttemptNumber(newAttemptNumber);

            console.log("Recalculated attempt number:", newAttemptNumber, "based on attempts:", userAttempts.length);
        }
    }, [currentUser?.quizAttempts, cid, qid, isCompleted]);
    //     useEffect(() => {
    //     // Recalculate attempt number when currentUser.quizAttempts changes
    //     if (currentUser?.quizAttempts && cid && qid) {
    //         const userAttempts = currentUser.quizAttempts.filter((attempt: any) =>
    //             attempt.course === cid && attempt.quiz === qid
    //         );
    //
    //         const newAttemptNumber = userAttempts.length + 1;
    //         setAttemptNumber(newAttemptNumber);
    //
    //         console.log("Recalculated attempt number:", newAttemptNumber, "based on attempts:", userAttempts.length);
    //     }
    // }, [currentUser?.quizAttempts, cid, qid]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));

        // For student attempts, just log locally (no database save until final submission)
        if (!isPreview) {
            console.log(`Answer selected for question ${questionId}: ${answer}`);
            // Individual answers are NOT saved to database
            // Only final quiz submission creates an attempt record
        }
    };
    const calculateScore = () => {
        if (!quiz?.questions) return 0;

        let totalScore = 0;
        quiz.questions.forEach((question: any) => {
            const userAnswer = userAnswers[question._id];

            if (!userAnswer) return;

            let isCorrect = false;

            if (question.questionType === "fill in blank") {
                // Fill in blank: Check against all possible answers
                isCorrect = question.possibleAnswers.some((correct: string) =>
                    correct.toLowerCase() === userAnswer.toLowerCase()
                );
            } else {
                // Multiple choice & True/False: Check against single correct answer
                isCorrect = question.correctAnswer.toLowerCase() === userAnswer.toLowerCase();
            }

            if (isCorrect) {
                totalScore += question.points;
            }
        });

        return totalScore;
    };

    const handleSubmitQuiz = async () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setIsCompleted(true);

        // For student attempts, save final submission to user document
        if (!isPreview && currentUser?._id) {
            try {
                // Prepare answers in the format expected by your existing system
                const formattedAnswers = Object.keys(userAnswers).map(questionId => {
                    const question = quiz.questions.find((q: any) => q._id === questionId);
                    return {
                        qid: questionId,
                        userAnswer: userAnswers[questionId],
                        correctAnswer: question.correctAnswer,
                        points: question.points,
                        type: question.questionType,
                        possibleAnswers: question.possibleAnswers
                    };
                });

                // Create attempt object matching your existing format
                const attemptData = {
                    course: cid,
                    user: currentUser._id,
                    grade: finalScore,
                    quiz: qid,
                    answers: formattedAnswers,
                    time: new Date().toLocaleString(),
                    attemptNumber: attemptNumber,
                    completedAt: new Date(),
                    timeSpent: quiz.minutes ? (quiz.minutes * 60 - (timeRemaining || 0)) : null
                };

                // Update user document with new quiz attempt
                const updatedUser = {
                    ...currentUser,
                    quizAttempts: [...(currentUser.quizAttempts || []), attemptData]
                };

                // Save to database and update Redux
                await usersClient.updateUser(updatedUser);
                dispatch(setCurrentUser(updatedUser));

                // Update local lastAttempt state with the current attempt
                setLastAttempt(attemptData);

                console.log('Quiz attempt saved successfully:', attemptData);
                // await usersClient.updateUser(updatedUser);
                // dispatch(setCurrentUser(updatedUser));
                //
                // console.log('Quiz attempt saved successfully:', attemptData);

            } catch (error) {
                console.error('Failed to submit quiz:', error);
                alert('Failed to save your quiz attempt. Please try again.');
            }
        }
    };

    const goToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return <div className="m-5">Loading quiz...</div>;
    }

    if (!quiz) {
        return <div className="m-5">Quiz not found.</div>;
    }

    // Check if student has exhausted attempts
    // if (!canTakeQuiz && !isPreview) {
    if (!canTakeQuiz && !isPreview && !isCompleted) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="alert alert-warning">
                            <h4>Quiz Attempts Exhausted</h4>
                            <p>You have used all {quiz.attemptsAllowed || 1} allowed attempts for this quiz.</p>
                            <p>Your final score: <strong>{lastAttempt?.grade || 0} out of {quiz.points} points</strong></p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                            >
                                Back to Quizzes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Check if quiz has questions
    if (!quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="alert alert-info">
                            <h4>No Questions Available</h4>
                            <p>This quiz does not have any questions yet.</p>
                            {isPreview && (
                                <button
                                    className="btn btn-warning"
                                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)}
                                >
                                    <FaEdit className="me-2" />
                                    Add Questions
                                </button>
                            )}
                            <button
                                className="btn btn-secondary ms-2"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                            >
                                Back to Quizzes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    if (isCompleted) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="border rounded p-4">
                            <h2 className="mb-4">{quiz.title}</h2>

                            {/* Preview vs Student completion messages */}
                            {isPreview ? (
                                <div className="alert mb-4" style={{ backgroundColor: '#f8d7da', color: 'black', border: '1px solid #f5c6cb' }}>
                                    <strong>Preview Completed!</strong> This is how students would see their results.
                                </div>
                            ) : (
                                <div className="alert mb-4" style={{ backgroundColor: '#ffe6e6', color: '#000000', border: '1px solid #ffcccc' }}>
                                    <strong>Quiz Submitted!</strong> Your answers have been saved.
                                    {lastAttempt && (
                                        <div className="mt-2">
                                            This was attempt {attemptNumber - 1} of {quiz.attemptsAllowed || 1}.
                                        </div>
                                    )}
                                </div>
                            )}

                            <h3>Quiz Results</h3>
                            <div className="mb-4">
                                <h4>Score: {score} out of {quiz.points} points</h4>
                                <div className="progress mb-3">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${(score / quiz.points) * 100}%` }}
                                    >
                                        {Math.round((score / quiz.points) * 100)}%
                                    </div>
                                </div>
                            </div>

                            {/* Question Review */}
                            <div className="mb-4">
                                <h4>Question Review</h4>
                                {quiz.questions.map((question: any, index: number) => {
                                    const userAnswer = userAnswers[question._id];
                                    const isCorrect = (() => {
                                        if (!userAnswer) return false;

                                        if (question.questionType === "fill in blank") {
                                            return question.possibleAnswers.some((correct: string) =>
                                                correct.toLowerCase() === userAnswer.toLowerCase()
                                            );
                                        } else {
                                            // MCQ & True/False: Check against single correct answer
                                            return question.correctAnswer.toLowerCase() === userAnswer.toLowerCase();
                                        }
                                    })();

                                    return (
                                        <div key={question._id} className="card mb-3">
                                            <div className="card-header d-flex justify-content-between">
                                                <span>Question {index + 1}</span>
                                                <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                                                    {isCorrect ? `${question.points} pts` : '0 pts'}
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <div dangerouslySetInnerHTML={{ __html: question.content }} />
                                                <div className="mt-2">
                                                    <strong>Your Answer:</strong> {userAnswer || "Not answered"}
                                                </div>
                                                {/* {(quiz.showCorrectAnswers || isPreview) && (
                                                    <div>
                                                        <strong>Correct Answer:</strong> {question.correctAnswer}
                                                    </div>
                                                )} */}
                                                {(quiz.showCorrectAnswers || isPreview) && (
                                                    <div>
                                                        <strong>Correct Answer:</strong> {
                                                            question.questionType === "fill in blank"
                                                                ? question.possibleAnswers?.join(" or ")
                                                                : question.correctAnswer
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-2">
                                {isPreview ? (
                                    <>
                                        <button
                                            className="btn"
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: '1px solid #dc3545'
                                            }}
                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)}
                                        >
                                            <FaEdit className="me-2" />
                                            Keep Editing This Quiz
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
                                        >
                                            Back to Quiz Details
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                                        >
                                            Back to Quizzes
                                        </button>
                                        {/* Show retake option if attempts remaining */}
                                        {canTakeQuiz && attemptNumber <= (quiz.attemptsAllowed || 1) && (
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    border: '1px solid #dc3545'
                                                }}
                                                onClick={() => window.location.reload()}
                                            >
                                                Take Again (Attempt {attemptNumber})
                                            </button>
                                        )}
                                        {/*/!* Show retake option if attempts remaining *!/*/}
                                        {/*{canTakeQuiz && attemptNumber > 1 && (*/}
                                        {/*    <button*/}
                                        {/*        className="btn btn-warning"*/}
                                        {/*        onClick={() => window.location.reload()}*/}
                                        {/*    >*/}
                                        {/*        Take Again (Attempt {attemptNumber + 1})*/}
                                        {/*    </button>*/}
                                        {/*)}*/}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="border rounded p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>{quiz.title}</h2>
                            {!isPreview && timeRemaining !== null && canTakeQuiz && (
                                <div className={`alert ${timeRemaining < 300 ? 'alert-danger' : 'alert-info'} py-2 px-3 mb-0`}>
                                    <strong>Time Remaining: {formatTime(timeRemaining)}</strong>
                                </div>
                            )}
                        </div>

                        {/* Status Messages */}
                        {isPreview ? (
                            <div className="alert alert-danger mb-4">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                This is a preview of the quiz. Student answers will not be saved.
                            </div>
                        ) : canTakeQuiz ? (
                            <div className="alert alert-info mb-4">
                                <strong>Attempt {attemptNumber} of {quiz.attemptsAllowed || 1}</strong>
                                <div className="mt-2">
                                    <strong>Instructions:</strong> Answer all questions and click
                                    Submit when finished.
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-warning mb-4">
                                <strong>Maximum attempts reached.</strong> You cannot take this quiz
                                again.
                            </div>
                        )}

                        {/* Quiz Instructions */}
                        {quiz.description && (
                            <div className="mb-4">
                                <h4>Quiz Instructions</h4>
                                <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
                            </div>
                        )}

                        {/* Current Question */}
                        <div className="border rounded p-0 mb-4">
                            {/* Question Header */}
                            <div className="border-bottom p-3 d-flex justify-content-between align-items-center bg-light">
                                <h5 className="mb-0">Question {currentQuestionIndex + 1}</h5>
                                <span className="text-muted">{currentQuestion.points} pts</span>
                            </div>

                            {/* Question Content */}
                            <div className="p-4">
                                <div className="mb-4">
                                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.content }} />
                                </div>

                                {/* Answer Options */}
                                <div className="mb-4">
                                    {/* True/False Questions */}
                                    {currentQuestion.questionType === "true false" && (
                                        <div>
                                            <div className="form-check mb-2">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={`${currentQuestion._id}-true`}
                                                    name={`question-${currentQuestion._id}`}
                                                    value="true"
                                                    checked={userAnswers[currentQuestion._id] === "true"}
                                                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`${currentQuestion._id}-true`}
                                                >True</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={`${currentQuestion._id}-false`}
                                                    name={`question-${currentQuestion._id}`}
                                                    value="false"
                                                    checked={userAnswers[currentQuestion._id] === "false"}
                                                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                />
                                                <label className="form-check-label"
                                                    htmlFor={`${currentQuestion._id}-false`}>False</label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Multiple Choice Questions */}
                                    {currentQuestion.questionType === "multiple choice" && (
                                        <div>
                                            {currentQuestion.possibleAnswers.map((answer: string, index: number) => (
                                                <div key={index} className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`question-${currentQuestion._id}`}
                                                        id={`${currentQuestion._id}-option-${index}`}
                                                        value={answer}
                                                        checked={userAnswers[currentQuestion._id] === answer}
                                                        onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                    />
                                                    <label className="form-check-label"
                                                        htmlFor={`${currentQuestion._id}-option-${index}`}>{answer}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Fill in the Blank Questions */}
                                    {currentQuestion.questionType === "fill in blank" && (
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Answer"
                                                value={userAnswers[currentQuestion._id] || ""}
                                                onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                style={{ width: '300px' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={previousQuestion}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Previous
                                    </button>

                                    {isLastQuestion ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={handleSubmitQuiz}
                                        >
                                            {isPreview ? "Finish Preview" : "Submit Quiz"}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            onClick={nextQuestion}
                                        >
                                            Next →
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Question Navigation */}
                        <div className="border rounded p-3 mb-4">
                            <h6>Questions</h6>
                            <div className="d-flex flex-column gap-1">
                                {quiz.questions.map((question: any, index: number) => {
                                    const isAnswered = userAnswers[question._id];

                                    return (
                                        <div
                                            key={question._id}
                                            className={`d-flex align-items-center ${index === currentQuestionIndex ? 'fw-bold' : 'text-danger'
                                                }`}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '4px 0',
                                                color: index === currentQuestionIndex ? 'black' : undefined
                                            }}
                                            onClick={() => goToQuestion(index)}
                                        >
                                            {/* Progress Indicator */}
                                            {isAnswered && (
                                                <span className="text-success me-2">●</span>
                                            )}
                                            Question {index + 1}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="d-flex justify-content-between">
                            {isPreview && (
                                <button
                                    className="btn"
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: '1px solid #dc3545'
                                    }}
                                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)}
                                >
                                    <FaEdit className="me-2" />
                                    Keep Editing This Quiz
                                </button>
                            )}
                            <div className="ms-auto">
                                <span className="text-muted">
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}