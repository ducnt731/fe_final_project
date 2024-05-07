import React from "react";

const Footer = () => {
    return(
        <div className="footer-container">
            <footer className="text-center text-lg-start bg-dark text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-white">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fa-solid fa-film me-3"></i>DC Cinema
                                </h6>
                                <p>
                                    <i className="fas fa-gem me-3"></i>Develop by: Manh and Duc
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-white">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" className="text-white" style={{textDecoration: "none"}}>Orders</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white" style={{textDecoration: "none"}}>Feedback</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-white">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                <p><i className="fas fa-home me-3"></i>Hà Nội</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    finalproject@hotmail.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i>+84 313 123 232</p>
                                <p><i className="fas fa-print me-3"></i>+84 643 123 435</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4 text-white">
                    © 2024 Copyright:
                </div>
            </footer>
        </div>
    )
}

export default Footer