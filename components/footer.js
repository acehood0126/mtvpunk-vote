import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import { Col, Row } from "react-bootstrap";
import imgLogo from '../assets/image/logo.png'

const Footer = () => {
    return (
	    <footer>
			<div className="container">
                <Row className="gy-4">
                    <Col xxl={4}>
                        <div className="logo-title">MTVPunks</div>
                        <div className="mt-3 mx-auto mx-lg-0" style={{maxWidth: "360px"}}>
                            MTVPunks DAO is community
                            running with thousands of
                            DAO members.
                        </div>
                    </Col>
                    <Col xxl={8} id="join-section">
                        <Row className="gy-4">
                            <Col lg={4}>
                                <h4 className="mb-lg-4 mb-2">ABOUT US</h4>
                                <div className="mb-2">
                                    <a  target="_blank" rel="noreferrer">
                                        About
                                    </a> 
                                </div>                
                                <div className="mb-2">
                                    <a  target="_blank" rel="noreferrer">
                                        FAQ
                                    </a>
                                </div>       
                                <div className="mb-2">
                                    <a  target="_blank" rel="noreferrer">
                                        Contact
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a  target="_blank" rel="noreferrer">
                                        Terms of Service
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a  target="_blank" rel="noreferrer">
                                        Privacy
                                    </a>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <h4 className="mb-lg-4 mb-2">FOLLOW US</h4>
                                {/* <div className="mb-2">
                                    <a href="#" target="_blank" className="follow-icon">
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                                        <span className="ms-2">Facebook</span>
                                    </a> 
                                </div>                 */}
                                <div className="mb-2">
                                    <a href="https://twitter.com/RealMTVPunks" target="_blank" rel="noreferrer" className="follow-icon">
                                        <FontAwesomeIcon icon={['fab', 'twitter']}/>
                                        <span className="ms-2">Twitter</span>
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a href="https://discord.gg/ztQByx4r" target="_blank" rel="noreferrer" className="follow-icon">
                                        <FontAwesomeIcon icon={['fab', 'discord']}/>
                                        <span className="ms-2">Discord</span>
                                    </a>
                                </div>
                                {/* <div className="mb-2">
                                    <a href="#" target="_blank" className="follow-icon">
                                        <FontAwesomeIcon icon={['fab', 'instagram']}/>
                                        <span className="ms-2">Instagram</span>
                                    </a>
                                </div>
                                <div className="mb-2">
                                    <a href="#" target="_blank" className="follow-icon">
                                        <FontAwesomeIcon icon={['fab', 'telegram-plane']}/>
                                        <span className="ms-2">Telegram</span>
                                    </a>
                                </div> */}
                            </Col>
                            <Col lg={4}>
                                <h4 className="mb-lg-4 mb-2">CONTACT</h4>
                                <div className="d-inline-flex mb-lg-3 mb-2 mail-icon no-wrap">
                                    <FontAwesomeIcon icon={'envelope'} />
                                    <a className="d-inline ms-2" rel="noreferrer" href="mailto:mtvpunks@gmail.com">mtvpunks@gmail.com</a>
                                </div>
                                {/* <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                    <a href="#" target="_blank" className="social-icon">
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} color="#7951EC"/>
                                    </a>                        
                                    <a href="#" target="_blank" className="social-icon">
                                        <FontAwesomeIcon icon={['fab', 'twitter']} color="#7951EC"/>
                                    </a>
                                    <a href="#" target="_blank" className="social-icon">
                                        <FontAwesomeIcon icon={['fab', 'instagram']} color="#7951EC"/>
                                    </a>
                                    <a href="#" target="_blank" className="social-icon">
                                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} color="#7951EC"/>
                                    </a>
                                    <a href="#" target="_blank" className="social-icon">
                                        <FontAwesomeIcon icon={['fab', 'google-plus-g']} color="#7951EC"/>
                                    </a>
                                </div> */}
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
		</footer>
    );
  };
  
  export default Footer;
  