import { useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Box, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function CustomizedDataGrid(props) {

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          csvOptions={{
            delimiter: ';',
            utf8WithBom: true
          }}
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' }
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        }
      }}
    >
      {!props.hideAddAction && (
        <Button variant='outlined' onClick={onAddClick} startIcon={<AddCircleIcon />}>
          Register
        </Button>
      )}
      <DataGrid
        rows={props.rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } }
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        onRowEditStop={handleRowEditStop}
        slots={{
          toolbar: CustomToolbar
        }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small'
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' }
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' }
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small'
                }
              }
            }
          }
        }}
      />
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Stack direction='row' spacing={1}>
            <WarningRoundedIcon />
            <Typography variant='h5'>Confirmation</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Are you sure you want to delete the register?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='outlined' color='error' onClick={onConfirmDeleteClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}