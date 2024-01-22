import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'; 
import { useHistory } from 'react-router-dom'; 


const Table = (props) => {
  const history = useHistory()

  const findIndexbyId = (obj) => {
    let id = (props?.page-1)*props?.limit+1;
    props?.data?.map((item, i) => {
      if (item.Oid == obj.row.Oid) {
        id = (props?.page-1)*props?.limit+i;
      }
    })

    return id + 1
  }
  const columns = [

    {
      field: 'Oid',
      headerName: '№', 
      width: 70,
      sortable: false,
      renderCell: (params) => {
        return <div>{findIndexbyId(params)}</div>
      },
    },
    {
      field: 'Code',
      headerName: 'Бриф', flex: 1,
      sortable: false,
    },
    {
      field: 'Employee',
      headerName: 'Менеджер', flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <div>{params?.row?.Employee?.FirstName + ' ' + params?.row?.Employee?.LastName}</div>
      },
    },

    {
      field: 'Brand',
      headerName: 'Бренд', flex: 1,
      sortable: false,
      renderCell: (params) => {
        return params?.Brand?.name;
      },
    },
    {
      field: 'Кто добавил',
      headerName: 'Кто добавил', flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <div >{params?.row?.Customer?.Name}</div>
      }
    },
    {
      field: 'OpenedAt',
      headerName: 'Дата добавления', flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <div >{params?.row?.OpenedAt?.slice(0, 10)}</div>
      },
    },
    {
      field: 'Responsible',
      headerName: 'Исполнитель', flex: 1,
      sortable: false,
      renderCell: (params) => {
        return <div>{params?.row?.Responsible && (params?.row?.Responsible?.FirstName + ' ' + params?.row?.Responsible?.LastName)}</div>
      }
    }
  ];

  const handleRowClick = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params.row?.Oid);
    history.push({ pathname: "/briefDetails/" + params.row?.Oid })
  };

  return (
    <div>
      <DataGrid
        onRowClick={handleRowClick}
        rows={props.data}
        getRowId={(row) => row.Oid}
        columns={columns}
        // pageSize={props?.data?.length} 
        hideFooter
        disableColumnMenu
        disableColumnSort

        sx={{
          '.MuiDataGrid-cell:focus': {
            outline: 'none'
          },

          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer'
          },

          '.MuiDataGrid-cell:focus-within': {
            outline: 'none'
          },

          '.MuiDataGrid-columnHeaders': {
            background: '#F5F5F5'
          },

          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
          },

          '& .MuiDataGrid-columnHeader:hover': {
            backgroundColor: 'inherit', // Keeps the background color on hover as it is
            cursor: 'default', // Keeps the cursor default and not pointer
            outline: 'none'
          },

          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          },
        }}
      />

      


    </div>
  );
}


export default Table;