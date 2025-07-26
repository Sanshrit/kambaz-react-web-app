import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      {
        profile && (
          <div>
            <Form.Control id="wd-username"
              defaultValue={profile.username}
              type="text" placeholder="username"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
            <Form.Control id="wd-password"
              defaultValue={profile.password}
              placeholder="password" type="password"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
            <Form.Control id="wd-firstname"
              defaultValue={profile.firstname}
              type="text" placeholder="First Name"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, firstname: e.target.value })} />
            <Form.Control id="wd-lastname"
              defaultValue={profile.lastname}
              type="text" placeholder="Last Name"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, lastname: e.target.value })} />
            <Form.Control id="wd-dob"
              defaultValue={profile.dob}
              type="date" className="mb-2"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
            <Form.Control id="wd-email"
              defaultValue={profile.email}
              type="email" className="mb-2"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <Form.Select id="wd-role" className="mb-2">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
            <Button variant="danger" onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
              Sign out
            </Button>

          </div>
        )
      }
    </div>
  );
}
