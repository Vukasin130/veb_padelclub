import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <Nav.Link as={Link} to="/">Ponuda</Nav.Link>
                ) : (
                    <Nav.Link disabled>Ponuda</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Nav.Link as={Link} to="/shipping">Podaci za rezervaciju</Nav.Link>
                ) : (
                    <Nav.Link disabled>Podaci za rezervaciju</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Nav.Link as={Link} to="/payment">Placanje</Nav.Link>
                ) : (
                    <Nav.Link disabled>Placanje</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <Nav.Link as={Link} to="/placeorder"> Pregled rezervacije </Nav.Link>
                ) : (
                    <Nav.Link disabled> Pregled rezervacije </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
