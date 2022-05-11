import React, {useState, useEffect} from "react"
import { Navbar as BNavbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from "next/router";
import imgLogo from '../assets/image/logo.png'
import { Button, Row, Col } from "react-bootstrap"
import useWeb3 from "../shared/hooks/useWeb3"
import useContracts from "../shared/hooks/useContracts"
import { shortWalletAddr } from "../utils"
import addresses from "../shared/addresses"

const NavBar = () => {
    
    const { connected, connecting, handleConnect, handleDisconnect, switchNetwork, chainId, walletAddress } = useWeb3()
    const { getBalance } = useContracts()
    
    const [votes, setVotes] = useState()
    const handleConnectClick = () => {
        if(!connected)
            handleConnect()
    }

    useEffect(async () => {
        if(connected) {
            const balance = await getBalance()
            setVotes(balance)
        }
    }, [getBalance])
    
    return (
        <BNavbar collapseOnSelect expand="xl" className="land-nav navbar-default" variant="dark">
            <div className="container">
                <BNavbar.Brand href="#" className="d-none d-xl-block">
                    <div className="logo-title">MTVPunks</div>
                </BNavbar.Brand>

                <Row className="navbar-header align-items-center d-xl-none w-100 h-100 gx-0">
                    <Col xs={2}>
                        <BNavbar.Toggle aria-controls="responsive-navbar-nav" className="text-white" >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="18" fill="#7951EC"/>
                                <path d="M8.25562 18H21.3186" stroke="white"/>
                                <path d="M8.25562 12.1666H27.7444" stroke="white"/>
                                <path d="M8.25562 23.8334H27.7444" stroke="white"/>
                            </svg>
                        </BNavbar.Toggle>
                    </Col>
                    <Col xs={8} className="d-flex justify-content-center">
                        <BNavbar.Brand href="#" className="d-xl-none mx-auto">
                            <div className="logo-title">MTVPunks</div>
                        </BNavbar.Brand>
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>

                <BNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav w-100 justify-content-end align-items-center" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link href="http://mtvpunks.com/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Link href="/">Main</Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Link href="/submit">Proposal Submit</Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            {connected ?
                            chainId === addresses.networkID ?
                            <Row className="gx-0">
                                <Col xl="auto" xs={12} className="text-center">
                                    <Button variant="secondary" className="mx-2 my-1" onClick={handleConnectClick}>
                                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.8029 0.00017444H8.19672C7.92287 0.00017444 7.70098 0.22206 7.70098 0.495912V10.2622L2.60921 10.2625C2.38142 10.2625 2.18287 10.4178 2.1281 10.6387L0.0148033 19.151C0.00982414 19.1716 0.0144921 19.1912 0.0123137 19.2117C0.00982414 19.2319 0.000488281 19.2497 0.000488281 19.2705V29.9219C0.000488281 30.1957 0.222374 30.4176 0.496226 30.4176H29.5042C29.7781 30.4176 29.9999 30.1957 29.9999 29.9219L29.9996 19.2697C29.9996 19.2489 29.9903 19.2311 29.9878 19.2109C29.9853 19.1904 29.9903 19.1708 29.985 19.1502L27.8717 10.6379C27.8166 10.4167 27.6184 10.2617 27.3906 10.2617L22.2988 10.262V0.495738C22.2988 0.222197 22.0769 0 21.8031 0L21.8029 0.00017444ZM8.69225 0.991618H21.3066V14.9993H8.69225V0.991618ZM29.0079 29.426H0.991731V19.7657H29.0079V29.426ZM27.0025 11.2534L28.8697 18.774H1.13003L2.99724 11.2534H7.70128V14.9986H6.10732C5.83347 14.9986 5.61159 15.2205 5.61159 15.4944C5.61159 15.7682 5.83347 15.9901 6.10732 15.9901H23.8928C24.1666 15.9901 24.3885 15.7682 24.3885 15.4944C24.3885 15.2205 24.1666 14.9986 23.8928 14.9986H22.2988V11.2534H27.0025Z" fill="#1D0D52"/>
                                        </svg>
                                        <span className="ms-1">
                                            Vote weight: {votes} votes
                                        </span>
                                    </Button>
                                </Col>
                                <Col xl="auto" xs={12} className="text-center">
                                    <Button variant="primary" className="mx-2 my-1">
                                        {shortWalletAddr(walletAddress)}
                                    </Button>
                                </Col>
                            </Row> 
                            :
                            <Button variant="secondary" className="mx-2 my-1" onClick={switchNetwork}>Switch Network</Button>
                            :
                                <Button variant="secondary" className="mx-2 my-1" onClick={handleConnectClick}>connect wallet</Button>
                            }
                        </Nav.Item>
                        {/* <Nav.Item as="li">
                            <Link href="#join-section">
                                <Button variant="primary">JOIN NOW</Button>
                            </Link>
                        </Nav.Item> */}
                    </Nav>
                </BNavbar.Collapse>
            </div>
        </BNavbar>
    );
  };
  
  export default NavBar;
  