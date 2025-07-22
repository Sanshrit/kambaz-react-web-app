import "../styles.css";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const links = ["Signin", "Signup", "Profile"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

      {
        (links.map((link) => (<Link to={`/Kambaz/Account/${link}`} className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}> {link}  </Link>

        )))}
    </div>
  );
}
