import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img className='mgs' src={assets.logo} alt="" />
          <p>Michael Scott Food Company</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            {/* LinkedIn icon with link */}
            <a href="https://www.linkedin.com/in/mutahir-qousain-392833214/" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>Get in Touch</h2>
          <ul>
            <li><a href="tel:03236022290">Phone: 03236022290</a></li>
            <li><a href="mailto:mianmutahir8786@gmail.com">Email: mianmutahir8786@gmail.com</a></li>          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ MgS.com - All rights reserved.</p>
    </div>
  );
}

export default Footer;
