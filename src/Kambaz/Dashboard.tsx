import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewCourse, deleteCourse, updateCourse, setCourse } from "./Courses/reducer";
import { addEnrollment, removeEnrollment } from "./Courses/People/reducer";
export default function Dashboard() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const { courses, course } = useSelector((state: any) => state.coursesReducer)
    const dispatch = useDispatch();
    // const publishedCourses = courses.filter((courseItem: any) =>
    //     enrollments.some(
    //         (enrollment: any) =>
    //             enrollment.user === currentUser._id &&
    //             enrollment.course === courseItem._id
    //     ));
    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";


    //Enrollment
    const [showAllCourses, setShowAllCourses] = useState(false);
    const enrolledCourses = courses.filter((courseItem: any) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === courseItem._id
        )
    );
    const isUserEnrolled = (courseId: string) => {
        return enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === courseId
        );
    };

    const toggleEnrollment = (courseId: any) => {
        if (isUserEnrolled(courseId)) {
            dispatch(removeEnrollment({ user: currentUser._id, course: courseId }));
        } else {
            dispatch(addEnrollment({ user: currentUser._id, course: courseId }));
        }
    };

    const filteredCourses = showAllCourses
        ? courses
        : courses.filter((courseItem: any) => isUserEnrolled(courseItem._id));



    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {isFaculty && (
                <>
                    <h5>New Course
                        <Button variant="primary" className="float-end mb-2 me-2"
                            id="wd-add-new-course-click"
                            onClick={() => dispatch(addNewCourse())}>Add</Button>
                        <Button variant="warning" className="float-end me-2 mb-2"
                            id="wd-update-course-click"
                            onClick={() => dispatch(updateCourse())}>Update</Button>
                        <FormControl value={course.name} className="mb-2" onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))} />
                        <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => dispatch(setCourse({ ...course, description: e.target.value }))} />
                    </h5><hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses ? `All Courses (${courses.length})` : `Published Courses (${enrolledCourses.length})`}
                <Button variant="primary" className="float-end mb-2"
                    onClick={() => setShowAllCourses(!showAllCourses)}>
                    {showAllCourses ? "Show Enrolled" : "Show All"}
                </Button>
            </h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {
                        filteredCourses.map((courseItem: any) => (
                            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                                <Card style={{ width: "100%" }} className="h-100">
                                    <Link to={`/Kambaz/Courses/${courseItem._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <Card.Img src={`/images/${courseItem.image}`} variant="top" width="100%" height={160} />
                                        <Card.Body className="card-body">
                                            <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden text-truncate">
                                                {courseItem.name} </Card.Title>
                                            <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                                {courseItem.description} </Card.Text>
                                            {(isFaculty || isUserEnrolled(courseItem._id)) && (
                                                <Button variant="primary">Go</Button>
                                            )}
                                            {isFaculty && (
                                                <>
                                                    <Button id="wd-delete-course-click" variant="danger" className="float-end"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(deleteCourse(courseItem._id));
                                                        }}> Delete </Button>
                                                    <Button id="wd-edit-course-click" variant="warning" className="float-end me-2"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(setCourse(courseItem));
                                                        }}> Edit </Button>
                                                </>
                                            )
                                            }
                                            {
                                                isStudent && (
                                                    <>
                                                        <Button className="float-end me-2 mb-2"
                                                            variant={
                                                                isUserEnrolled(courseItem._id) ? "danger" : "success"
                                                            }
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleEnrollment(courseItem._id);
                                                            }}
                                                        >
                                                            {isUserEnrolled(courseItem._id)
                                                                ? "Unenroll"
                                                                : "Enroll"}
                                                        </Button>
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