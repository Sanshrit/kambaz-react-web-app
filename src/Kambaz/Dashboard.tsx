import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
// import { useState } from "react";
import { useSelector } from "react-redux";
import * as db from "./Database";
import { Link } from "react-router-dom";
export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = db;
    const publishedCourses = courses.filter((courseItem) =>
        enrollments.some(
            (enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === courseItem._id
        ));
    const isFaculty = currentUser?.role === "FACULTY";
    // const [courses, setCourses] = useState<any[]>(db.courses);
    // const [course, setCourse] = useState<any>({
    //     _id: "0", name: "New Course", number: "New Number",
    //     startDate: "2023-09-10", endDate: "2023-12-15",
    //     image: "course.jpg", description: "New Description"
    // });
    // const addNewCourse = () => {
    //     const newCourse = { ...course, _id: new Date().getTime().toString() };
    //     setCourses([...courses, newCourse]);
    // };
    // const deleteCourse = (courseId: string) => {
    //     setCourses(courses.filter(course => course._id !== courseId));
    // };
    // const updateCourse = () => {
    //     setCourses(
    //         courses.map((c) => {
    //             if (c._id === course._id) {
    //                 return course;
    //             } else {
    //                 return c;
    //             }
    //         })
    //     );
    // };
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {isFaculty && (
                <>
                    <h5>New Course
                        <Button variant="primary" className="float-end mb-2 me-2"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}>Add</Button>
                        <Button variant="warning" className="float-end me-2 mb-2"
                            id="wd-update-course-click"
                            onClick={updateCourse}>Update</Button>
                        <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                        <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    </h5><hr />
                </>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({publishedCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {
                        publishedCourses.map((courseItem) => (
                            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                                <Card>
                                    <Link to={`/Kambaz/Courses/${courseItem._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <Card.Img src={`/images/${courseItem.image}`} variant="top" width="100%" height={160} />
                                        <Card.Body className="card-body">
                                            <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden text-truncate">
                                                {courseItem.name} </Card.Title>
                                            <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                                {courseItem.description} </Card.Text>
                                            <Button variant="primary"> Go </Button>
                                            {isFaculty && (
                                                <>
                                                    <Button id="wd-delete-course-click" variant="danger" className="float-end"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(courseItem._id);
                                                        }}> Delete </Button>
                                                    <Button id="wd-edit-course-click" variant="warning" className="float-end me-2"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(courseItem);
                                                        }}> Edit </Button>
                                                </>
                                            )
                                            }

                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}