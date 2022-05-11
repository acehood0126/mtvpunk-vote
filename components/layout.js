import {useState, useEffect, useRef} from "react"
import Footer from "./footer"
import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <div className="root">
            <Navbar/>
            <div className="container">
                {children}
            </div>
            <Footer />
        </div>
    )
}