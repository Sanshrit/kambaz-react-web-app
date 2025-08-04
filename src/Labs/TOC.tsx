import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link to="/Labs" as={Link}>Labs</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Labs/Lab1" as={Link} active={pathname.includes("Lab1")}>Lab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Labs/Lab2" as={Link} active={pathname.includes("Lab2")}>Lab 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Labs/Lab3" as={Link} active={pathname.includes("Lab3")}>Lab 3</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Labs/Lab4" as={Link} active={pathname.includes("Lab4")}>Lab 4</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Labs/Lab5" as={Link} active={pathname.includes("Lab5")}>Lab 5</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/Kambaz" as={Link}>Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github" href="https://github.com/Sanshrit/kambaz-react-web-app">My GitHub</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github-server" href="https://github.com/Sanshrit/kambaz-node-server-app">My GitHub - Server</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/LandingPage" as={Link}>Landing Page</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
