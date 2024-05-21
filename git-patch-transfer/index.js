const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');

// 경로 설정
const sourceRepoPath = path.resolve('./source-repo');

// 로그 함수
const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

// Git 클론 또는 업데이트 함수
const cloneOrUpdateRepo = async (repoUrl, repoPath, repoName) => {
  const git = simpleGit(repoPath);

  if (!fs.existsSync(repoPath)) {
    log(`${repoName} 클론 시작: ${repoUrl}`);
    try {
      await new Promise((resolve, reject) => {
        const gitProcess = spawn('git', ['clone', repoUrl, repoPath, '--progress']);

        gitProcess.stdout.on('data', (data) => {
          log(`[${repoName} 진행 상황] ${data.toString()}`);
        });

        gitProcess.stderr.on('data', (data) => {
          const message = data.toString();
          if (/error|fatal/i.test(message)) {
            log(`[${repoName} 오류] ${message}`);
          } else {
            log(`[${repoName} 진행 상황] ${message}`);
          }
        });

        gitProcess.on('close', (code) => {
          if (code === 0) {
            log(`${repoName} 클론 완료: ${repoPath}`);
            resolve();
          } else {
            reject(new Error(`${repoName} 클론 실패: 종료 코드 ${code}`));
          }
        });
      });
    } catch (error) {
      log(`${repoName} 클론 중 오류: ${error.message}`);
    }
  } else {
    log(`${repoName} 업데이트 시작: ${repoPath}`);
    try {
      await git.pull('origin', 'main');
      log(`${repoName} 업데이트 완료: ${repoPath}`);
    } catch (error) {
      log(`${repoName} 업데이트 중 오류: ${error.message}`);
    }
  }
};

// 커밋 로그 가져오기
const getCommitLog = async () => {
  const gitSource = simpleGit(sourceRepoPath);

  try {
    log('커밋 로그 가져오기 시작');
    const logSummary = await gitSource.log();
    log('커밋 로그 가져오기 완료');
    return logSummary.all;
  } catch (error) {
    log(`커밋 로그 가져오기 중 오류: ${error.message}`);
    return [];
  }
};

// 스크립트를 실행하는 메인 함수
const main = async () => {
  const sourceRepoUrl = 'https://github.com/xellosPark/MyReactProject.git';

  log('스크립트 시작');

  await cloneOrUpdateRepo(sourceRepoUrl, sourceRepoPath, '소스 레포지토리');

  const commitLog = await getCommitLog();
  commitLog.forEach(commit => {
    log(`커밋: ${commit.hash} - ${commit.message} (작성자: ${commit.author_name}, 날짜: ${commit.date})`);
  });

  log('스크립트 완료');
};

main();