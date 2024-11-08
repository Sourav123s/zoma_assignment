import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn, addRow, removeColumn, removeRow, updateCellValue } from '../store/tableDataReducerAndAction';
function Table() {

    // State for selected row and column for highlighting
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [selectAll, setSelectAll] = useState(false)

    //Get the data from the sore using useSelector Hooks
    const rows = useSelector((state) => state.table.rows);
    const columns = useSelector((state) => state.table.columns)

    // Get the dispatcher
    const dispatch = useDispatch();

    //previous sate value 
    // const [rows, setRows] =useState([])
    // const [columns , setColumns] = useState([]);

    // It will add a new row to the table 
    function handleAddRow() {
        // Create a new row with a unique ID
        const newRow = { id: rows.length + 1 };

        // Initialize each column field to an empty string
        columns.forEach(column => {
            newRow[column.field] = '';
        });

        // Use spread operator to add the new row
        // setRows([...rows, newRow]);
        dispatch(addRow([...rows, newRow]))
    }

    // It will add a new row to the table 
    function handleAddColumn() {
        // create column id 
        const newColumnId = columns.length + 1;

        // create column field value
        const newField = `field${newColumnId}`;

        //create that new column
        const newColumn = { id: newColumnId, field: newField, title: `Column ${newColumnId}` };

        // Add new column to the columns array
        // setColumns([...columns, newColumn]);
        dispatch(addColumn([...columns, newColumn]))

        // Update each row to include the new column with an empty value
        // setRows(rows.map(row => ({ ...row, [newField]: '' })));
        dispatch(addRow(rows.map(row => ({ ...row, [newField]: '' }))))
    }

    // filter the row from the row array 
    function handelDeleteRow(row) {
        const rowId = row.id;

        // setRows( row => row.filter(item => item.id !== rowId))
        dispatch(removeRow(rowId))
    }

    // filter the column from the column array 
    function handelDeleteColumn(column) {
        const columnId = column?.id
        // setColumns(columns => columns.filter(item => item.id !== column.id))
        dispatch(removeColumn(columnId))
    }

    // Function to highlight row
    function highlightRow(rowId) {
        setSelectedRow(rowId);
        setSelectedColumn(null); // Reset column selection if a row is selected
        setSelectAll(false);
    }

    // Function to highlight column
    function highlightColumn(columnId) {
        setSelectedColumn(columnId);
        setSelectedRow(null); // Reset row selection if a column is selected
        setSelectAll(false);
    }

    function highlightAll() {
        setSelectAll(!selectAll); // Toggle whole table selection
        setSelectedRow(null);
        setSelectedColumn(null);
    }

    function handelCellInput(e, field, rowId) {
        // console.log(e.target.innerText,columnId , rowId)
        dispatch(updateCellValue({ rowId, field, value: e.target.innerText }));

        console.log({
            rows,
            columns
        })
    }
    return (
        <div className="table">
            <div style={{
                margin: 50
            }}>
                <button style={{
                    margin: 10,
                    padding: 10
                }} onClick={handleAddRow}>Add Row</button>
                <button style={{
                    margin: 10,
                    padding: 10
                }} onClick={handleAddColumn}>Add Column</button>
                <button style={{
                    margin: 10,
                    padding: 10
                }} onClick={highlightAll}>Select All</button>
            </div>
            <table className={`table-style ${selectAll ? 'highlight-table' : ''}`}>
                <thead>
                    {/* <tr>
                        {columns.map((column, index) => {
                            return <th
                                onClick={() => highlightColumn(column.id)}
                                className={selectedColumn === column.id ? 'highlight-column' : ''}
                                key={column.id}
                                id={column.field}
                                style={{ border: "none"}}
                            >
                                <button onClick={() => {
                                    handelDeleteColumn(column)
                                }}>-</button>
                            </th>
                        })}
                    </tr> */}
                    <tr>
                        {columns.map((column, index) => {
                            return <th
                                style={{
                                    backgroundColor: "pink",
                                    position: "relative",
                                    width: '100px',
                                    textAlign: 'left'
                                }}
                                key={column.id}
                                id={column.field}
                                onClick={() => highlightColumn(column.id)}
                                className={selectedColumn === column.id ? 'highlight-column' : ''}
                            >
                                {column.title}
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "2px",
                                        right: '2px'
                                    }}
                                    onClick={() => {
                                        handelDeleteColumn(column)
                                    }}>-</button>
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return <tr
                            onClick={() => highlightRow(row.id)}
                            className={selectedRow === row.id ? 'highlight-row' : ''}
                            key={row.id}
                        >
                            {
                                columns.map(column => {
                                    return <td
                                        className={selectedColumn === column.id ? 'highlight-column' : ''}
                                        contenteditable='true'
                                        key={column.id}
                                        onInput={(e) => {
                                            handelCellInput(e, column.field, row.id)
                                        }}
                                    >

                                        {row[column.field]}
                                    </td>
                                })
                            }
                            <td style={{ border: "none" }}><button onClick={() => {
                                handelDeleteRow(row)
                            }}>-</button></td>
                        </tr>
                    })}
                </tbody>

            </table>

        </div>
    );
}

export default Table;
