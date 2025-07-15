import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <Form.Control id="wd-username"
                defaultValue={"Sanshrit"}
                placeholder="username"
                className="mb-2" />
            <Form.Control id="wd-password"
                defaultValue={"password"}
                placeholder="password" type="password"
                className="mb-2" />
            <Form.Control id="wd-password-verify"
                defaultValue={"password"}
                placeholder="verify password" type="password"
                className="mb-2" />
            <Link id="wd-signup-btn"
                to="/Kambaz/Account/Profile"
                className="btn btn-primary w-100 mb-2">
                Sign up </Link><br />
            <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
            <br />
        </div>
    );
}
