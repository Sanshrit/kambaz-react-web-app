import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaClipboardList } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentHandler from "./AssignmentHandler";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { useEffect } from "react";
export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const fetchAllAssignments = async () => {
        const modules = await assignmentsClient.fetchAssignmentsForCourse(cid as string);
        dispatch(setAssignments(modules));
    };
    useEffect(() => {
        fetchAllAssignments();
    }, [cid]);

    const handleDeleteAssignment = async (assignmentId: string, assignmentTitle: string) => {
        if (window.confirm(`Are you sure you want to delete the assignment "${assignmentTitle}"?`)) {
            try {
                await assignmentsClient.deleteAssignment(assignmentId);

                dispatch(deleteAssignment(assignmentId));

                console.log("Assignment deleted successfully");
            } catch (error) {
                console.error("Error deleting assignment:", error);
                alert("Failed to delete assignment. Please try again.");
            }
        }
    }
    return (
        <div>
            <AssignmentControls />

            <br /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /><IoMdArrowDropdown className="me-1 fs-3" />
                        ASSIGNMENTS
                        <AssignmentControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {assignments
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <ListGroup.Item className="wd-lesson p-4 ps-2 d-flex align-items-start">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="fs-3" />
                                        <FaClipboardList className="me-1 fs-3 text-success" />
                                    </div>
                                    <div className="ms-5 flex-grow-1">
                                        <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-black fw-bold link-underline link-underline-opacity-0">{assignment.title}</Link>
                                        <p className="mb-0">
                                            <span className="text-danger">Multiple Modules </span>| <b>Not Available until</b> {assignment.available.split('T')[0]} at {assignment.available.split('T')[1]} | <b>Due</b> {assignment.due.split('T')[0]} at {assignment.due.split('T')[1]} | {assignment.points} pts
                                        </p>
                                    </div>
                                    <div className="ms-auto text-nowrap">
                                        <AssignmentHandler
                                            assignment={assignment}
                                            deleteAssignment={() => handleDeleteAssignment(assignment._id, assignment.title)}

                                        />
                                    </div>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
