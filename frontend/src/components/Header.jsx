import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaTableTennis, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
        } catch (error) {
            // Lokalna odjava ostaje bitna i ako server nije dostupan.
        }
        dispatch(logoutAction());
        dispatch(clearCartItems());
        navigate('/');
    };

    return (
        <header>
            <Navbar className="club-navbar" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="club-brand">
                        <span className="brand-mark"><FaTableTennis /></span>
                        <span className="fw-semibold">Padel Club </span>
                        Novi Sad
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo?.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <NavDropdown.Item as={Link} to='/admin/reservationlist'>
                                        Rezervacije
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/slotlist'>
                                        Termini
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/productlist'>
                                        Ponuda
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            <Nav.Link as={Link} to="/cart" className="reservation-link"><FaShoppingCart /> Rezervacije
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>
                                        Profil
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Odjavi se
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to="/login"><FaUser /> Prijava</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
