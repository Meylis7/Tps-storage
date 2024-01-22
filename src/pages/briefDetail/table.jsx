import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '../../components/pagination'
import { useEffect } from 'react';


const table = (props) => {
    const findIndexbyId = (obj) => {
        let id = 1;
        props?.data?.map((item, i) => {
            console.log(item, obj)
            if (item?.url == obj.row?.url) {
                id = i;
            }
        })

        return id + 1
    }

    const columns = [
        {
            field: 'Oid', headerName: '№',
            width: 70,
            sortable: false,
            renderCell: (params) => {
                return <div>{findIndexbyId(params)}</div>
            },
        },
        {
            field: 'name', headerName: 'Название файла', flex: 1,
            sortable: false,
        },
        {
            field: 'type', headerName: 'Тип файла', flex: 1,
            // renderCell: (params) => {
            //     return <div>{params?.row?.type.FirstName + ' ' + params?.row?.type.LastName}</div>
            // },
            sortable: false,
        },
        {
            field: 'user', headerName: 'Кто добавил', flex: 1,
            sortable: false,
        },
        {
            field: 'created_at', headerName: 'Дата добавления', flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <div >{params?.row?.created_at?.slice(0, 10)}</div>
            },
        },
        {
            field: 'designer', headerName: 'Исполнитель', flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <div>{params?.row?.designer.FirstName + ' ' + params?.row?.designer.LastName}</div>
            },
        },
        {
            field: 'size', headerName: 'Размер', flex: 1,
            sortable: false,
        },
        {
            field: 'url', headerName: '', flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <div>
                    <a href={params?.row?.url} target='_blank' download={params?.row?.name} children className='hover:font-medium cursor-pointer flex items-center mt-2 mb-4' >
                        <span className="block w-4 h-4 mr-2">
                            <svg className="w-full h-full object-contain block" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.50004 9.97915C7.38893 9.97915 7.28476 9.96193 7.18754 9.92748C7.09032 9.89304 7.00004 9.83387 6.91671 9.74998L3.91671 6.74998C3.75004 6.58332 3.67004 6.38887 3.67671 6.16665C3.68338 5.94443 3.76338 5.74998 3.91671 5.58332C4.08338 5.41665 4.28143 5.32998 4.51088 5.32332C4.74032 5.31665 4.9381 5.39637 5.10421 5.56248L6.66671 7.12498V1.16665C6.66671 0.930538 6.74671 0.732483 6.90671 0.572483C7.06671 0.412483 7.26449 0.33276 7.50004 0.333316C7.73615 0.333316 7.93421 0.413316 8.09421 0.573316C8.25421 0.733316 8.33393 0.931094 8.33338 1.16665V7.12498L9.89587 5.56248C10.0625 5.39582 10.2606 5.31582 10.49 5.32248C10.7195 5.32915 10.9173 5.41609 11.0834 5.58332C11.2362 5.74998 11.3162 5.94443 11.3234 6.16665C11.3306 6.38887 11.2506 6.58332 11.0834 6.74998L8.08338 9.74998C8.00004 9.83332 7.90976 9.89248 7.81254 9.92748C7.71532 9.96248 7.61115 9.9797 7.50004 9.97915ZM2.50004 13.6666C2.04171 13.6666 1.64921 13.5033 1.32254 13.1767C0.995875 12.85 0.83282 12.4578 0.833375 12V10.3333C0.833375 10.0972 0.913376 9.89915 1.07338 9.73915C1.23338 9.57915 1.43115 9.49943 1.66671 9.49998C1.90282 9.49998 2.10088 9.57998 2.26088 9.73998C2.42088 9.89998 2.5006 10.0978 2.50004 10.3333V12H12.5V10.3333C12.5 10.0972 12.58 9.89915 12.74 9.73915C12.9 9.57915 13.0978 9.49943 13.3334 9.49998C13.5695 9.49998 13.7675 9.57998 13.9275 9.73998C14.0875 9.89998 14.1673 10.0978 14.1667 10.3333V12C14.1667 12.4583 14.0034 12.8508 13.6767 13.1775C13.35 13.5041 12.9578 13.6672 12.5 13.6666H2.50004Z" fill="black" />
                            </svg>
                        </span>

                        <p className="text-[13px] font-normal leading-[1.3]">Cкачать</p>
                    </a>
                </div>
            },
        },
        // {
        //     field: 'url', headerName: '', flex: 1,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return <div>
        //             <a href={params?.row?.url} target='_blank' download={params?.row?.name} children className='hover:font-medium cursor-pointer flex items-center mt-2 mb-4' >
        //                 <span className="block w-4 h-4 mr-2">
        //                     <svg className="w-full h-full object-contain block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                         <path d="M2.66663 12C2.29996 12 1.98618 11.8696 1.72529 11.6087C1.4644 11.3478 1.33374 11.0338 1.33329 10.6667V2C1.1444 2 0.986182 1.936 0.858626 1.808C0.73107 1.68 0.66707 1.52178 0.666626 1.33333C0.666626 1.14444 0.730626 0.986222 0.858626 0.858667C0.986626 0.731111 1.14485 0.667111 1.33329 0.666667H3.99996C3.99996 0.477778 4.06396 0.319556 4.19196 0.192C4.31996 0.0644445 4.47818 0.000444444 4.66663 0H7.33329C7.52218 0 7.68063 0.0640001 7.80863 0.192C7.93663 0.32 8.0004 0.478222 7.99996 0.666667H10.6666C10.8555 0.666667 11.014 0.730667 11.142 0.858667C11.27 0.986667 11.3337 1.14489 11.3333 1.33333C11.3333 1.52222 11.2693 1.68067 11.1413 1.80867C11.0133 1.93667 10.8551 2.00044 10.6666 2V10.6667C10.6666 11.0333 10.5362 11.3473 10.2753 11.6087C10.0144 11.87 9.7004 12.0004 9.33329 12H2.66663ZM9.33329 2H2.66663V10.6667H9.33329V2ZM5.99996 7.26667L7.26663 8.53333C7.38885 8.65555 7.5444 8.71667 7.73329 8.71667C7.92218 8.71667 8.07774 8.65555 8.19996 8.53333C8.32218 8.41111 8.38329 8.25556 8.38329 8.06667C8.38329 7.87778 8.32218 7.72222 8.19996 7.6L6.93329 6.33333L8.19996 5.06667C8.32218 4.94444 8.38329 4.78889 8.38329 4.6C8.38329 4.41111 8.32218 4.25556 8.19996 4.13333C8.07774 4.01111 7.92218 3.95 7.73329 3.95C7.5444 3.95 7.38885 4.01111 7.26663 4.13333L5.99996 5.4L4.73329 4.13333C4.61107 4.01111 4.45551 3.95 4.26663 3.95C4.07774 3.95 3.92218 4.01111 3.79996 4.13333C3.67774 4.25556 3.61663 4.41111 3.61663 4.6C3.61663 4.78889 3.67774 4.94444 3.79996 5.06667L5.06663 6.33333L3.79996 7.6C3.67774 7.72222 3.61663 7.87778 3.61663 8.06667C3.61663 8.25556 3.67774 8.41111 3.79996 8.53333C3.92218 8.65555 4.07774 8.71667 4.26663 8.71667C4.45551 8.71667 4.61107 8.65555 4.73329 8.53333L5.99996 7.26667Z" fill="#EB2F2F" />
        //                     </svg>
        //                 </span>

        //                 <p className="text-[#EB2F2F] text-[13px] font-normal leading-[1.3]">Удалить</p>
        //             </a>
        //         </div>
        //     },
        // },
    ];

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }




    return (
        <>
            <div className="auto_container">
                <div className="table_wrap w-full p-10 bg-white rounded-[10px] border-[1px] border-solid border-[#EBEBEB]">
                    <DataGrid
                        rows={props.data}
                        // getRowId={(row) => row.Oid}
                        getRowId={(row) => generateRandom()}
                        columns={columns}
                        // loading={isLoading}
                        disableColumnMenu
                        hideFooter
                        sx={{
                            '.MuiDataGrid-columnHeaders': {
                                background: '#F5F5F5'
                            },

                            '.MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold'
                            },

                            '& .MuiDataGrid-columnHeader:focus-within': {
                                outline: 'none'
                            },

                            '.MuiDataGrid-cell:focus-within': {
                                outline: 'none'
                            },

                        }}
                    />

                    {/* <Pagination /> */}

                </div>
            </div>
        </>
    )
}

export default table