import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import "./RigthNav.css";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  display: none;
  @media (max-width: 799px) {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 80px;
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({ open }) => {
    const location = useLocation();
  return (
    <Ul open={open}>
        <div className="link">
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
                Shop
            </Link>
        </div>
        <div className="link">
            <Link to="/contacto" className={location.pathname === "/contacto" ? "active-link" : ""}>
                Contact
            </Link>
        </div>
        
        
    </Ul>
  )
}
export default RightNav