import { Badge, Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaTableTennis } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header>
            <Navbar className="club-navbar" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="club-brand">
                            <span className="brand-mark"><FaTableTennis /></span>
                            <span className="fw-semibold">Padel Club </span>
                            Novi Sad
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link className="reservation-link"><FaShoppingCart /> Rezervacije
                                    {cartItems.length > 0 && (
                                        <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
