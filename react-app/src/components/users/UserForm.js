import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import UserService from '../../api/UserService';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (isEditing) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await UserService.get(id);
      if (userData) {
        // Remove password for security (we'll require it to be entered again for changes)
        const { password, ...userDataWithoutPassword } = userData;
        setFormData({ ...userDataWithoutPassword, password: '' });
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setSnackbar({
        open: true,
        message: 'Failed to load user data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field being modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Only require password for new users or when explicitly changing it
    if (!isEditing && !formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditing) {
        await UserService.update({
          ...formData,
          id // Ensure the ID is included for updates
        });
        setSnackbar({
          open: true,
          message: 'User updated successfully',
          severity: 'success'
        });
      } else {
        await UserService.insert(formData);
        setSnackbar({
          open: true,
          message: 'User created successfully',
          severity: 'success'
        });
      }
      
      // Redirect after a short delay so user can see success message
      setTimeout(() => {
        navigate('/users');
      }, 1500);
    } catch (err) {
      console.error('Error saving user:', err);
      setSnackbar({
        open: true,
        message: `Failed to ${isEditing ? 'update' : 'create'} user`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && isEditing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {isEditing ? 'Edit User' : 'Create New User'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="name" required>
              Full Name
            </FormLabel>
            <OutlinedInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              error={Boolean(errors.name)}
              required
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            {errors.name && (
              <Typography color="error" variant="caption">
                {errors.name}
              </Typography>
            )}
          </FormGrid>
          
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="username" required>
              Username
            </FormLabel>
            <OutlinedInput
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              error={Boolean(errors.username)}
              required
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            {errors.username && (
              <Typography color="error" variant="caption">
                {errors.username}
              </Typography>
            )}
          </FormGrid>
          
          <FormGrid item xs={12}>
            <FormLabel htmlFor="email" required>
              Email
            </FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              error={Boolean(errors.email)}
              required
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                {errors.email}
              </Typography>
            )}
          </FormGrid>
          
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="phone">
              Phone
            </FormLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              fullWidth
              size="small"
            />
          </FormGrid>
          
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="password" required={!isEditing}>
              {isEditing ? 'New Password (leave blank to keep current)' : 'Password'}
            </FormLabel>
            <OutlinedInput
              id="password"
              name="password"
              type="password"
              value={formData.password || ''}
              onChange={handleChange}
              error={Boolean(errors.password)}
              required={!isEditing}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            {errors.password && (
              <Typography color="error" variant="caption">
                {errors.password}
              </Typography>
            )}
          </FormGrid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {isEditing ? 'Update' : 'Create'} User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}