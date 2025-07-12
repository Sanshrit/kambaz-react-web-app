import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center'>
                <h1>Sanshrit Bakshi</h1>
                <h2 className='text-danger'>NUID: </h2>
                <h2>CS5610 -Web Development - Summer 2 - 2025</h2>
            </div>
            <br /><br /><br />

            <div className='text-center'>
                <h3 className="text-decoration-underline">Links</h3>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link to="/Labs" as={Link}>Labs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/Kambaz" as={Link}>Kambaz</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link id="wd-github" href="https://github.com/Sanshrit/kambaz-react-web-app">My GitHub</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
}