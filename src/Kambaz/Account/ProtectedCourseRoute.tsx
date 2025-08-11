import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setEnrollments } from "../Courses/People/reducer";
import * as enrollmentsClient from "../Courses/People/client";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (currentUser?._id) {
        try {
          // Only fetch if enrollments array is empty
          if (enrollments.length === 0) {
            const serverEnrollments = await enrollmentsClient.fetchAllEnrollments();
            dispatch(setEnrollments(serverEnrollments));
          }
        } catch (error) {
          console.error("Error fetching enrollments:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [currentUser, enrollments.length, dispatch]);

  // Show loading while fetching enrollments
  if (loading && enrollments.length === 0) {
    return <div className="text-center p-4">Loading course access...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" replace />;
  }

  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
    return children;
  }

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  return isEnrolled ? children : <Navigate to="/Kambaz/Dashboard" replace />;
}