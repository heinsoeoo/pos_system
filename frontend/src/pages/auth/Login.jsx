import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { userActions } from '../../store/actions/auth.actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { loading, success, message } = useSelector((state) => state.status);

    const auth = async (credentials) => {
        await dispatch(userActions.login(credentials));
        if (message != null) {
            if (success) {
                toast.success(message);
            } else {
                toast.error(message)
            }
        }
    }

    const handleRegister = () => {
        navigate('/register');
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
                        type='password'
                        fullWidth 
                        {...register('password', {required:true})}
                        error={errors['password']? true: false}
                        helperText={errors['password']? "password is required": ""} />

                        <Button disabled={loading} variant='contained' fullWidth type='submit'>
                            {loading? (<CircularProgress sx={{color: 'white'}} size={24}/>) : "Login"}
                        </Button>
                        
                        <Typography onClick={handleRegister} sx={{ cursor: 'pointer', mt: '1rem' }} textAlign="center">
                            Don't hava an account? Register here
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}

export default Login