import { useEffect, useRef, useState } from "react";
import './EvaluationTable.css';

const EvaluationTable = () => {
    const columns = [
        { key: 'no', label: 'No', minWidth: '1' },
        { key: 'file', label: 'File', minWidth: '0' },
        { key: 'send', label: '보낸사람/사용자', minWidth: '0' },
        { key: 'receive', label: '받는사람/대화상대/호스트', minWidth: '0' },
        { key: 'title', label: '제목/서브 URL/인스턴트 메신저/웹하드', minWidth: '0' },
        { key: 'time', label: '시각', minWidth: '0' },
        { key: 'fileName', label: '파일이름', minWidth: '0' },
        { key: 'reference', label: '참조인', minWidth: '0' },
        { key: 'hiddenRef', label: '실수취인/숨은참조/POP3서버 ID', minWidth: '0' },
        { key: 'analyzeFiles', label: '파일 분석 여부', minWidth: '0' },
        { key: 'name', label: '이름', minWidth: '0' },
        { key: 'mainContent', label: '본문', minWidth: '0' },
        { key: 'content', label: '판단 근거 문장', minWidth: '5' },
        { key: 'blenk', label: '', minWidth: '0' },
        { key: 'complianceRisk', label: 'Compliance Risk', minWidth: '5' },
        { key: 'result', label: '평가 기록(선택)', minWidth: '5' }
    ];

    const datas = [
        { no: 1, mainContent: 'Table 두번째 데이터', content: '데이터2', complianceRisk: 'true', result: '' },
        { no: 2, mainContent: 'Table 세번째 데이터', content: '데이터3', complianceRisk: 'false', result: '데이터3' },
        { no: 3, mainContent: 'Table 네번째 데이터', content: '데이터4', complianceRisk: 'true', result: '데이터4' },
        { no: 4, mainContent: 'Table 네번째 데이터', content: '데이터4', complianceRisk: 'true', result: '데이터4' }
    ];

    const [columnWidths, setColumnWidths] = useState({
        no: 2,
        file: 0,
        send: 0,
        receive: 0,
        title: 0,
        time: 0,
        fileName: 0,
        reference: 0,
        hiddenRef: 0,
        analyzeFiles: 0,
        name: 0,
        mainContent: 40,
        content: 40,
        blenk: 0,
        complianceRisk: 40,
        result: 40
    });

    const [value, setData] = useState(datas);

    const handleChange = (index, event) => {
        const newData = [...value];
        newData[index].result = event.target.value;
        setData(newData);
    };

    // **오류 수정: `setCurrentPage`는 사용되지 않으므로 제거**
    // const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage] = useState(20);

    const [tooltip, setTooltip] = useState({ visible: false, content: '', top: 0, left: 0 });
    const tooltipRef = useRef(null); // 툴팁 요소를 참조하기 위한 useRef

    // **오류 수정: `tableRef`가 정의되지 않았다는 오류 해결**
    const tableRef = useRef(null); // 테이블 컨테이너 요소 참조

    const handleColumnClick = (event, content) => {
        console.log('클릭', content);

        if (content === undefined || content === "")
            return;
        const clickY = event.clientY;
        const clickX = event.clientX;

        setTooltip({
            visible: true,
            content,
            top: clickY, // 초기 top 값은 임시로 설정
            left: clickX + 15,
        });
    };

    const closeTooltip = () => {
        setTooltip({ visible: false, content: '', top: 0, left: 0 });
    };

    const indexOfLastItem = itemsPerPage;
    const indexOfFirstItem = 0;
    const currentItems = value.slice(indexOfFirstItem, indexOfLastItem);

    const columnRefs = useRef({});
    const resizingState = useRef({ startX: 0, startWidth: 0 });

    const startResizing = (e, column) => {
        const containerWidth = tableRef.current.offsetWidth;
        const startWidth = columnRefs.current[column.key].offsetWidth;
        const startX = e.clientX;

        resizingState.current = { startX, startWidth, containerWidth };

        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - resizingState.current.startX;
            const newWidthPercentage = ((resizingState.current.startWidth + deltaX) / resizingState.current.containerWidth) * 100;

            setColumnWidths((prevWidths) => ({
                ...prevWidths,
                [column.key]: Math.max(newWidthPercentage, column.minWidth)
            }));
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                closeTooltip();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (tooltip.content === undefined || tooltip.content === "")
            return;
        console.log('체크', tooltip.visible);

        if (tooltip.visible && tooltipRef.current) {
            const tooltipElement = tooltipRef.current;
            const windowHeight = window.innerHeight;
            const tooltipHeight = tooltipElement.offsetHeight;
            const tooltipTop = tooltip.top;

            const adjustedTop =
                tooltipTop + tooltipHeight > windowHeight
                    ? windowHeight - tooltipHeight - 10
                    : tooltipTop;

            setTooltip((prevTooltip) => ({
                ...prevTooltip,
                top: adjustedTop,
            }));
        }
    }, [tooltip.visible, tooltip.top, tooltip.content]); // **오류 수정: `tooltip.content`를 의존성 배열에 추가**

    return (
        <div>
            <div className="eval-table-container" ref={tableRef}>
                <table className='eval-table'>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    ref={(el) => {
                                        if (el) columnRefs.current[column.key] = el;
                                    }}
                                    style={{
                                        width: `${columnWidths[column.key]}%`,
                                        // **오류 수정: 중복된 `position` 스타일 키 제거**
                                        position: 'sticky',
                                        top: '0'
                                    }}
                                >
                                    <div className="table-th">
                                        <div>{column.label}</div>
                                        {column.key === 'complianceRisk' && (
                                            <div className="risk-th-button" type='button' onClick={() => alert(`Action on row: ${column.id}`)}>
                                                적용
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        onMouseDown={(e) => startResizing(e, column)}
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: 0,
                                            width: "5px",
                                            height: "100%",
                                            cursor: "col-resize",
                                        }}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item.no}>
                                {columns.map((column) => (
                                    <td key={column.key} style={{ width: `${columnWidths[column.key]}%` }}>
                                        {item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tooltip.visible && (
                    <div
                        className="eval-tooltip"
                        ref={tooltipRef}
                        style={{ top: tooltip.top, left: tooltip.left, position: 'absolute' }}
                    >
                        {tooltip.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvaluationTable;
