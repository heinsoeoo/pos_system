import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { userActions } from '../../store/actions/auth.actions';

const Login = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors }} = useForm();

    const auth = async (credentials) => {
        await dispatch(userActions.login(credentials));
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
                    Please login to your account
                    </Typography>
                    <Box component="form" autoComplete='off' onSubmit={handleSubmit(auth)}>
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
                        fullWidth 
                        {...register('password', {required:true})}
                        error={errors['password']? true: false}
                        helperText={errors['password']? "password is required": ""} />

                        <Button variant='contained' fullWidth type='submit'>Login</Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}

export default Login