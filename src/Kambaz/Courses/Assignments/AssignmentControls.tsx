import { FaPlus } from "react-icons/fa6";
import { Button, InputGroup } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
export default function AssignmentControls() {
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
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Button>
            {/* Add more controls as needed */}
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}