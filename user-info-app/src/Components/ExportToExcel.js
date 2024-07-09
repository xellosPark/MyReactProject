import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ users }) => {
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        // Apply random colors to name cells
        users.forEach((user, index) => {
            const cellAddress = `A${index + 2}`; // A1 is header, so we start from A2
            if (!ws[cellAddress]) ws[cellAddress] = {};
            ws[cellAddress].s = {
                fill: {
                    fgColor: { rgb: generateRandomColor().replace('#', '') }
                }
            };
        });

        XLSX.writeFile(wb, 'users.xlsx');
    };

    return (
        <button onClick={handleExport} style={{ marginTop: '20px' }}>
            Export to Excel
        </button>
    );
};

export default ExportToExcel;
