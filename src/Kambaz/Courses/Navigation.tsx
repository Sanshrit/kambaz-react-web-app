import "../styles.css";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Assignments", "Quizzes", "Grades", "People"];
  const extLinks = [
    {
      label: "Piazza",
      url: "https://piazza.com/class/mchnh9kzzbu35p"
    },
    {
      label: "Zoom",
      url: "https://zoom.us/myhome"
    }
  ]
  const { cid } = useParams();
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kambaz/Courses/${cid}/${link}`} className={
          `list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}
        >{link}</Link>))}
      {extLinks.map((link) => (
        <a href={`${link.url}`} target="_blank"
          className="list-group-item text-danger border border-0">{link.label}</a>
      ))}
    </div>
  );
}
