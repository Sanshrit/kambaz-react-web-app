import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <Form.Control id="wd-username"
                placeholder="username"
                className="mb-2" />
            <Form.Control id="wd-password"
                placeholder="password" type="password"
                className="mb-2" />
            <Form.Control id="wd-password-verify"
                placeholder="verify password" type="password"
                className="mb-2" /><br />
            <Link id="wd-signup-btn"
                to="/Kambaz/Account/Profile"
                className="btn btn-primary w-100 mb-2">
                Sign up </Link><br />
            <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
            <br />
        </div>
    );
}
//     <h3>Sign up</h3>
//     <input placeholder="username" className="wd-username" /><br />
//     <input placeholder="password" type="password" className="wd-password" /><br />
//     <input placeholder="verify password"
//         type="password" className="wd-password-verify" /><br />
//     <Link to="/Kambaz/Account/Profile" > Sign up </Link><br />
//     <Link to="/Kambaz/Account/Signin" >Sign in</Link>
// </div>