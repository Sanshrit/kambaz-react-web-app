import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { FcCancel } from "react-icons/fc";
import * as quizzesClient from "./client";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { 
    setQuiz, 
    clearQuiz 
} from "./reducer";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes, quiz } = useSelector((state: any) => state.quizzesReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "TA";
    const isNewQuiz = qid === "new";

    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        console.log("Course ID:", cid);
        console.log("Quiz ID:", qid);
        
        if (isNewQuiz) {
            // Clear form for new quiz
            dispatch(clearQuiz());
            dispatch(setQuiz({
                _id: "",
                title: "New Quiz",
                course: cid,
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
            }));
        } else {
            // Load existing quiz for editing
            const existingQuiz = quizzes.find((q: any) => q._id === qid);
            if (existingQuiz) {
                dispatch(setQuiz(existingQuiz));
            } else {
                // Handle refresh case - fetch from server
                fetchSingleQuiz();
            }
        }
    }, [qid, cid, isNewQuiz, dispatch, quizzes]);

    const fetchSingleQuiz = async () => {
        try {
            const fetchedQuiz = await quizzesClient.findQuiz(cid as string, qid as string);
            dispatch(setQuiz(fetchedQuiz[0]));
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };


    // Don't show editor if not faculty
    if (!isFaculty) {
        return <div className="m-5">Access denied. Faculty only.</div>;
    }

    // Show loading while quiz is being loaded
    if (!quiz || (quiz._id === "" && !isNewQuiz)) {
        return (
            <div className="m-5">
                <div>Loading quiz...</div>
            </div>
        );
    }

    return (
        <div id="wd-quiz-editor" className="m-5">
            {/* Header with Points and Status */}
            <div>
                <div className="float-end">
                    <strong className="fs-5 me-3">Points {quiz.points || 0}</strong>
                    {quiz.status === "unpublished" ? 
                        <FcCancel className="fs-5 mb-2 me-1"/> : 
                        <GreenCheckmark />
                    }
                    <span className="text-muted fs-5">
                        {quiz.status === "unpublished" ? "Not Published" : "Published"}
                    </span>
                </div>
                <br /><br /><hr />
            </div>

            {/* Bootstrap Tabs */}
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                            style={{
                                color: activeTab === 'details' ? 'black' : '#dc3545'
                            }}
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`}
                            style={{
                                color: activeTab === 'questions' ? 'black' : '#dc3545'
                            }}
                            onClick={() => setActiveTab('questions')}
                        >
                            Questions
                        </button>
                    </li>
                </ul>
                {/*<ul className="nav nav-tabs mt-5" id="wd-quiz-editor-tabs" role="tablist">*/}
                {/*    <li className="nav-item" role="presentation">*/}
                {/*        <button */}
                {/*            className="nav-link active" */}
                {/*            id="details-tab" */}
                {/*            data-bs-toggle="tab"*/}
                {/*            data-bs-target="#details" */}
                {/*            type="button" */}
                {/*            role="tab" */}
                {/*            aria-controls="details" */}
                {/*            aria-selected="true"*/}
                {/*        >*/}
                {/*            Details*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item" role="presentation">*/}
                {/*        <button */}
                {/*            className="nav-link text-danger" */}
                {/*            id="questions-tab" */}
                {/*            data-bs-toggle="tab"*/}
                {/*            data-bs-target="#questions" */}
                {/*            type="button" */}
                {/*            role="tab" */}
                {/*            aria-controls="questions" */}
                {/*            aria-selected="false"*/}
                {/*        >*/}
                {/*            Questions*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*</ul>*/}

                {/* Tab Content */}
                <div className="mt-3">
                    {activeTab === 'details' && (
                        <QuizDetailsEditor
                            quiz={quiz}
                            courseId={cid}
                            quizId={qid}
                        />
                    )}
                    {activeTab === 'questions' && (
                        <QuizQuestionsEditor />
                    )}
                </div>
                {/*<div className="tab-content" id="wd-quiz-editor-tabs-content">*/}
                {/*    <div*/}
                {/*        className="tab-pane fade show active"*/}
                {/*        id="details"*/}
                {/*        role="tabpanel"*/}
                {/*        aria-labelledby="details-tab"*/}
                {/*    >*/}
                {/*        <QuizDetailsEditor*/}
                {/*            quiz={quiz}*/}
                {/*            courseId={cid}*/}
                {/*            quizId={qid}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        className="tab-pane fade"*/}
                {/*        id="questions"*/}
                {/*        role="tabpanel"*/}
                {/*        aria-labelledby="questions-tab"*/}
                {/*    >*/}
                {/*        <QuizQuestionsEditor*/}

                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}