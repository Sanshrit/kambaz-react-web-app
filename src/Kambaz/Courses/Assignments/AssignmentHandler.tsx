import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentHandler({ assignment, deleteAssignment }: { assignment: any; deleteAssignment: (assignmentId: string) => void; }) {
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-3 mb-1"
        style={{ cursor: "pointer" }}
        onClick={() => deleteAssignment(assignment._id)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-2" />
    </div>
  );
}