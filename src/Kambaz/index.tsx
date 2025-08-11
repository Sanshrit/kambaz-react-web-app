import "./styles.css"
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Account from "./Account";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Account/ProtectedCourseRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, removeEnrollment } from "./Courses/People/reducer";
import { setEnrollments } from "./Courses/People/reducer";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const dispatch = useDispatch();
    // const fetchCourses = async () => {
    //     try {
    //         const courses = await userClient.findMyCourses();
    //         setCourses(courses);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // const findCoursesForUser = async () => {
    //     try {
    //         const courses = await userClient.findCoursesForUser(currentUser._id);
    //         const coursesWithEnrollmentFlag = courses.map((course: any) => ({
    //             ...course,
    //             // enrolled: true
    //         })); ``
    //         console.log("findCoursesForUser result:", courses);
    //         setCourses(coursesWithEnrollmentFlag);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const findCoursesForUser = async () => {
        try {
            console.log("=== DEBUGGING findCoursesForUser ===");
            console.log("currentUser._id:", currentUser._id);
            const courses = await userClient.findCoursesForUser(currentUser._id);
            console.log("API response - courses:", courses);
            console.log("API response - courses length:", courses.length);
            console.log("API response - first course:", courses[0]);
            setCourses(courses); // Use courses directly - no mapping needed
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchCourses = async () => {
    //     try {
    //         // Fetch ALL available courses instead of just enrolled courses
    //         const courses = await courseClient.fetchAllCourses();
    //         setCourses(courses);
    //     } catch (error) {
    //         console.error("Error fetching courses:", error);
    //     }
    // };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            console.log("All courses:", allCourses);
            console.log("Enrolled courses:", enrolledCourses);
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            console.log("Final courses with enrollment flags:", courses);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };


    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };
    const deleteCourse = async (courseId: any) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
        return status;
    };
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
            dispatch(addEnrollment({ user: currentUser._id, course: courseId }));
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
            dispatch(removeEnrollment({ user: currentUser._id, course: courseId }));
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };
    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    useEffect(() => {
        const fetchUserEnrollments = async () => {
            if (currentUser?._id) {
                try {
                    // Use the real enrollment endpoint instead of transforming course data
                    const enrollments = await userClient.findEnrollmentsForUser(currentUser._id);
                    console.log("Setting real enrollments for Redux store:", enrollments);
                    dispatch(setEnrollments(enrollments));
                } catch (error) {
                    console.error("Error fetching user enrollments:", error);
                }
            }
        };

        fetchUserEnrollments();
    }, [currentUser, dispatch]);
    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard/*" element={
                            <ProtectedRoute>
                                <Dashboard courses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    enrolling={enrolling}
                                    setEnrolling={setEnrolling}
                                    updateEnrollment={updateEnrollment} />
                            </ProtectedRoute>} />
                        <Route path="/Courses/:cid/*" element={<ProtectedCourseRoute><Courses courses={courses} /></ProtectedCourseRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
