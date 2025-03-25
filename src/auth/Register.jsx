import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    });

    const [touched, setTouched] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        setTouched({
            username: true,
            password: true,
            confirmPassword: true
        });

        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.username.length > 20) {
            setError('Username should not exceed 20 characters');
            return;
        }

        if (formData.password.length > 10) {
            setError('Password should not exceed 10 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/createuser', formData);

            if (response.status === 201) {
                setSuccess('User registered successfully');
                setFormData({ username: '', password: '', confirmPassword: '', role: 'user' });
                setTouched({ username: false, password: false, confirmPassword: false });
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Box
            sx={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f9',
                padding: 2,
            }}
        >
            <Box
                component="form"
                sx={{
                    width: 400,
                    padding: 3,
                    backgroundColor: '#fff',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>

                <TextField
                    fullWidth
                    label="Username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={touched.username && (!formData.username || formData.username.length > 20)}
                    helperText={
                        touched.username &&
                        (!formData.username
                            ? 'Username is required'
                            : formData.username.length > 20
                                ? 'Max 20 characters'
                                : '')
                    }
                    margin="normal"
                />

                <FormControl sx={{ width: '100%', marginTop: 1 }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        error={touched.password && (!formData.password || formData.password.length > 10)}
                    />
                </FormControl>

                <FormControl sx={{ width: '100%', marginTop: 2 }} variant="outlined">
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                        error={
                            touched.confirmPassword &&
                            (!formData.confirmPassword ||
                                formData.confirmPassword.length > 10 ||
                                formData.confirmPassword !== formData.password)
                        }
                    />
                </FormControl>

                <TextField
                    id="role"
                    select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                >
                    {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

                <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                    Sign Up
                </Button>

                <p style={{ textAlign: 'center', marginTop: 10 }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Box>
        </Box>
    );
};

export default Register;
