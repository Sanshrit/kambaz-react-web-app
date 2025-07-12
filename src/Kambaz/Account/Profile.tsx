import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form.Control id="wd-username"
        defaultValue="alice"
        type="text" placeholder="username"
        className="mb-2" />
      <Form.Control id="wd-password"
        defaultValue="123"
        placeholder="password" type="password"
        className="mb-2" />
      <Form.Control id="wd-firstname"
        defaultValue="Alice"
        type="text" placeholder="First Name"
        className="mb-2" />
      <Form.Control id="wd-lastname"
        defaultValue="Wonderland"
        type="text" placeholder="Last Name"
        className="mb-2" />
      <Form.Control id="wd-dob"
        defaultValue="2000-01-01"
        type="date" className="mb-2" />
      <Form.Control id="wd-email"
        defaultValue="alice@wonderland"
        type="email" className="mb-2" />
      <Form.Select id="wd-role" className="mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select><br />
      <Link id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mb-2">
        Sign out </Link><br />
      <Link id="wd-signin-link" to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
// <h3>Profile</h3>
// <input defaultValue="alice" type="text" placeholder="username" className="wd-username"/><br/>
// <input defaultValue="123"   placeholder="password" type="password"
//        className="wd-password" /><br/>
// <input defaultValue="Alice" type="text" placeholder="First Name" id="wd-firstname" /><br/>
// <input defaultValue="Wonderland" type="text" placeholder="Last Name" id="wd-lastname" /><br/>
// <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
// <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
// <select defaultValue="FACULTY" id="wd-role">
//   <option value="USER">User</option>       <option value="ADMIN">Admin</option>
//   <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
// </select><br/>
// <Link to="/Kambaz/Account/Signin" >Sign out</Link>