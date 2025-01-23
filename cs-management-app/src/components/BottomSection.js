import React, { useState } from 'react';
import styles from './BottomSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function BottomSection({ tableData, setTableData }) {
  // const [tableData, setTableData] = useState([
  //   {
  //     id: 1,
  //     title: '[AP4][ELA] 로그 분석 요청',
  //     requester: '홍길동',
  //     requestMail: '메일',
  //     requestDate: '2025-01-22',
  //     state: 'log',
  //     manager: '김철수',
  //     stateProgress: '진행중',
  //     review: '접수',
  //     site: '파주[패턴]',
  //   },
  //   {
  //     id: 2,
  //     title: '[AP4][RPR] 알람 처리 요청',
  //     requester: '이영희',
  //     requestMail: '전화',
  //     requestDate: '2025-01-21',
  //     state: '알람',
  //     manager: '박영수',
  //     stateProgress: '완료',
  //     review: '컴펀 중',
  //     site: '파주[레이저]',
  //   },
  //   {
  //     id: 3,
  //     title: '[AP5][패턴] 디버그 요청',
  //     requester: '최민수',
  //     requestMail: '메일',
  //     requestDate: '2025-01-20',
  //     state: 'debug',
  //     manager: '이정훈',
  //     stateProgress: '진행중',
  //     review: '컴펀 완료',
  //     site: '구미[패턴]',
  //   },
  //   {
  //     id: 4,
  //     title: '[AP4][패턴] 버그 수정 요청',
  //     requester: '김은영',
  //     requestMail: '일반',
  //     requestDate: '2025-01-19',
  //     state: '버그',
  //     manager: '박지훈',
  //     stateProgress: '취소',
  //     review: '긴급 대응',
  //     site: '구미[레이저]',
  //   },
  //   {
  //     id: 5,
  //     title: '[AP3][패턴] 테스트 진행 요청',
  //     requester: '이현수',
  //     requestMail: '전화',
  //     requestDate: '2025-01-18',
  //     state: '테스트',
  //     manager: '정소희',
  //     stateProgress: '완료',
  //     review: '접수',
  //     site: '파주[레이저]',
  //   },
  // ]);

  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    title: '', // 요청 제목
    requester: '', // 요청자
    requestMail: '', // 요청 메일
    requestDate: '', // 요청 날짜
    state: '', // 상태
    manager: '', // 담당자
    stateProgress: '', // 진행률
    review: '', // 검토 상태
    site: '', // 관련 사이트
  });

  // const openForm = () => {
  //   setShowForm(true);
  // };

  const closeForm = () => {
    setShowForm(false);
    setNewRow({
      title: '', // 요청 제목
      requester: '', // 요청자
      requestMail: '', // 요청 메일
      requestDate: '', // 요청 날짜
      state: '', // 상태
      manager: '', // 담당자
      stateProgress: '', // 진행률
      review: '', // 검토 상태
      site: '', // 관련 사이트
    });
  };

  const [highlightedFields, setHighlightedFields] = useState([]);

    // 상태 관리: 비밀번호 입력 창 표시 여부
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    // 상태 관리: 비밀번호 입력 값
  const [passwordInput, setPasswordInput] = useState('')
  const [actionType, setActionType] = useState(''); // "add", "edit", "delete"
  const [currentRow, setCurrentRow] = useState(null); // 현재 수정/삭제할 행 데이

  // 비밀번호 창 열기
  const openPasswordPrompt = (type, row = null) => {
    setActionType(type); // 액션 타입 설정
    setCurrentRow(row); // 현재 선택한 행 데이터 설정 (add는 null)
    setShowPasswordPrompt(true); // 비밀번호 창 표시
  };

  // 비밀번호 창 닫기
  const closePasswordPrompt = () => {
    setShowPasswordPrompt(false); // 비밀번호 창 숨김
    setPasswordInput(''); // 비밀번호 입력 초기화
    setActionType('');
    setCurrentRow(null);
  };

 // 비밀번호 확인 처리
 const handlePasswordSubmit = () => {
  if (passwordInput === '8877') {
    if (actionType === 'add') {
      setShowForm(true); // Add 버튼은 추가 폼 열기
    } else if (actionType === 'edit') {
      alert(`수정 작업을 수행합니다: ${currentRow?.title}`);
      // Edit 작업 로직 추가
    } else if (actionType === 'delete') {
      setTableData(tableData.filter((row) => row.id !== currentRow?.id));
      alert(`삭제 작업을 완료했습니다: ${currentRow?.title}`);
    }
    closePasswordPrompt(); // 비밀번호 창 닫기
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    const rowToAdd = { ...newRow };
  
    // 비어있거나 "선택"인 필드를 확인
    const invalidFields = Object.keys(rowToAdd).filter(
      (key) => !rowToAdd[key] || rowToAdd[key] === "선택"
    );
  
    // 유효하지 않은 입력값이 있는 경우
    if (invalidFields.length > 0) {
      alert(`다음 필드를 확인하세요: ${invalidFields.join(", ")}`); // 알람창 표시
      setHighlightedFields(invalidFields); // 강조 표시를 위한 상태 저장
      return; // 함수 종료
    }

    // 유효한 경우 데이터 추가
    setTableData([rowToAdd, ...tableData]); // 최신 데이터 맨 위에 추가
    closeForm(); // 폼 닫기
  };

  const getInputClassName = (field) => {
    return highlightedFields.includes(field) ? styles.errorField : "";
  };

  return (
    <div className={styles.bottomSection}>
    <div className={styles.header}>
      <button className={styles.addButton} onClick={() => openPasswordPrompt('add')}>
        <FontAwesomeIcon icon={faPlus} className={styles.icon} /> Add
      </button>
    </div>


       {/* 비밀번호 입력 창 */}
       {showPasswordPrompt && (
        <div className={styles.passwordPrompt}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="비밀번호 입력"
          />
          <div className={styles.buttonRow}>
            <button onClick={handlePasswordSubmit}>확인</button>
            <button onClick={closePasswordPrompt}>취소</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <div className={styles.form}>

            <h3 className={styles.formTitle}>CS 접수 새로 추가하기</h3>

            {/* 1열: 제목 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label className="form-label" htmlFor="title">제목</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('title')}`}
                  type="text"
                  name="title"
                  value={newRow.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 2열: 요청자, 요청 메일 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>요청자:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('requester')}`}
                  type="text"
                  name="requester"
                  value={newRow.requester}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
                <label>요청 메일:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('requestMail')}`}
                  name="requestMail"
                  value={newRow.requestMail}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="메일">메일</option>
                  <option value="전화">전화</option>
                  <option value="일반">일반</option>
                </select>
              </div>
            </div>

            {/* 3열: 요청 날짜, 상태 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>요청 날짜:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('requestDate')}`}
                  type="date"
                  name="requestDate"
                  value={newRow.requestDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
                <label>상태:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('state')}`}
                  name="state"
                  value={newRow.state}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="log">log</option>
                  <option value="알람">알람</option>
                  <option value="debug">debug</option>
                  <option value="버그">버그</option>
                  <option value="분석">분석</option>
                  <option value="테스트">테스트</option>
                  <option value="일반">일반</option>
                </select>
              </div>
            </div>

            {/* 4열: 담당자, 진행률 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>담당자:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('manager')}`}
                  type="text"
                  name="manager"
                  value={newRow.manager}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
                <label>진행률:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('stateProgress')}`}
                  name="stateProgress"
                  value={newRow.stateProgress}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                  <option value="취소">취소</option>
                </select>
              </div>
            </div>

            {/* 5열: 검토 상태, 관련 사이트 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>검토 상태:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('review')}`}
                  name="review"
                  value={newRow.review}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="접수">접수</option>
                  <option value="컴펀 중">컴펀 중</option>
                  <option value="컴펀 완료">컴펀 완료</option>
                  <option value="긴급 대응">긴급 대응</option>
                </select>
              </div>
              <div className={styles.column}>
                <label>관련 사이트:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('site')}`}
                  name="site"
                  value={newRow.site}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="파주[패턴]">파주[패턴]</option>
                  <option value="파주[레이저]">파주[레이저]</option>
                  <option value="구미[패턴]">구미[패턴]</option>
                  <option value="구미[레이저]">구미[레이저]</option>
                </select>
              </div>
            </div>

            {/* 등록/취소 버튼 */}
            <div className={styles.buttonRow}>
              <button onClick={handleAddRow}>등록</button>
              <button onClick={closeForm}>취소</button>
            </div>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>요청자</th>
            <th>요청메일</th>
            <th>요청날짜</th>
            <th>분류</th>
            <th>담당자</th>
            <th>진행률</th>
            <th>검토 상태</th>
            <th>관련 사이트</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="title">{row.title}</td> {/* 제목 왼쪽 정렬 */}
              <td>{row.requester}</td>
              <td>{row.requestMail}</td>
              <td>{row.requestDate}</td>
              <td>{row.state}</td>
              <td>{row.manager}</td>
              <td>{row.stateProgress}</td>
              <td>{row.review}</td>
              <td>{row.site}</td>
              <td>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => openPasswordPrompt('edit', row)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => openPasswordPrompt('delete', row)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BottomSection;
