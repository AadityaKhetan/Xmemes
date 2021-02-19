import '../styles/NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../assets/Error404.jpg';
import { Button } from 'reactstrap';

const NotFound = () => (
  <div className="Error"> 
    <h1 className="heading1">Error 404 - Not Found!</h1>
    <h5 className="headiyng2"> The page you are looking for does not exist </h5>
    <img className="image2" src={errorImg}/>
    <div className="pagent">
    <Link to="/" className="Button" primary outline>
      Go Home
    </Link>
    </div>
  </div>
);

export default NotFound;