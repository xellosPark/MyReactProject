const express = require('express');  // Express 모듈을 가져옵니다.
const simpleGit = require('simple-git');  // simple-git 모듈을 가져옵니다.
const path = require('path');  // path 모듈을 가져옵니다.
const fs = require('fs');  // 파일 시스템 모듈을 가져옵니다.
const cors = require('cors');  // CORS 모듈을 가져옵니다.
const { spawn } = require('child_process');  // child_process 모듈을 가져옵니다.

const app = express();  // Express 애플리케이션을 생성합니다.
const port = 3001;  // 서버 포트를 설정합니다.

// 저장소 URL 배열 (주석 처리된 URL 제외)
const repoUrls = [
  //'http://git.ubisam.local/Project/lpc/lgd-m-rnd/aurora_lpc/source.git',
   // 'http://git.ubisam.local/Project/ELA/ELA_BACKBOX_ver_2015.git',
  // 'https://github.com/xellosPark/WebServer.git',
  //'https://github.com/xellosPark/ReactNative.git'
];

app.use(cors());  // CORS를 사용하도록 설정합니다.

// Git 저장소를 클론하는 함수
function cloneRepo(repoUrl, localPath) {
  console.log(`디렉토리가 생성되었습니다: ${localPath}`);
  console.log(`저장소 클론을 시작합니다: ${repoUrl}`);

  return new Promise((resolve, reject) => {
    const gitClone = spawn('git', ['clone', repoUrl, localPath]);  // 'git clone' 명령어를 실행합니다.

    gitClone.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gitClone.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`stderr: ${output}`);

      // 클론 진행률을 추적합니다.
      const progressMatch = output.match(/Receiving objects:\s+(\d+)%/);
      if (progressMatch) {
        console.log(`진행률: ${progressMatch[1]}%`);
      }
    });

    gitClone.on('close', (code) => {
      if (code === 0) {
        resolve();  // 클론 성공 시 Promise를 해결합니다.
      } else {
        reject(new Error(`git clone 프로세스가 코드 ${code}로 종료되었습니다`));  // 클론 실패 시 Promise를 거부합니다.
      }
    });
  });
}

// Git 저장소를 업데이트하는 함수
function pullRepo(localPath) {
  console.log(`저장소 업데이트를 시작합니다: ${localPath}`);

  return new Promise((resolve, reject) => {
    const gitPull = spawn('git', ['pull'], { cwd: localPath });  // 'git pull' 명령어를 실행합니다.

    gitPull.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gitPull.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`stderr: ${output}`);
    });

    gitPull.on('close', (code) => {
      if (code === 0) {
        resolve();  // 업데이트 성공 시 Promise를 해결합니다.
      } else {
        reject(new Error(`git pull 프로세스가 코드 ${code}로 종료되었습니다`));  // 업데이트 실패 시 Promise를 거부합니다.
      }
    });
  });
}

// 저장소를 클론하거나 업데이트하는 함수
const cloneOrUpdateRepo = async (repoUrl, localPath) => {
  if (!fs.existsSync(localPath)) {  // 디렉토리가 존재하지 않는 경우
    fs.mkdirSync(localPath, { recursive: true });  // 디렉토리를 재귀적으로 생성합니다.
    await cloneRepo(repoUrl, localPath);
    console.log(`${repoUrl} 저장소를 성공적으로 클론했습니다`);
    fs.readdir(localPath, (err, files) => {
      if (err) {
        console.error('디렉토리를 읽는 데 실패했습니다:', err);
      } else {
        console.log(`${repoUrl} 클론 후 디렉토리 내용:`, files);
      }
    });
  } else {
    console.log(`${repoUrl} 저장소가 이미 존재합니다:`, localPath);
    await pullRepo(localPath);
    console.log(`${repoUrl} 저장소를 성공적으로 업데이트했습니다`);
    fs.readdir(localPath, (err, files) => {
      if (err) {
        console.error('디렉토리를 읽는 데 실패했습니다:', err);
      } else {
        console.log(`${repoUrl} 업데이트 후 디렉토리 내용:`, files);
      }
    });
  }
};

// 저장소 히스토리를 가져오는 엔드포인트
app.get('/repo-history', async (req, res) => {
  try {
    await Promise.all(repoUrls.map((repoUrl, index) => {
      const localPath = path.resolve(__dirname, `cloned-repo-${index}`);
      return cloneOrUpdateRepo(repoUrl, localPath);
    }));

    const allLogs = await Promise.all(repoUrls.map(async (repoUrl, index) => {
      const localPath = path.resolve(__dirname, `cloned-repo-${index}`);
      const git = simpleGit(localPath);
      const log = await git.log();
      return {
        repoUrl,
        log: log.all  // 저장소의 모든 로그를 반환합니다.
      };
    }));

    console.log(`${getCurrentTime()} - 저장소 히스토리를 성공적으로 가져왔습니다`);
    res.json(allLogs);  // 로그를 JSON 형식으로 반환합니다.
  } catch (err) {
    console.error('저장소 히스토리를 가져오는 데 실패했습니다:', err);
    res.status(500).send('저장소 히스토리를 가져오는 데 실패했습니다: ' + err.message);  // 오류 메시지를 반환합니다.
  }
});

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// 서버를 시작합니다.
app.listen(port, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});