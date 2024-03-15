import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './Excel-Export.css'
import { useRef } from 'react';

function ExcelExport( { data } ) {

    //const [filter, setFilter] = useRef('아이탬 이름'); // State to store the filter value

    const handleExport = () => {
        //let exportData = data;

        // 필터가 설정되어 있으면 데이터를 필터링합니다
        //if (filter) {
        //    exportData = data.filter(item => item.name === filter);
        //}
         // 새 워크북을 생성하고 워크시트를 추가합니다
        const wb = XLSX.utils.book_new();
        //const ws = XLSX.utils.json_to_sheet(exportData);
        const ws = XLSX.utils.json_to_sheet(data);

        // JSON 데이터의 구조를 원하는 키 이름으로 매핑합니다
        //   const newData = data.map(item => ({
        //     "User ID": item.userId,
        //     "Post ID": item.id,
        //     "Post Title": item.title,
        //     "Content": item.body.replace(/\n/g, " ") // Replace line breaks with spaces, if necessary
        //   }));
    
        // 워크시트를 워크북에 추가합니다
        //함수는 JSON 배열을 행과 열이 있는 워크시트로 변환합니다. JSON 개체의 키는 워크시트의 첫 번째 행에 있는 헤더가 되고, 해당 값은 해당 헤더 아래 셀에 배치됩니다.
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
    
        // 워크북을 작성하고 저장합니다
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    
         // 이진 문자열을 ArrayBuffer로 변환합니다
        const buf = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < wbout.length; i++) {
        view[i] = wbout.charCodeAt(i) & 0xFF;
        }

         // 현재 날짜와 시간을 구합니다
        const date = new Date();
        const dateString = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}
        ${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;

        // 파일명에 날짜와 시간을 포함하여 저장합니다
        const filename = `프로젝트_${dateString}.xlsx`;
       
        // 파일로 저장합니다
        const blob = new Blob([buf], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };
    
    return (
        <div className="container">
            <button className="export-to-excel" onClick={handleExport}>
                Export to Excel
            </button>
        </div>
    );
};
    

export default ExcelExport