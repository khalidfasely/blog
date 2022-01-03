import { FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import React from 'react';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-col'>
                        <h4>About</h4>
                        <ul>
                            <li><a href='#'>Blog</a></li>
                            <li><a href='#'>Help</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Other Apps</h4>
                        <ul>
                            <li><a href='#'>Expensify App</a></li>
                            <li><a href='#'>Indecision App</a></li>
                            <li><a href='#'>Network App</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Follow us</h4>
                        <div className='social_links'>
                            <a href='#'><FacebookIcon size={32} round={true} /></a>
                            <a href='#'><TwitterIcon size={32} round={true} /></a>
                            <a href='#'><LinkedinIcon size={32} round={true} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;