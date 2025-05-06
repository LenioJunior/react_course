import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function DeleteUserDialog({ open, onClose, onConfirm, userName }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" spacing={1} alignItems="center">
          <WarningRoundedIcon color="warning" />
          <Typography variant="h6">Confirm Deletion</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {userName ? (
            <>Are you sure you want to delete the user <strong>{userName}</strong>? This action cannot be undone.</>
          ) : (
            <>Are you sure you want to delete this user? This action cannot be undone.</>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="outlined" color="error" onClick={onConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}