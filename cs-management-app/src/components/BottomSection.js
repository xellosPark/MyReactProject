import React, { useState } from 'react';
import styles from './BottomSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';

function BottomSection({ tableData, setTableData }) {
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    title: '',
    requester: '',
    requestMail: '',
    requestDate: '',
    state: '',
    manager: '',
    stateProgress: '',
    review: '',
    site: '',
  });

  const [highlightedFields, setHighlightedFields] = useState([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [actionType, setActionType] = useState('');
  const [currentRow, setCurrentRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.max(1, Math.ceil(tableData.length / itemsPerPage));

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setNewRow({
      title: '',
      requester: '',
      requestMail: '',
      requestDate: '',
      state: '',
      manager: '',
      stateProgress: '',
      review: '',
      site: '',
    });
  };

  const openPasswordPrompt = (type, row = null) => {
    setActionType(type);
    setCurrentRow(row);
    setShowPasswordPrompt(true);
  };

  const closePasswordPrompt = () => {
    setShowPasswordPrompt(false);
    setPasswordInput('');
    setActionType('');
    setCurrentRow(null);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === '8877') {
      if (actionType === 'add') {
        setShowForm(true);
      } else if (actionType === 'edit') {
        alert(`수정 작업을 수행합니다: ${currentRow?.title}`);
      } else if (actionType === 'delete') {
        setTableData(tableData.filter((row) => row.id !== currentRow?.id));
        alert(`삭제 작업을 완료했습니다: ${currentRow?.title}`);
      }
      closePasswordPrompt();
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
    const invalidFields = Object.keys(rowToAdd).filter(
      (key) => !rowToAdd[key] || rowToAdd[key] === '선택'
    );

    if (invalidFields.length > 0) {
      alert(`다음 필드를 확인하세요: ${invalidFields.join(', ')}`);
      setHighlightedFields(invalidFields);
      return;
    }

    setTableData([rowToAdd, ...tableData]);
    closeForm();
  };

  const getInputClassName = (field) => {
    return highlightedFields.includes(field) ? styles.errorField : '';
  };

  return (
    <div className={styles.bottomSection}>
      <div className={styles.header}>
        <button className={styles.addButton} onClick={() => openPasswordPrompt('add')}>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} /> Add
        </button>
      </div>

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
            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="title">제목</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('title')}`}
                  type="text"
                  name="title"
                  value={newRow.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
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
            <div className={styles.buttonRow}>
              <button onClick={handleAddRow}>등록</button>
              <button onClick={closeForm}>취소</button>
            </div>
          </div>
        </div>
      )}

      <table className={styles.table}>
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
          {currentItems.map((row, index) => (
            <tr key={index}>
              <td>{index + 1 + indexOfFirstItem}</td>
              <td className="title">{row.title}</td>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="pagination-container" style={{ textAlign: "center", flexGrow: 1 }}>
          <Pagination postsPerPage={itemsPerPage} totalPosts={tableData.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}

export default BottomSection;
