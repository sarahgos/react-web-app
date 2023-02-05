import React from "react";
import "./Footer.css";
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

// Footer component.
function Footer() {

    const navigate = useNavigate();

    const tutorialNav = () => {
        navigate('./tutorials');
    }

    const articleNav = () => {
        navigate('./articles');
    }

    const questionNav = () => {
        navigate('./questions');
    }

    const homeNav = () => {
        navigate('/');
    }

    return (
        <div>
            <br></br>
            <div className='footer'>
                <div className="footer-left">
                    <h2 className="footer-heading">Explore</h2>
                    <h4 onClick={homeNav} className="footer-links">Home</h4>
                    <h4 onClick={questionNav} className="footer-links">Questions</h4>
                    <h4 onClick={articleNav} className="footer-links">Articles</h4>
                    <h4 onClick={tutorialNav} className="footer-links">Tutorials</h4>
                </div>
                <div className="footer-center">
                    <h2 className="footer-heading">Support</h2>
                    <h4 className="footer-links">FAQs</h4>
                    <h4 className="footer-links">Help</h4>
                    <h4 className="footer-links">Contact Us</h4>
                </div>
                <div className='footer-right'>
                    <h2 className="footer-heading">Stay Connected</h2>
                    <a href='https://www.facebook.com/DeakinUniversity/'><FaFacebook color="white" className='icons'/></a>
                    <a href='https://www.instagram.com/deakinuniversity/?hl=en'><FaInstagram color="white" className='icons'/></a>
                    <a href='https://twitter.com/Deakin?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'><FaTwitter color="white" className='icons' /></a>
                </div>
            </div>
            <div className="footer">
                <br></br>
                <br></br>
                <h2 className="footer-heading">DEV@Deakin 2022</h2>
                <br></br>
           </div>
            <div className="footer-bottom">
                <a href=''><h4 className="footer-links-bottom">Privacy Policy</h4></a>
                <a href=''><h4 className="footer-links-bottom">Terms</h4></a>
                <a href=''><h4 className="footer-links-bottom">Code of Conduct</h4></a>
                <br></br>
            </div>
        </div>
    )
}

export default Footer;