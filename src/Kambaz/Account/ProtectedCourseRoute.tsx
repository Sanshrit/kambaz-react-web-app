import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" replace />;
  }

  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
    return children;
  }
    if (!enrollments || enrollments.length === 0) {
    return <div className="text-center p-4">Loading course access...</div>;
  }

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  return isEnrolled ? children : <Navigate to="/Kambaz/Dashboard" replace />;
}