import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> 
                       <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                         <BsGripVertical className="me-2 fs-3" />  LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Introduction to the course</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Learn what is Web Development</text>
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            READING
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 1 - Introduction</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 2 - Creating User</text>
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            SLIDES
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Introduction to Web Development</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Creating an HTTP server with Node.js</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Creating a React Application</text>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>

                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            LEARNING OBJECTIVES
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Understand HTML document structure</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Learn basic HTML elements and attributes</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            READING
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 3 - HTML Basics</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 4 - HTML Elements</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            SLIDES
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">HTML Document Structure</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Common HTML Elements</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">HTML Attributes and Properties</text>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> Week 3 </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            LEARNING OBJECTIVES
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Introduction to CSS and styling concepts</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Learn CSS selectors and properties</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            READING
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 5 - CSS Fundamentals</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Full Stack Developer - Chapter 6 - CSS Layout</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            SLIDES
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Introduction to CSS</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">CSS Selectors and Specificity</text>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <text className="ms-5">Box Model and Layout Basics</text>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}