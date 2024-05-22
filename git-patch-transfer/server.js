const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

const cloneOrUpdateRepo = async (repoUrl, repoPath, repoName, io) => {
  if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath, { recursive: true });
  }

  const git = simpleGit(repoPath);

  if (!fs.existsSync(path.join(repoPath, '.git'))) {
    log(`${repoName} 클론 시작: ${repoUrl}`);
    try {
      await new Promise((resolve, reject) => {
        const gitProcess = spawn('git', ['clone', repoUrl, repoPath, '--progress']);

        gitProcess.stdout.on('data', (data) => {
          log(`[${repoName} 진행 상황] ${data.toString()}`);
          io.emit('progress', data.toString());
        });

        gitProcess.stderr.on('data', (data) => {
          const message = data.toString();
          if (/error|fatal/i.test(message)) {
            log(`[${repoName} 오류] ${message}`);
          } else {
            log(`[${repoName} 진행 상황] ${message}`);
          }
          io.emit('progress', message);
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
      throw new Error(`${repoName} 클론 중 오류: ${error.message}`);
    }
  } else {
    log(`${repoName} 업데이트 시작: ${repoPath}`);
    try {
      await git.pull('origin', 'main');
      log(`${repoName} 업데이트 완료: ${repoPath}`);
    } catch (error) {
      log(`${repoName} 업데이트 중 오류: ${error.message}`);
      throw new Error(`${repoName} 업데이트 중 오류: ${error.message}`);
    }
  }
};

const getCommitLog = async (repoPath) => {
  const git = simpleGit(repoPath);

  try {
    log('커밋 로그 가져오기 시작');
    const logSummary = await git.log();
    log('커밋 로그 가져오기 완료');
    return logSummary.all;
  } catch (error) {
    log(`커밋 로그 가져오기 중 오류: ${error.message}`);
    throw new Error(`커밋 로그 가져오기 중 오류: ${error.message}`);
  }
};

const getProjectName = (repoUrl) => {
    const urlParts = repoUrl.split('/');
    const repoNameWithGit = urlParts[urlParts.length - 1];
    const repoName = repoNameWithGit.replace('.git', '');
    return repoName;
  };

app.post('/clone-or-update', async (req, res) => {
  const { repoUrl } = req.body;
  const repoName = getProjectName(repoUrl);
  log(`clone 제목: ${repoName}`);
  const sourceRepoPath = path.resolve(`./Github-Repo/${repoName}`);

  try {
    const io = req.app.get('io');
    await cloneOrUpdateRepo(repoUrl, sourceRepoPath, '소스 레포지토리', io);

    const commitLog = await getCommitLog(sourceRepoPath);
    res.json({ commitLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  log('클라이언트 연결됨');
});

server.listen(PORT, () => {
  log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
});