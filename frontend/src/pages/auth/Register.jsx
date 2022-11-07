import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { userActions } from '../../store/actions/auth.actions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }} = useForm();

    const auth = async (credentials) => {
        await dispatch(userActions.register(credentials));
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return <>
        <div>
            <ToastContainer/>
        </div>
        <Box sx={{height: '100vh', display: 'flex'}}>
            <Box sx={{ maxWidth: '35rem', margin: 'auto'}}>
                <Typography variant='h3' component='h2' sx={{ mb: '5rem', textAlign: 'center' }}>
                    POS Invoicing System
                </Typography>
                <Paper variant='outlined' sx={{padding: '2rem'}}>
                
                    <Typography variant='h5' component='h5' sx={{ mb: '2rem' }}>
                    Please register your account
                    </Typography>
                    <Box component="form" autoComplete='off' onSubmit={handleSubmit(auth)}>
                        <TextField 
                            sx={{ mb: 2}} 
                            label="name" 
                            name="name"
                            fullWidth 
                            {...register('name', {required:true})}
                            error={errors['name']? true: false}
                            helperText={errors['name']? "name is required": ""} />
                            
                        <TextField 
                        sx={{ mb: 2}} 
                        label="username" 
                        name="username"
                        fullWidth 
                        {...register('username', {required:true})}
                        error={errors['username']? true: false}
                        helperText={errors['username']? "username is required": ""} />

                        <TextField 
                        sx={{ mb: 2 }} 
                        label="password" 
                        name="password" 
                        type='password'
                        fullWidth 
                        {...register('password', {required:true})}
                        error={errors['password']? true: false}
                        helperText={errors['password']? "password is required": ""} />

                        <Button variant='contained' fullWidth type='submit'>Register</Button>

                        <Typography onClick={handleLogin} sx={{ cursor: 'pointer', mt: '1rem' }} textAlign="center">
                            Already hava an account? Login here
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}

export default Register