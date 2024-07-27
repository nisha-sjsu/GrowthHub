import * as React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/NavBarWithoutLogin';
import { config } from '../config';
import useAuth from "../hooks/useAuth";
import Footer from '../components/Footer';
import { Grid } from '@mui/material';
import PillText from '../components/PillText';
import LinearProgress from '@mui/material/LinearProgress';



export default function SignUp() {
    const navigate = useNavigate();
    const { authed } = useAuth();
    const { state } = useLocation();

    const [inputs, setInputs] = React.useState({ dateOfBirth: null });
    const [showMsg, setShowMsg] = React.useState(false);
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    let goToLogin;

    // is user logged in redirect to search page
    React.useEffect(() => {
        if (authed) {
            navigate(state?.path || "/mission-control");
        }

        return () => clearTimeout(goToLogin);
    }, []);

    React.useEffect(() => {
        if (showMsg) {
            goToLogin = setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        return () => clearTimeout(goToLogin);
    }, [showMsg]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleDateChange = (newValue) => {
        setInputs(values => ({ ...values, dateOfBirth: newValue }))
    };

    const handleSubmit = () => {
        setLoading(true);
        const { firstName, lastName, email, password, dateOfBirth, gender } = inputs;
        axios.post(`${config.BASE_URL}/signup`, {
            firstName,
            lastName,
            email,
            gender,
            dateOfBirth,
            password
        })
            .then(function (response) {
                setShowMsg(true);
                setLoading(false);
                setError();
            })
            .catch(function (error) {
                console.log(error);
                setShowMsg(false);
                setLoading(false);
                setError(error.response.data.message);
            });
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" style={{ width: '100%' }} >
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            {/* <DesktopDatePicker
                                margin="normal"
                                sx={{ mt: '100%' }}
                                label="Date of Birth"
                                inputFormat="MM/DD/YYYY"
                                value={inputs.dateOfBirth}
                                onChange={handleDateChange}
                                maxDate={new Date('01-01-2004')}
                                renderInput={(params) => <TextField {...params} />}
                            /> */}
                            <FormLabel id="demo-radio-buttons-group-label" style={{ textAlign: 'start' }}>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="gender"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Register
                            </Button>
                            {showMsg && <Box width='100%'>
                                <PillText style={{ backgroundColor: '#d2ffd2' }}> An email Has been sent to you</PillText>
                            </Box>}
                            <p style={{ color: "red" }}>{error}</p>
                            {loading && <LinearProgress />}
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}