import React, {useEffect, useState} from 'react';
import {
    Container, Typography, Box, Button, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle,
    DialogContent, DialogActions
} from '@mui/material';
import api from '../api/api';
import ErrorAlert from '../components/ErrorAlert';
import {useNavigate} from 'react-router-dom';

export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({name: '', description: '', price: ''});
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    const fetchItems = async () => {
        try {
            const res = await api.get('/items');
            setItems(res.data);
        } catch (err) {
            setErrors([err.response?.data?.msg || 'Error al cargar ítems']);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleOpen = (item = null) => {
        setForm(item || {name: '', description: '', price: ''});
        setEditId(item ? item.id : null);
        setErrors([]);
        setOpen(true);
    };

    const handleSave = async () => {
        const tempErrors = [];

        // Validaciones frontend
        if (!form.name || form.name.trim().length < 3) tempErrors.push('El nombre debe tener al menos 3 caracteres');
        if (form.description && form.description.length > 200) tempErrors.push('La descripción no debe exceder 200 caracteres');
        if (form.price === '' || isNaN(form.price) || Number(form.price) < 0) tempErrors.push('El precio debe ser un número mayor o igual a 0');

        if (tempErrors.length > 0) {
            setErrors(tempErrors);
            return;
        }

        try {
            if (editId) {
                await api.put(`/items/${editId}`, {
                    name: form.name.trim(),
                    description: form.description?.trim(),
                    price: Number(form.price)
                });
            } else {
                await api.post('/items', {
                    name: form.name.trim(),
                    description: form.description?.trim(),
                    price: Number(form.price)
                });
            }
            setOpen(false);
            fetchItems();
        } catch (err) {
            setErrors([err.response?.data?.msg || 'Error al guardar el ítem']);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/items/${id}`);
            fetchItems();
        } catch (err) {
            setErrors([err.response?.data?.msg || 'Error al eliminar ítem']);
        }
    };

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography variant="h5">Gestión de Ítems</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            <ErrorAlert errors={errors}/>

            {isAdmin && (
                <Button variant="contained" color="primary" sx={{mb: 2}} onClick={() => handleOpen()}>
                    Crear ítem
                </Button>
            )}

            {items.length === 0 ? (
                <Typography variant="body1" sx={{mt: 4, textAlign: 'center', color: 'gray'}}>
                    No existen ítems.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Precio</TableCell>
                                {isAdmin && <TableCell>Acciones</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    {isAdmin && (
                                        <TableCell>
                                            <Button size="small" onClick={() => handleOpen(item)}>Editar</Button>
                                            <Button size="small" color="error" onClick={() => handleDelete(item.id)}>
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog de Crear/Editar */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Editar Ítem' : 'Crear Ítem'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        fullWidth margin="dense"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <TextField
                        label="Descripción"
                        fullWidth margin="dense"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                    <TextField
                        label="Precio"
                        fullWidth margin="dense"
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({...form, price: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
