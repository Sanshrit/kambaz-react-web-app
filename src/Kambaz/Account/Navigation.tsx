import "../styles.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  // const links = ["Signin", "Signup", "Profile"];
  const { pathname } = useLocation();
  // const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

      {
        (links.map((link) => (<Link to={`/Kambaz/Account/${link}`} className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}> {link}  </Link>

        )))}
      {/* {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)} */}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kambaz/Account/Users`}
          className={`list-group-item ${pathname.includes("Users") ? "active" : "text-danger"} border border-0`}>
          Users
        </Link>
      )}
    </div>
  );
}
