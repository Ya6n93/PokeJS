import React, { Component } from "react";

class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-xl-12 mx-lg-auto">
                    <div className="pt-5 p-t-100 text-center">
                        <h1 className="text-primary">oops!</h1>
                        <p className="section-subtitle">Something went wrong. The page you are looking for is gone</p>
                        <p className="s-256">404</p>
                        <a href="/">Go To Home</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
