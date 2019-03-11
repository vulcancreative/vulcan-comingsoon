import React from 'react';
import ReactSVG from 'react-svg';
import { Link, NavLink } from 'react-router-dom';
import vulcanLogo from '../images/vulcan-logo.svg';
import '../styles/common/header.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link className="vulcan-logo" to="/">
          <ReactSVG src={vulcanLogo} svgClassName="logo" />
        </Link>
        <div className="nav">
          <NavLink activeClassName="active" to="/careers">
            Careers
          </NavLink>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
