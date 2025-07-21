import "../styles.css";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kambaz/Courses/${cid}/${link}`} className={
          `list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}
        >{link}</Link>))}
    </div>
  );
}
