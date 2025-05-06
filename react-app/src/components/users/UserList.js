import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert,
  Snackbar 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UserService from '../../api/UserService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteUserDialog from './DeleteUserDialog';

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 230 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Button 
            onClick={() => handleEdit(params.row.id)}
            size="small"
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button 
            onClick={() => openDeleteDialog(params.row.id, params.row.name)}
            size="small"
            color="error"
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAll();
      setUsers(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const openDeleteDialog = (id, name) => {
    setDeleteDialog({
      open: true,
      userId: id,
      userName: name
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      ...deleteDialog,
      open: false
    });
  };

  const confirmDelete = async () => {
    try {
      await UserService.delete(deleteDialog.userId);
      setUsers(users.filter(user => user.id !== deleteDialog.userId));
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting user:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
        severity: 'error'
      });
    } finally {
      closeDeleteDialog();
    }
  };

  const handleAddNew = () => {
    navigate('/users/add');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1">
          Users
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddCircleIcon />}
          onClick={handleAddNew}
        >
          Add New User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>

      <DeleteUserDialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        userName={deleteDialog.userName}
      />

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
    </Box>
  );
}