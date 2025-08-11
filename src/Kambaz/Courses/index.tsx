import CourseNavigation from "./Navigation";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client";
// import { useSelector } from "react-redux";
export default function Courses({ courses }: { courses: any[] }) {
    const { cid } = useParams();
    // const { courses } = useSelector((state: any) => state.coursesReducer);
    // const course = courses.find((c: any) => c._id === cid);
    const [course, setCourse] = useState<any>(null);
    const { pathname } = useLocation();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const foundCourse = courses.find((c: any) => c._id === cid);
        if (foundCourse) {
            setCourse(foundCourse);
        } else if (courses.length > 0) {
            // Courses are loaded but course not found - fetch it
            fetchSingleCourse();
        }
        //  wait for courses to load
    }, [courses, cid]);

    const fetchSingleCourse = async () => {
        try {
            const courseData = await client.fetchCourseById(cid as any);
            setCourse(courseData);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };

    const fetchUsers = async (cid: any) => {
        const users = await client.findUsersForCourse(cid);
        setUsers(users);
    };
    const { uid } = useParams();
    useEffect(() => {
        fetchUsers(cid);
    }, [uid]);
    console.log("Current course:", course);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h2>Piazza</h2>} />
                        <Route path="Zoom" element={<h2>Zoom</h2>} />
                        <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<h2>Grades</h2>} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}

