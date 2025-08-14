// Courses/Quizzes/index.tsx
import { BsGripVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import QuizControlButtons from "./QuizControlButtons";
import QuizControls from "./QuizControls";
import { Container } from "react-bootstrap";
import * as client from "./client";
import { setQuizzes } from "./reducer";

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();

    // Load quizzes from database
    useEffect(() => {
        const loadQuizzes = async () => {
            if (cid) {
                try {
                    const courseQuizzes = await client.findQuizzesForCourse(cid);
                    dispatch(setQuizzes(courseQuizzes));
                } catch (error) {
                    console.error("Failed to load quizzes:", error);
                }
            }
        };
        loadQuizzes();
    }, [cid, dispatch]);

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const availableFrom = new Date(quiz.availableFrom);
        const availableUntil = new Date(quiz.availableUntil);

        if (availableUntil < now) {
            return { status: "Closed", text: "Closed" };
        }
        if (availableFrom <= now && now <= availableUntil) {
            return { status: "Available", text: "Available" };
        }
        if (availableFrom > now) {
            return {
                status: "Not Available",
                text: `Not Available Until ${ availableFrom.toDateString()}`
            };
        }
        return { status: "Available", text: "Available" };
    };

    // Get user's quiz attempts for displaying last scores
    const getUserQuizAttempts = (quizId: string) => {
        if (!currentUser?.quizAttempts) return [];
        return currentUser.quizAttempts.filter((attempt: any) =>
            attempt.course === cid && attempt.quiz === quizId
        );
    };

    const getLastScore = (quizId: string, quizPoints: number) => {
        const attempts = getUserQuizAttempts(quizId);
        if (attempts.length === 0) return null;

        const lastAttempt = attempts[attempts.length - 1];
        return `${lastAttempt.grade || 0}/${quizPoints}`;
    };

    // Filter quizzes for current course
    const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);
    // Separate published and unpublished for student view
    const publishedQuizzes = courseQuizzes.filter((quiz: any) => quiz.status === "published");

    return (
        <Container className="wd-quizzes" fluid="md">
            {/* Quiz Controls - Only show for Faculty */}
            {(currentUser.role === "FACULTY" || currentUser.role === "TA") && (
                <QuizControls />
            )}

            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        Assignment Quizzes
                    </div>

                    {/* Student view - only published quizzes */}
                    {currentUser.role === "STUDENT" && (
                        publishedQuizzes.length === 0 ? (
                            <div className="p-4">
                                <h3 className="text-muted">No quizzes available</h3>
                                <p className="text-muted">No quizzes have been published for this course yet.</p>
                            </div>
                        ) : (
                            <ul className="wd-lessons list-group rounded-0">
                                {publishedQuizzes.map((quiz: any) => {
                                    const availability = getAvailabilityStatus(quiz);
                                    const lastScore = getLastScore(quiz._id, quiz.points);
                                    const attempts = getUserQuizAttempts(quiz._id);

                                    return (
                                        <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1 border-left-success">
                                            <div className="wd-flex-row-container d-flex align-items-start">
                                                <IoRocketOutline className="ms-3 mt-3 me-3 fs-2 text-success" />
                                                <div className="wd-flex-grow-1 flex-grow-1">
                                                    <Link
                                                        to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                        className="text-black text-decoration-none fw-bold"
                                                    >
                                                        {quiz.title}
                                                    </Link>
                                                    <br />
                                                    <span className="small text-muted">
                                                        <strong>{availability.text}</strong> |<strong> Due</strong> {quiz.due ? new Date(quiz.due).toDateString() : 'No due date'} | <strong>{ quiz.points || 0}</strong>pts | <span>{quiz.questions?.length ||  0}</span> Questions
                                                        {lastScore && (
                                                            <span> | <strong>Last Score:</strong> {lastScore}</span>
                                                        )}
                                                        {attempts.length > 0 && (
                                                            <span> | <strong>Attempts:</strong> {attempts.length}/{quiz.attemptsAllowed || 1}</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    )}

                    {/* Faculty view - all quizzes */}
                    {(currentUser.role === "FACULTY" || currentUser.role === "TA") && (
                        courseQuizzes.length === 0 ? (
                            <div className="p-4">
                                <h3 className="text-muted">No quizzes created yet</h3>
                                <p className="text-muted">
                                    Click the <strong>"+ Quiz"</strong> button above to create your first quiz for this course.
                                </p>
                            </div>
                        ) : (
                            <ul className="wd-lessons list-group rounded-0">
                                {courseQuizzes.map((quiz: any) => {
                                    const availability = getAvailabilityStatus(quiz);

                                    return (
                                        <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1 border-left-success">
                                            <div className="wd-flex-row-container d-flex align-items-start">
                                                <IoRocketOutline className="ms-3 mt-3 me-3 fs-2 text-success" />
                                                <div className="wd-flex-grow-1 flex-grow-1">
                                                    <Link
                                                        to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                        className="text-black text-decoration-none fw-bold"
                                                    >
                                                        {quiz.title}
                                                    </Link>
                                                    <br />
                                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                                        <span className="small">
                                                            <strong>{availability.text}</strong>
                                                        </span>
                                                        <span className="small">|</span>
                                                        <span className="small">
                                                            <strong>Due:</strong> {quiz.due ? new Date(quiz.due).toDateString() : 'No due date'}
                                                        </span>
                                                        <span className="small">|</span>
                                                        <span className="small">
                                                            <strong>{quiz.points || 0} pts</strong>
                                                        </span>
                                                        <span className="small">|</span>
                                                        <span className="small">
                                                            <strong>{quiz.questions?.length || 0} Questions</strong>
                                                        </span>                      
                                                    </div>
                                                </div>
                                                <QuizControlButtons quiz={quiz} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    )}
                </li>
            </ul>
        </Container>
    );
}