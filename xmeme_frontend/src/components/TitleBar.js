import '../styles/TitleBar.css';
import logo from '../assets/laughing_logo.png';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText
} from 'reactstrap';
import {Link} from "react-router-dom";

const TitleBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" expand="md">
        <NavbarBrand ><img src={logo} height="50" width="50" style={{padding:'1px',margin:'1px'}}/><Link to={"/"} >XMEME</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Link to={"/"} className="nav-link">View Memes</Link>
            <Link to={"/add-meme"} className="nav-link">Add Memes</Link>
          </Nav>
          <NavbarText style={{color:'#007bff'}}>Made by : Aaditya Khetan</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TitleBar;