import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/">
                        <Nav.Link>Ponuda</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Ponuda</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>Podaci za rezervaciju</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Podaci za rezervaciju</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>Placanje</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Placanje</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link> Pregled rezervacije </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled> Pregled rezervacije </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
