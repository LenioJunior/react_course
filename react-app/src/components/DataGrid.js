import { useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function CustomizedDataGrid(props) {
  const columns = props.columns || [];
  const rows = props.rows || [];

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

  const onAddClick = () => {
    if (props.onAddClick) {
      props.onAddClick();
    }
  };

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
      {!props.hideAddAction && props.onAddClick && (
        <Button variant='outlined' onClick={onAddClick} startIcon={<AddCircleIcon />} sx={{ mb: 2 }}>
          Register
        </Button>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } }
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
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
    </Box>
  );
}

CustomizedDataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  hideAddAction: PropTypes.bool
};