import { IoEllipsisVertical } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "./reducer";
import * as client from "./client";

export default function QuizControlButtons({ quiz }: { quiz: any }) {
    const dispatch = useDispatch();

    const togglePublishStatus = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        
        try {
            const newStatus = quiz.status === "published" ? "unpublished" : "published";
            const updatedQuiz = { ...quiz, status: newStatus };
            
            // Update in database
            await client.updateQuiz(updatedQuiz);
            
            // Update Redux store
            dispatch(updateQuiz(updatedQuiz));
            
            console.log(`Quiz ${quiz.title} status changed to: ${newStatus}`);
        } catch (error) {
            console.error("Failed to toggle quiz status:", error);
            alert("Failed to update quiz status. Please try again.");
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        
        if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
            try {
                await client.deleteQuiz(quiz._id);
                dispatch(deleteQuiz(quiz._id));
                console.log(`Quiz ${quiz.title} deleted successfully`);
            } catch (error) {
                console.error("Failed to delete quiz:", error);
                alert("Failed to delete quiz. Please try again.");
            }
        }
    };

    return (
        <div className="float-end">
            <div className="dropdown d-inline me-1 float-end">
                <button
                    id="wd-quiz-context-btn"
                    className="border-0 bg-transparent p-0 fs-4 ms-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <IoEllipsisVertical />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link 
                            id="wd-quiz-edit-btn" 
                            className="dropdown-item" 
                            to={`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/editor`}
                        >
                            <FaPencil className="text-primary" /> Edit
                        </Link>
                    </li>
                    <li>
                        <button 
                            id="wd-quiz-delete-btn" 
                            className="dropdown-item border-0 bg-transparent text-start w-100"
                            onClick={handleDelete}
                        >
                            <FaTrash className="text-danger" /> Delete
                        </button>
                    </li>
                    <li>
                        <button 
                            id="wd-quiz-publish-btn" 
                            className="dropdown-item border-0 bg-transparent text-start w-100"
                            onClick={togglePublishStatus}
                        >
                            {quiz.status === "unpublished" ?
                                <GreenCheckmark /> : <FcCancel />} {quiz.status === "unpublished" ? "Publish" : "Unpublish"}
                        </button>
                    </li>
                </ul>
            </div>
            
            {/* Direct publish/unpublish button */}
            <div className="float-end">
                <button
                    id="wd-quiz-other-publish-btn"
                    className="border-0 bg-transparent p-0"
                    onClick={togglePublishStatus}
                >
                    {quiz.status === "published" ? <GreenCheckmark /> : <FcCancel />}
                </button>
            </div>
        </div>
    );
}