import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function QuizControls() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "TA";
    
    return (
        <div className="wd-quiz-controls mb-3">
            <div className="d-flex justify-content-between align-items-center">
                {/* Search Bar */}
                <div className="w-25">
                    <input 
                        className="form-control" 
                        placeholder="Search for Quiz" 
                        type="text"
                    />
                </div>
                
                {/* Faculty Controls */}
                {isFaculty && (
                    <div>
                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/new/editor`}>
                            <button className="btn btn-danger">
                                <FaPlus className="me-2" />
                                Quiz
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <hr />
        </div>
    );
}
