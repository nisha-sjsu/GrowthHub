// FooterBlock.js
import React from 'react';
// import { Container, Grid, Typography, Link, Button, IconButton } from '@material-ui/core';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
// import TumblrIcon from '@material-ui/icons/Tumblr';
import TumblrIcon from './TubblrIcon';
import { Container, Grid, Typography, Link, Button, IconButton } from '@mui/material';

const styles = {
    footer: {
        backgroundColor: 'rgb(23 23 23)', // Adjust the color to match your design
        padding: '20px 0',
        borderTop: '1px solid #e0e0e0', // Border color can be adjusted
    },
    linkColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    link: {
        margin: '4px 0',
    },
    supportSection: {
        marginTop: '20px',
    },
    socialMedia: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
};

const FooterBlock = () => {
    return (
        <footer style={styles.footer}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Columns with links */}
                    <Grid item xs={12} sm={3}>
                        <div style={styles.linkColumn}>
                            <Typography variant="subtitle1">Product</Typography>
                            {/* Add your links here */}
                            <Link href="#" style={styles.link}>IOS App</Link>
                            {/* ... other links */}
                        </div>
                    </Grid>
                    {/* Repeat for other columns */}

                    {/* Support Section */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" style={styles.supportSection}>
                            Help Support GrowthHub
                        </Typography>
                        <Typography variant="body2">
                            GrowthHub is an open source project that depends on our users for support. The money you spend on gems helps us keep the servers running, maintain a small staff, develop new features, and provide incentives for our volunteers
                        </Typography>
                        <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                            Donate to GrowthHub
                        </Button>
                    </Grid>

                    {/* Social Media Icons */}
                    <Grid item xs={12} sm={3} style={styles.socialMedia}>
                        {/* Replace with actual links and icons */}
                        <IconButton><InstagramIcon /></IconButton>
                        <IconButton><TwitterIcon /></IconButton>
                        <IconButton><FacebookIcon /></IconButton>
                        <IconButton><TumblrIcon /></IconButton>
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
                    <Typography variant="body2">&copy; 2024 GrowthHub. All rights reserved.</Typography>
                    <div>
                        <Link href="#" style={styles.link}>Privacy Policy</Link>
                        <Link href="#" style={styles.link}>Terms and Conditions</Link>
                    </div>
                </Grid>
            </Container>
        </footer>
    );
};

export default FooterBlock;

/*
 import React from 'react';
import "../css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>&copy; {currentYear} GrowthHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

*/