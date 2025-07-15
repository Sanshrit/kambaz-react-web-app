import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaClipboardList } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentHandler from "./AssignmentHandler";

export default function Assignments() {
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
            
                    {/* Single ListGroup container for all assignments with proper spacing */}
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-4 ps-2 d-flex align-items-start">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3" />
                                <FaClipboardList className="me-1 fs-3 text-success" />
                            </div>
                            <div className="ms-5 flex-grow-1">
                                <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link text-black fw-bold link-underline link-underline-opacity-0">
                                    A1 - ENV + HTML
                                </a>
                                <p className="mb-0">
                                    <span className="text-danger">Multiple Modules </span>| <b>Not Available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                                </p>
                            </div>
                            <div className="ms-auto text-nowrap">
                                <AssignmentHandler />
                            </div>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="wd-lesson p-4 ps-2 d-flex align-items-start">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3" />
                                <FaClipboardList className="me-1 fs-3 text-success" />
                            </div>
                            <div className="ms-5 flex-grow-1">
                                <a href="#/Kambaz/Courses/1234/Assignments/124" className="wd-assignment-link text-black fw-bold link-underline link-underline-opacity-0">
                                    A2 - CSS + BOOTSTRAP
                                </a>
                                <p className="mb-0">
                                    <span className="text-danger">Multiple Modules </span>| <b>Not Available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                                </p>
                            </div>
                            <div className="ms-auto text-nowrap">
                                <AssignmentHandler />
                            </div>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="wd-lesson p-4 ps-2 d-flex align-items-start">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3" />
                                <FaClipboardList className="me-1 fs-3 text-success" />
                            </div>
                            <div className="ms-5 flex-grow-1">
                                <a href="#/Kambaz/Courses/1234/Assignments/125" className="wd-assignment-link text-black fw-bold link-underline link-underline-opacity-0">
                                    A3 - JAVASCRIPT + REACT
                                </a>
                                <p className="mb-0">
                                    <span className="text-danger">Multiple Modules </span>| <b>Not Available until</b> May 27 at 12:00am | <b>Due</b> June 3 at 11:59pm | 100 pts
                                </p>
                            </div>
                            <div className="ms-auto text-nowrap">
                                <AssignmentHandler />
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}