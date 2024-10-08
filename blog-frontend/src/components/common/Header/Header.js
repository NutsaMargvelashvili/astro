import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavbarToggler
} from 'reactstrap';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import AccountMenu from './Menu/account';
import homeBg from 'images/home-bg.jpg';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated, onLogout } = this.props;
    return (
        <div>
          <Navbar className={cx("navbar", "navbar-expand-lg", "navbar-light", "fixed-top", "is-visible")} id="mainNav">
            <Container>
              <Link className={cx("navbar-brand")} to="/">HOME</Link>
              <NavbarToggler aria-label="Menu" onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="navbar-nav ml-auto">
                  <NavItem>
                    <NavLink to="/astromap">Astro Map</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/astrophotography">Astrophotography</NavLink>
                  </NavItem>
                  <AccountMenu isAuthenticated={isAuthenticated} onLogout={onLogout} />
                </Nav>
              </Collapse>
            </Container>
          </Navbar>

          <div className={cx("header")} style={{ backgroundImage: `url(${homeBg})`, backgroundSize: 'cover'}}>
            <div className="overlay"></div>
            <Container>
              <Row>
                <Col className={cx("mx-auto", { lg: "8", md: "10" })} >
                  <div className={cx("heading")}>
                    {/* <h1></h1> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
    );
  }
}

export default Header;