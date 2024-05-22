import React from 'react';

const GithubLogView = ({ logs, commitLog }) => {
  return (
    <div>
      <div>
        <h2>Progress Logs</h2>
        <pre>{logs.join('\n')}</pre>
      </div>
      <div>
        <h2>Commit Logs</h2>
        <pre>{commitLog.map(commit => (
          <div key={commit.hash}>
            {`커밋: ${commit.hash} - ${commit.message} (작성자: ${commit.author_name}, 날짜: ${commit.date})`}
          </div>
        ))}</pre>
      </div>
    </div>
  );
};

export default GithubLogView;