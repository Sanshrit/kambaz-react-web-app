import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isPreview = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

    // Mock quiz data
    useEffect(() => {
        const mockQuiz = {
            _id: qid,
            title: "Q1 - HTML",
            course: cid,
            description: "<p>This quiz covers basic HTML concepts. Good luck!</p>",
            points: 30,
            timeLimit: 40, // minutes
            questions: [
                {
                    _id: "q1",
                    title: "Question 1",
                    content: "<p>An HTML <strong>label</strong> element can be associated with an HTML <strong>input</strong> element by setting their <strong>id</strong> attributes to the same value.</p><p>The resulting effect is that when you click on the <strong>label</strong> text, the <strong>input</strong> element receives focus as if you had click on the <strong>input</strong> element itself</p>",
                    questionType: "true false",
                    points: 1,
                    correctAnswer: "true",
                    possibleAnswers: ["true", "false"]
                },
                {
                    _id: "q2",
                    title: "Question 2",
                    content: "<p>Which HTML tag is used to create a hyperlink?</p>",
                    questionType: "multiple choice",
                    points: 1,
                    correctAnswer: "<a>",
                    possibleAnswers: ["<link>", "<a>", "<href>", "<url>"]
                },
                {
                    _id: "q3",
                    title: "Question 3",
                    content: "<p>What does HTML stand for?</p>",
                    questionType: "fill in blank",
                    points: 2,
                    correctAnswer: "HyperText Markup Language",
                    possibleAnswers: ["HyperText Markup Language", "Hypertext Markup Language", "hypertext markup language"]
                }
            ]
        };
        setQuiz(mockQuiz);

        // Set timer for actual quiz attempts (not preview)
        if (!isPreview && mockQuiz.timeLimit) {
            setTimeRemaining(mockQuiz.timeLimit * 60); // Convert to seconds
        }
    }, [cid, qid, isPreview]);

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

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));

        // For student attempts, save to database/localStorage
        if (!isPreview) {
            // TODO: Save answer to database or localStorage
            console.log(`Saving answer for question ${questionId}: ${answer}`);
        }
    };

    const calculateScore = () => {
        if (!quiz?.questions) return 0;

        let totalScore = 0;
        quiz.questions.forEach((question: any) => {
            const userAnswer = userAnswers[question._id];
            if (userAnswer && question.possibleAnswers.some((correct: string) =>
                correct.toLowerCase() === userAnswer.toLowerCase())) {
                totalScore += question.points;
            }
        });
        return totalScore;
    };

    const handleSubmitQuiz = async () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setIsCompleted(true);

        // For student attempts, save final submission to database
        if (!isPreview) {
            try {
                // TODO: Submit quiz attempt to backend
                console.log('Submitting quiz attempt:', {
                    quizId: qid,
                    courseId: cid,
                    answers: userAnswers,
                    score: finalScore,
                    completedAt: new Date()
                });
                // await submitQuizAttempt(cid, qid, userAnswers, finalScore);
            } catch (error) {
                console.error('Failed to submit quiz:', error);
                // Handle error - maybe show error message
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

    if (!quiz) {
        return <div className="m-5">Loading quiz...</div>;
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
                                <div className="alert alert-info mb-4">
                                    <strong>Preview Completed!</strong> This is how students would see their results.
                                </div>
                            ) : (
                                <div className="alert alert-success mb-4">
                                    <strong>Quiz Submitted!</strong> Your answers have been saved.
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
                                    const isCorrect = question.possibleAnswers.some((correct: string) =>
                                        correct.toLowerCase() === (userAnswer || "").toLowerCase());

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
                                                <div>
                                                    <strong>Correct Answer:</strong> {question.correctAnswer}
                                                </div>
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
                                            className="btn btn-warning"
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
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                                    >
                                        Back to Quizzes
                                    </button>
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
                            {!isPreview && timeRemaining !== null && (
                                <div className={`alert ${timeRemaining < 300 ? 'alert-danger' : 'alert-info'} py-2 px-3 mb-0`}>
                                    <strong>Time Remaining: {formatTime(timeRemaining)}</strong>
                                </div>
                            )}
                        </div>

                        {/* Preview warning or student instructions */}
                        {isPreview ? (
                            <div className="alert alert-danger mb-4">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                This is a preview of the published version of the quiz
                            </div>
                        ) : (
                            <div className="alert alert-info mb-4">
                                <strong>Instructions:</strong> Answer all questions and click Submit when finished.
                            </div>
                        )}

                        {/* Quiz Instructions */}
                        <div className="mb-4">
                            <h4>Quiz Instructions</h4>
                            <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
                        </div>

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
                                                    name={`question-${currentQuestion._id}`}
                                                    value="true"
                                                    checked={userAnswers[currentQuestion._id] === "true"}
                                                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                />
                                                <label className="form-check-label">True</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name={`question-${currentQuestion._id}`}
                                                    value="false"
                                                    checked={userAnswers[currentQuestion._id] === "false"}
                                                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                />
                                                <label className="form-check-label">False</label>
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
                                                        value={answer}
                                                        checked={userAnswers[currentQuestion._id] === answer}
                                                        onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                                    />
                                                    <label className="form-check-label">{answer}</label>
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
                                            Submit Quiz
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
                                {quiz.questions.map((question: any, index: number) => (
                                    <div
                                        key={question._id}
                                        className="text-danger"
                                        style={{ cursor: 'pointer', padding: '4px 0' }}
                                        onClick={() => goToQuestion(index)}
                                    >
                                        Question {index + 1}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Bottom Actions */}
                        <div className="d-flex justify-content-between">
                            {isPreview && (
                                <button
                                    className="btn btn-outline-warning"
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