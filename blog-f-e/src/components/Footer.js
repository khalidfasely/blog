import { FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import React from 'react';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-col'>
                        <h4>Other App</h4>
                        <ul>
                            <li><a href='#'>Expensify App</a></li>
                            <li><a href='#'>Indecision App</a></li>
                            <li><a href='#'>Network App</a></li>
                            <li><a href='#'>Portfolio</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Get help</h4>
                        <ul>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Something</h4>
                        <ul>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
                            <li><a href='#'>Something</a></li>
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