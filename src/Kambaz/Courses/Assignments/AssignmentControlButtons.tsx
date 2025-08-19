import { Badge } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <Badge bg="light" text="dark" className="fw-normal rounded-pill fs-5">
                40% of Total
            </Badge>
            <BsPlus className="fs-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}