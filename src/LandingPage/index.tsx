import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "react-bootstrap";
export default function LandingPage() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center'>
                <h1>Sanshrit Bakshi</h1>
                <h2 className='text-danger'>NUID: <span className="text-black">002407899</span></h2>
                <h2>CS 5610 -Web Development - Summer 2 - 2025</h2>
            </div>
            <br /><br /><br />
            <h2>Links</h2>
            <ButtonGroup className="w-50 shadow-sm">
                <Button
                    variant="outline-primary"
                    as={Link as any}
                    to="/Labs"
                    className="py-3 fw-bold border-2"
                >
                    Labs
                </Button>
                <Button
                    variant="outline-success"
                    as={Link as any}
                    to="/Kambaz"
                    className="py-3 fw-bold border-2"
                >
                    Kambaz
                </Button>
                <Button
                    variant="outline-dark"
                    href="https://github.com/Sanshrit/kambaz-react-web-app"
                    target="_blank"
                    className="py-3 fw-bold border-2"
                >
                    My GitHub
                </Button>
            </ButtonGroup>
        </div>
    );
}