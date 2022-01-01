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
                            <li><a>Blog</a></li>
                            <li><a>Help</a></li>
                            <li><a>Something</a></li>
                            <li><a>Something</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Other Apps</h4>
                        <ul>
                            <li><a>Expensify App</a></li>
                            <li><a>Indecision App</a></li>
                            <li><a>Network App</a></li>
                            <li><a>Portfolio</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Something</h4>
                        <ul>
                            <li><a>Something</a></li>
                            <li><a>Something</a></li>
                            <li><a>Something</a></li>
                            <li><a>Something</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Follow us</h4>
                        <div className='social_links'>
                            <a><FacebookIcon size={32} round={true} /></a>
                            <a><TwitterIcon size={32} round={true} /></a>
                            <a><LinkedinIcon size={32} round={true} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;