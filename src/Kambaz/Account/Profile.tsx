import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
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
              defaultValue={profile.firstName}
              type="text" placeholder="First Name"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
            <Form.Control id="wd-lastname"
              defaultValue={profile.lastName}
              type="text" placeholder="Last Name"
              className="mb-2"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
            <Form.Control id="wd-dob"
              defaultValue={profile.dob}
              type="date" className="mb-2"
              placeholder="Date of Birth"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
            <Form.Control id="wd-email"
              defaultValue={profile.email}
              type="email" className="mb-2"
              placeholder="Email"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <Form.Select id="wd-role" className="mb-2" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
            <Button variant="primary" onClick={updateProfile} className="w-100 mb-2"> Update </Button>
            <Button variant="danger" onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
              Sign out
            </Button>

          </div>
        )
      }
    </div>
  );
}
