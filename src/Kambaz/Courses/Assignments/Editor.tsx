import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router";
import * as db from "../../Database"
export default function AssignmentEditor() {
    const { aid } = useParams();
    const { cid } = useParams();
    const assignments = db.assignments;
    return (
        <div>
            {assignments
                .filter((assignment: any) => assignment._id === aid)
                .map((assignment: any) => (
                    <div id="wd-assignments-editor" className="px-5">
                        <Form.Group className="mb-3" controlId="wd-name">
                            <Form.Label>
                                Assignment Name
                            </Form.Label>
                            <Form.Control type="text" defaultValue={`${assignment.title}`} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="wd-description">
                            <Form.Control as="textarea" rows={4} defaultValue={`${assignment.description}`} />
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="wd-points">
                            <Form.Label column sm={2} className="text-sm-end offset-sm-4">
                                Points
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" defaultValue={`${assignment.points}`} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="wd-group">
                            <Form.Label column sm={2} className="text-sm-end offset-sm-4">
                                Assignment Group
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Select defaultValue="ASSIGNMENTS">
                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="PROJECT">PROJECT</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
                            <Form.Label column sm={2} className="text-sm-end offset-sm-4">
                                Display Grade as
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Select defaultValue="Percentage">
                                    <option value="PERCENTAGE">PERCENTAGE</option>
                                    <option value="LETTER">LETTER</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
                            <Form.Label column sm={2} className="text-sm-end offset-sm-4">
                                Submission Type
                            </Form.Label>
                            <Col sm={6}>
                                <div className="border-dark border p-3 rounded w-100">
                                    <Form.Select defaultValue="ONLINE" id="wd-submission-type">
                                        <option value="ONLINE">Online</option>
                                        <option value="INPERSON">In-Person</option>
                                    </Form.Select>
                                    <div className="mt-2">
                                        <div className="fw-bold mb-2">Online Entry Options</div>
                                        <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" className="mb-2" />
                                        <Form.Check type="checkbox" label="Website URL" id="wd-website-url" className="mb-2" />
                                        <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" className="mb-2" />
                                        <Form.Check type="checkbox" label="Student Annotations" id="wd-student-annotation" className="mb-2" />
                                        <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" className="mb-2" />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="wd-assign">
                            <Form.Label column sm={2} className="text-sm-end offset-sm-4">
                                Assign
                            </Form.Label>
                            <Col sm={6}>
                                <div className="border-dark border p-3 rounded w-100">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Assign to</Form.Label>
                                        <Form.Control type="text" defaultValue="Everyone" id="wd-assign-to" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold mb-2">Due</Form.Label>
                                        <Form.Control type="datetime-local" defaultValue={`${assignment.due}`} id="wd-due-date" />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold mb-2">Available From</Form.Label>
                                                <Form.Control type="datetime-local" defaultValue={`${assignment.available}`} id="wd-available-from" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold mb-2">Until</Form.Label>
                                                <Form.Control type="datetime-local" defaultValue={`${assignment.due}`} id="wd-available-until" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>


                        </Form.Group>

                        <hr />
                        <Row>
                            <Col className="text-end">
                                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                                    <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
                                        Save
                                    </Button>
                                    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
                                        Cancel
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                ))
            }
        </div>
    );
}