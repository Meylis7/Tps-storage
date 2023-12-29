import React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'col1', headerName: '№', width: 150},
  { field: 'col2', headerName: 'Бриф', width: 150},
  { field: 'col3', headerName: 'Менеджер', width: 150},
  { field: 'col4', headerName: 'Клиент', width: 150},
  { field: 'col5', headerName: 'Бренд', width: 150},
  { field: 'col6', headerName: 'Кто добавил', width: 150},
  { field: 'col7', headerName: 'Дата добавления', width: 150},
  { field: 'col8', headerName: 'Исполнитель', width: 150},
];

const rows = [
  { id: 1, col1: '1', col2: '982', col3: 'Майк Эрмантраут', col4: 'Гус Фринг', col5: '«Лос Полос»', col6: 'Майк Эрмантраут', col7: '1 сен. 2023 г.', col8: 'Уолтер Уайт' },
  { id: 2, col1: '2', col2: '982', col3: 'Майк Эрмантраут', col4: 'Гус Фринг', col5: '«Лос Полос»', col6: 'Майк Эрмантраут', col7: '1 сен. 2023 г.', col8: 'Уолтер Уайт' },
  { id: 3, col1: '3', col2: '982', col3: 'Майк Эрмантраут', col4: 'Гус Фринг', col5: '«Лос Полос»', col6: 'Майк Эрмантраут', col7: '1 сен. 2023 г.', col8: 'Уолтер Уайт' },
];



const Table = () => {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} />

    </div>
  );
}


export default Table;