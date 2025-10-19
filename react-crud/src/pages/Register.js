import React, {useState} from 'react';
import {Container, TextField, Button, Typography, Box, MenuItem} from '@mui/material';
import api from '../api/api';
import ErrorAlert from '../components/ErrorAlert';
import {useNavigate} from 'react-router-dom';

export default function RegisterPage() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async () => {
        setErrors([]);
        try {
            await api.post('/auth/register', form);
            navigate('/');
        } catch (err) {
            const errorList =
                err.response?.data?.errors?.map((e) => e.msg) || [err.response?.data?.msg || 'Error al registrar'];
            setErrors(errorList);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, p: 4, boxShadow: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom>Registro</Typography>
                <ErrorAlert errors={errors}/>

                <TextField label="Nombre" name="first_name" fullWidth margin="normal" onChange={handleChange}/>
                <TextField label="Apellido" name="last_name" fullWidth margin="normal" onChange={handleChange}/>
                <TextField label="Correo" name="email" fullWidth margin="normal" onChange={handleChange}/>
                <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal"
                           onChange={handleChange}/>

                <TextField
                    select
                    label="Rol"
                    name="role"
                    fullWidth
                    margin="normal"
                    value={form.role}
                    onChange={handleChange}
                >
                    <MenuItem value="user">Usuario</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                </TextField>

                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Registrar
                </Button>

                <Button
                    variant="text"
                    fullWidth
                    sx={{mt: 2}}
                    onClick={() => navigate('/')}
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Button>
            </Box>
        </Container>
    );
}
