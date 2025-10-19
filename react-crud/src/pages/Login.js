import React, {useState} from 'react';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import api from '../api/api';
import ErrorAlert from '../components/ErrorAlert';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
    const [form, setForm] = useState({email: '', password: ''});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async () => {
        setErrors([]);
        try {
            const res = await api.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/items');
        } catch (err) {
            setErrors([err.response?.data?.msg || 'Error al iniciar sesión']);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, p: 4, boxShadow: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
                <ErrorAlert errors={errors}/>

                <TextField
                    label="Correo"
                    name="email"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Entrar
                </Button>

                <Button
                    variant="text"
                    fullWidth
                    sx={{mt: 2}}
                    onClick={() => navigate('/register')}
                >
                    ¿No tienes cuenta? Regístrate
                </Button>
            </Box>
        </Container>
    );
}
