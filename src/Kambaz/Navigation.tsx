import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 105 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

      <ListGroup.Item id="wd-neu-link" target="_blank" action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" /></ListGroup.Item>

      <ListGroup.Item id="wd-account-link" to="/Kambaz/Account" as={Link}
        className="text-center border-0 bg-black text-white">
        <FaRegCircleUser className="fs-1 text text-white" /><br />
        Account </ListGroup.Item>

      <ListGroup.Item id="wd-dashboard-link" to="/Kambaz/Dashboard" as={Link}
        className="text-center border-0
                  bg-white text-danger">
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard </ListGroup.Item>

      <ListGroup.Item id="wd-course-link" to="/Kambaz/Dashboard" as={Link}
        className="text-white
                  bg-black text-center border-0">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses </ListGroup.Item>
      {/* complete styling the rest of the links */}

      <ListGroup.Item id="wd-calendar-link" to="/Kambaz/Calendar" as={Link}
        className="text-center border-0
                  bg-black text-white">
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar </ListGroup.Item>

      <ListGroup.Item id="wd-inbox-link" to="/Kambaz/Inbox" as={Link}
        className="text-center border-0
                  bg-black text-white">
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox </ListGroup.Item>

      <ListGroup.Item id="wd-labs-link" to="/Labs" as={Link}
        className="text-center border-0
                  bg-black text-white">
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs </ListGroup.Item>

      <ListGroup.Item id="wd-settings-link" to="/LandingPage" as={Link}
        className="text-center border-0
                  bg-black text-white">
        <FaHome className="fs-1 text-danger" /><br />
        Landing Page </ListGroup.Item>
        





    </ListGroup>)
    ;
}
