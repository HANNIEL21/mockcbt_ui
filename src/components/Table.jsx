import React from 'react';
import Filter from './Filter';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { baseApiUrl } from '../utils/constants';
import Alert from './Alert';

const Table = ({ label, data, filter, children, title, showFilter, del }) => {
    const [filterText, setFilterText] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const filteredItems = Array.isArray(data)
        ? data.filter(item => {
            // Check if item[filter] exists and is a string
            if (typeof item[filter] !== 'string') {
                return false; // Exclude items where the specified property is not a string
            }

            // Convert filter text and item property value to lowercase for case-insensitive filtering
            const filterTextLower = filterText.toLowerCase();
            const itemValueLower = item[filter].toLowerCase();

            // Filter items based on the specified property and filter text
            return itemValueLower.includes(filterTextLower);
        })
        : [];

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className='w-full flex items-center justify-between'>
                {showFilter
                    ? <Filter onFilter={e => setFilterText(e.target.value)} filter={filter} filterText={filterText} />
                    : <div></div>
                }
                <div className='items-end'>
                    {children}
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle, children, showFilter]);

    // EXPORT SELECTED ROW
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(array[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }


    function downloadCSV(array) {
        if (!array.length) {
            alert('No data to export');
            return;
        }

        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = `${title}.csv`;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);


    // DELETE SELECTED ROW

    function deleteSelected(array) {
        array.forEach(async item => {
            console.log(item);
            try {
                const res = await axios.delete(`${baseApiUrl}/${del}.php?id=${item.id}`)
                if (res.status === 200) {
                    Alert(res.data.status, res.data.message);
                } else {
                    Alert(res.data.status, res.data.message);
                }
            } catch (error) {
                console.log(error);
                Alert("error", error.response.data.message);
            }
        });
    }

    const selectedComponentMemo = React.useMemo(() => (
        <div className='flex gap-2'>
            <button
                className='border-2 border-green-500 text-green-500 font-bold uppercase hover:bg-green-300 rounded-md px-2'
                onClick={() => downloadCSV(selectedRows)}
            >
                Export
            </button>
            <button
                className='border-2 border-red-500 text-red-500 font-bold uppercase hover:bg-red-300 rounded-md px-2'
                onClick={() => deleteSelected(selectedRows)}
            >
                Delete
            </button>
        </div>
    ), [selectedRows]);

    return (
        <DataTable
            responsive
            title={<p className='uppercase text-3xl font-bold'>{title}</p>}
            columns={label}
            data={filteredItems}
            pagination
            striped
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            resetPaginationToggle={resetPaginationToggle}
            selectableRows
            contextActions={selectedComponentMemo}
            onSelectedRowsChange={handleRowSelected}
        />
    );
};

export default Table;
