import React, { useState } from 'react';
import styles from './BottomSection.module.css';

function BottomSection() {
  const [tableData, setTableData] = useState([
    {
      title: '요청 제목 1',
      requester: '홍길동',
      email: 'hong@example.com',
      grade: 'A',
      assignee: '김철수',
      status: '진행 중',
      progress: '50%',
      comment: '검토 필요',
    },
    {
      title: '요청 제목 2',
      requester: '이영희',
      email: 'lee@example.com',
      grade: 'B',
      assignee: '박영수',
      status: '완료',
      progress: '100%',
      comment: '완료 처리',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    title: '',
    requester: '',
    email: '',
    grade: '',
    assignee: '',
    status: '',
    progress: '',
    comment: '',
  });

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setNewRow({
      title: '',
      requester: '',
      email: '',
      grade: '',
      assignee: '',
      status: '',
      progress: '',
      comment: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    const rowToAdd = { ...newRow };
    setTableData([rowToAdd, ...tableData]); // 최신 데이터 맨 위에 추가
    closeForm();
  };

  return (
    <div className={styles.bottomSection}>
      <div className={styles.header}>
        <button className={styles.addButton} onClick={openForm}>
          새로 추가
        </button>
      </div>

      {showForm && (
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <label>제목:</label>
            <input type="text" name="title" value={newRow.title} onChange={handleInputChange} />
            <label>사이트</label>
            <label>요청자:</label>
            <input type="text" name="requester" value={newRow.requester} onChange={handleInputChange} />
            <label>요청메일:</label>
            <input type="email" name="email" value={newRow.email} onChange={handleInputChange} />
            <label>요청날짜:</label>
            <label>상태원인:</label>
            <input type="text" name="grade" value={newRow.grade} onChange={handleInputChange} />
            <label>상태:</label>
            <input type="text" name="status" value={newRow.status} onChange={handleInputChange} />
            <label>담당자:</label>
            <input type="text" name="assignee" value={newRow.assignee} onChange={handleInputChange} />
            <label>진행률:</label>
            <input type="text" name="progress" value={newRow.progress} onChange={handleInputChange} />
            <label>내부진행률:</label>
            <textarea name="comment" value={newRow.comment} onChange={handleInputChange}></textarea>
            <button onClick={handleAddRow}>등록</button>
            <button onClick={closeForm}>취소</button>
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
            <th>등급</th>
            <th>담당자</th>
            <th>상태</th>
            <th>진행률</th>
            <th>코멘트/메모</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.title}</td>
              <td>{row.requester}</td>
              <td>{row.email}</td>
              <td>{row.grade}</td>
              <td>{row.assignee}</td>
              <td>{row.status}</td>
              <td>{row.progress}</td>
              <td>{row.comment}</td>
              <td>
                <button>수정</button>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BottomSection;
