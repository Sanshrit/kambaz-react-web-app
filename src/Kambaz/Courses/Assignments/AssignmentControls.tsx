import { FaPlus } from "react-icons/fa6";
import { Button, InputGroup } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router";
import { Link } from "react-router";
export default function AssignmentControls() {
    const { cid } = useParams();

    return (
        <div id="wd-assignments-controls" className="text-nowrap">
            <InputGroup className="me-1 float-start w-50 w-md-25" style={{ width: "40%" }}>
                <InputGroup.Text>
                    <CiSearch />
                </InputGroup.Text>
                <Form.Control className=""
                    type="search"
                    placeholder="Search..."
                    size="lg"
                />
            </InputGroup>
            <Link to={`/Kambaz/Courses/${cid}/Assignments/new`}>
                <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </Button>
            </Link>
            {/* Add more controls as needed */}
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}