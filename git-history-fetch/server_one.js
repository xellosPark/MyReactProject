const express = require('express');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;
const git = simpleGit();

const repoUrl = 'http://git.ubisam.local/Project/lpc/lgd-m-rnd/aurora_lpc/source.git';
// const repoUrl = 'http://git.ubisam.local/Project/ELA/ELA_BACKBOX_ver_2015.git';
//const repoUrl = 'https://github.com/xellosPark/WebServer.git';

const localPath = path.resolve(__dirname, 'lpc');

app.use(cors());

function cloneRepo() {
  console.log(`디렉토리가 생성되었습니다: ${localPath}`);
  console.log('저장소 클론을 시작합니다...');

  return new Promise((resolve, reject) => {
    const gitClone = spawn('git', ['clone', repoUrl, localPath]);

    gitClone.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gitClone.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`stderr: ${output}`);

      // 진행률 추적
      const progressMatch = output.match(/Receiving objects:\s+(\d+)%/);
      if (progressMatch) {
        console.log(`진행률: ${progressMatch[1]}%`);
      }
    });

    gitClone.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`git clone process exited with code ${code}`));
      }
    });
  });
}

if (!fs.existsSync(localPath)) {
  fs.mkdirSync(localPath, { recursive: true });

  cloneRepo()
    .then(() => {
      console.log('저장소를 성공적으로 클론했습니다');
      fs.readdir(localPath, (err, files) => {
        if (err) {
          console.error('디렉토리를 읽는 데 실패했습니다:', err);
        } else {
          console.log('클론 후 디렉토리 내용:', files);
        }
      });
    })
    .catch(err => {
      console.error('저장소 클론 실패:', err);
    });
} else {
  console.log('저장소가 이미 존재합니다:', localPath);
  fs.readdir(localPath, (err, files) => {
    if (err) {
      console.error('디렉토리를 읽는 데 실패했습니다:', err);
    } else {
      console.log('디렉토리 내용:', files);
    }
  });
}

app.get('/repo-history', async (req, res) => {
  try {
    console.log('저장소 히스토리를 가져오는 중...');
    const log = await git.cwd(localPath).log();
    console.log('저장소 히스토리를 성공적으로 가져왔습니다');
    console.log('저장소 히스토리를 성공적으로 가져왔습니다',log);
    res.json(log.all);
  } catch (err) {
    if (err.message.includes('does not have any commits yet')) {
      console.log('저장소에 커밋이 없습니다');
      res.status(200).send('저장소에 커밋이 없습니다');
    } else {
      console.error('저장소 히스토리를 가져오는 데 실패했습니다:', err);
      res.status(500).send('저장소 히스토리를 가져오는 데 실패했습니다: ' + err.message);
    }
  }
});

app.listen(port, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});