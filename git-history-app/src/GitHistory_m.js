import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GitHistory = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/repo-history');
        setCommits(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data); // 서버에서 전송된 오류 메시지를 설정
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // 일정 간격으로 최신 히스토리를 가져오는 폴링 설정 (예: 10초마다)
    const interval = setInterval(fetchHistory, 300000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <h1>커밋 히스토리</h1>
      {commits.map((repo, index) => (
        <div key={index}>
          <h2>저장소: {repo.repoUrl}</h2>
          <ul>
            {repo.log.length === 0 ? (
              <li>커밋이 없습니다.</li>
            ) : (
              repo.log.map((commit) => (
                <li key={commit.hash}>
                  <p><strong>작성자:</strong> {commit.author_name}</p>
                  <p><strong>날짜:</strong> {new Date(commit.date).toLocaleString()}</p>
                  <p><strong>메시지:</strong> {commit.message}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GitHistory;