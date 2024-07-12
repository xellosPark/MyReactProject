import React from 'react';
import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';

const ExportToExcel = () => {
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = 'FF';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleExport = () => {
        const workbook = XLSX.utils.book_new();

        const customers = [
            {A: '고객명', B: '이메일', C: '연락처'},
            {A: '아무개1', B: 'kim@gmail.com', C: '010-00000-00000'},
            {A: '테스트', B: 'test@gmail.com', C: '010-1111-1111'},
            {A: '홍길동', B: 'hhhh@gmail.com', C: '010-2222-22222'},
            {A: '테스트2', B: 'ttttt@gmail.com', C: '010-3333-3333'},
            {A: '테스트3', B: 'test123@gmail.com', C: '010-4444-4444'},
        ];

        const firstSheet = XLSX.utils.json_to_sheet(customers, { header: ["A", "B", "C"], skipHeader: true });

        // Set column widths
        firstSheet["!cols"] = [
            { wpx: 120 }, // A column
            { wpx: 250 }, // B column
            { wpx: 200 }  // C column
        ];

        // Apply style to header
        firstSheet["A1"].s = {
            font: {
                name: "Calibri",
                sz: 24,
                bold: true,
                color: { rgb: "FFFFAA00" }
            }
        };

        // Apply random colors to the name column cells
        customers.forEach((customer, index) => {
            const cellAddress = `A${index + 2}`; // A1 is header, so start from A2
            const color = generateRandomColor();
            if (!firstSheet[cellAddress]) firstSheet[cellAddress] = { t: 's', v: customer.A };
            firstSheet[cellAddress].s = {
                fill: {
                    patternType: 'solid',
                    fgColor: { rgb: color }
                }
            };
        });

        XLSX.utils.book_append_sheet(workbook, firstSheet, "Customers");

        // Generate Excel file and trigger download
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'customers_style.xlsx');
    };

    return (
        <button onClick={handleExport} style={{ marginTop: '20px' }}>
            Export to Excel
        </button>
    );
};

export default ExportToExcel;