import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
            updateEnrollment: (courseId: string, enrolled: boolean) => void
        }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    // const dispatch = useDispatch();
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
    const isAdmin = currentUser?.role === "ADMIN";
    // const isStudent = currentUser?.role === "STUDENT";

    // const fetchEnrollments = async () => {
    //     if (currentUser?._id) {
    //         try {
    //             const serverEnrollments = await enrollmentsClient.fetchAllEnrollments();
    //             dispatch(setEnrollments(serverEnrollments));
    //         } catch (error) {
    //             console.error("Error fetching enrollments:", error);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     fetchEnrollments();
    // }, [currentUser]);

    // //Enrollment
    // // const [showAllCourses, setShowAllCourses] = useState(false);
    // const enrolledCourses = courses.filter((courseItem: any) =>
    //     enrollments.some(
    //         (enrollment: any) =>
    //             enrollment.user === currentUser._id &&
    //             enrollment.course === courseItem._id
    //     )
    // );
    // const isUserEnrolled = (courseId: string) => {
    //     return enrollments.some(
    //         (enrollment: any) =>
    //             enrollment.user === currentUser._id &&
    //             enrollment.course === courseId
    //     );
    // };

    // const toggleEnrollment = async (courseId: string) => {
    //     try {
    //         if (isUserEnrolled(courseId)) {
    //             // 1. Unenroll from server
    //             await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);

    //             // 2. Update local Redux state
    //             dispatch(removeEnrollment({ user: currentUser._id, course: courseId }));

    //         } else {
    //             // 1. Enroll on server
    //             const newEnrollment = await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);

    //             // 2. Update local Redux state
    //             dispatch(addEnrollment(newEnrollment));
    //         }
    //     } catch (error) {
    //         console.error("Error toggling enrollment:", error);
    //         alert("Failed to update enrollment. Please try again.");
    //     }
    // };

    // const filteredCourses = showAllCourses
    //     ? courses
    //     : courses.filter((courseItem: any) => isUserEnrolled(courseItem._id));
    console.log("Courses being rendered:", courses);
    courses.forEach((course, index) => {
        console.log(`Course ${index}:`, {
            _id: course._id,
            name: course.name,
            image: course.image,
            enrolled: course.enrolled
        });
    });

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

            <h2 id="wd-dashboard-published">
                {enrolling ? `All Courses (${courses.length})` : `Published Courses (${courses.length})`}
                {/* <Button variant="primary" className="float-end mb-2"
                    onClick={() => setShowAllCourses(!showAllCourses)}>
                    {showAllCourses ? "Show Enrolled" : "Show All"}
                </Button> */}
                {
                    !isAdmin && (
                        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                            {enrolling ? "My Courses" : "All Courses"}
                        </button>
                    )
                }
            </h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {
                        courses.map((courseItem: any) => (
                            <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                                <Card style={{ width: "100%" }} className="h-100">
                                    <Link to={`/Kambaz/Courses/${courseItem._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <Card.Img src={`/images/${courseItem.image}`} variant="top" width="100%" height={160} />
                                        <Card.Body className="card-body">
                                            <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden text-truncate">
                                                {courseItem.name} </Card.Title>
                                            <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                                {courseItem.description}
                                            </Card.Text>
                                            {(isFaculty || courseItem.enrolled) && (
                                                <Button variant="primary">Go</Button>
                                            )}
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
                                            {
                                                !isAdmin && (
                                                    <>
                                                        {
                                                            <button onClick={(event) => {
                                                                event.preventDefault();
                                                                updateEnrollment(courseItem._id, !courseItem.enrolled);
                                                            }} className={`btn ${courseItem.enrolled ? "btn-danger" : "btn-success"} w-100 mt-2`} >
                                                                {courseItem.enrolled ? "Unenroll" : "Enroll"}
                                                            </button>
                                                        }
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