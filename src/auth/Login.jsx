import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                username: username,
                password: password
            });

            const data = res.data;
            console.log(data);
            if (data.error) {
                toast.error(data.error);
                return;
            }
            localStorage.setItem('auth_token', data.auth_token);
            navigate("/home");


        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 320,
                    justifyContent: 'center',
                    alignItems: 'center',

                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff'
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
                <div>
                    New to movies world <Link to="/register">register</Link>
                </div>
            </Box>
            <ToastContainer />
        </div>
    );
};

export default Login;
