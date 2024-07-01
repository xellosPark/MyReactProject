import React from 'react';
import './UserUnitInfo.css';

const UserUnitInfo = ({ user }) => {
  return (
    <div className="user-profile-info">
      <div className="user-profile-content">
        <h2>사용자 정보</h2>
        <div className="user-info">
          <img src="path-to-placeholder-image.png" alt="user avatar" className="user-avatar" /> {/* 실제 이미지 경로로 변경 */}
          <h3>{user.name || '-'}</h3>
        </div>
        <table className="user-details">
          <tbody>
            <tr>
              <td>아이디</td>
              <td>{user.name || '-'}</td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>{user.password || '-'}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>{user.email || '-'}</td>
            </tr>
            <tr>
              <td>계급</td>
              <td>{user.rank || '-'}</td>
            </tr>
            <tr>
              <td>가입년도</td>
              <td>{user.yearOfJoining || '-'}</td>
            </tr>
            <tr>
              <td>활성화</td>
              <td>
                <label>
                  <input type="radio" name="active" value="active" defaultChecked /> 활성
                </label>
                <label>
                  <input type="radio" name="active" value="inactive" /> 비활성
                </label>
              </td>
            </tr>
            <tr>
              <td>그룹(역할)</td>
              <td>
                <label>
                  <input type="checkbox" name="admin" /> 관리자
                </label>
                <label>
                  <input type="checkbox" name="user" defaultChecked /> 사용자
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-buttons">
          <button>확인</button>
        </div>
      </div>
    </div>
  );
};

export default UserUnitInfo;