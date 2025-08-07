import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FormControl } from "react-bootstrap";
export default function PeopleDetails() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };

    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    const [name, setName] = useState("");
    const [editing, setEditing] = useState(false);
    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        navigate(-1);
    };

    //email
    const [email, setEmail] = useState("");
    const [editingEmail, setEditingEmail] = useState(false);

    //role
    const [userRole, setUserRole] = useState("");
    const [editingRole, setEditingRole] = useState(false);

    const saveEmail = async () => {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingEmail(false);
    };

    const saveRole = async () => {
        const updatedUser = { ...user, role: userRole };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingRole(false);
    };

    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />

            <div className="text-danger fs-4">
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit" />)}
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" />)}
                {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}</div>)}
                {user && editing && (
                    <FormControl className="w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />)}
                        <br/>
            </div>
            {!editingEmail && (
                <FaPencil onClick={() => setEditingEmail(true)}
                    className="float-end fs-6 mt-1 text-danger wd-edit-email" />
            )}
            {editingEmail && (
                <FaCheck onClick={() => saveEmail()}
                    className="float-end fs-6 mt-1 me-2 wd-save-email" />
            )}
            {!editingEmail && (
                <div>
                    <b>Email:</b> <span className="wd-email text-danger" onClick={() => setEditingEmail(true)}>{user.email}</span> <br />
                </div>
            )}
            {user && editingEmail && (
                <div>
                    <b>Email:</b>
                    <FormControl className="w-75 d-inline-block ms-1 wd-edit-email-input"
                        type="email"
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveEmail(); }
                        }} />
                    <br />
                </div>
            )}
                        <b>Roles:</b>           
            {!editingRole && (
                <FaPencil onClick={() => setEditingRole(true)}
                    className="float-end fs-6 mt-1 text-danger wd-edit-role" />
            )}
            {editingRole && (
                <FaCheck onClick={() => saveRole()}
                    className="float-end fs-6 mt-1 me-2 wd-save-role" />
            )}
            {!editingRole && (
                <span className="wd-roles text-danger" onClick={() => setEditingRole(true)}>{user.role}</span>
            )}
            {user && editingRole && (
                <select value={userRole || user.role} onChange={(e) => setUserRole(e.target.value)}
                    className="form-select d-inline-block ms-1 w-50 wd-edit-role-select"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") { saveRole(); }
                    }}>
                    <option value="STUDENT">Students</option>
                    <option value="TA">Assistants</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </select>
            )}
            <br/>
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            {/* <b>Email:</b>      <span className="wd-email">         {user.email}        </span> <br /> */}
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>

        </div>);
}