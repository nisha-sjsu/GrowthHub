import React from 'react';
import NavBar from '../components/NavBarWithoutLogin';
import Footer from '../components/Footer';

const NotFound = () => {
    return (
        <>
            <NavBar />
            <div className="container" style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="row">
                    <div className="col-md-6">
                        <h1 style={{ fontSize: '72px' }}>Page not found</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default NotFound;
