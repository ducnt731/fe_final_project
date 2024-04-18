import React from "react";
import Footer from "./footerCustomer";
import Header from "./headerCustomer";

const LayoutCustomer = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default LayoutCustomer