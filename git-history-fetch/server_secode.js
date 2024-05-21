const express = require('express');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;
const git = simpleGit();

const repoUrls = [
  'http://git.ubisam.local/Project/lpc/lgd-m-rnd/aurora_lpc/source.git',
  'http://git.ubisam.local/Project/ELA/ELA_BACKBOX_ver_2015.git',
  'https://github.com/xellosPark/WebServer.git',
  'https://github.com/xellosPark/ReactNative.git'
];

app.use(cors());

function cloneRepo(repoUrl, localPath) {
  console.log(`디렉토리가 생성되었습니다: ${localPath}`);
  console.log(`저장소 클론을 시작합니다: ${repoUrl}`);

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

const cloneAllRepos = () => {
  return Promise.all(repoUrls.map((repoUrl, index) => {
    const localPath = path.resolve(__dirname, `cloned-repo-${index}`);
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath, { recursive: true });
      return cloneRepo(repoUrl, localPath)
        .then(() => {
          console.log(`${repoUrl} 저장소를 성공적으로 클론했습니다`);
          fs.readdir(localPath, (err, files) => {
            if (err) {
              console.error('디렉토리를 읽는 데 실패했습니다:', err);
            } else {
              console.log(`${repoUrl} 클론 후 디렉토리 내용:`, files);
              // 데이터를 보관할 파일로 저장
              const dataFilePath = path.resolve(__dirname, `data-repo-${index}.json`);
              const data = {
                repoUrl,
                files
              };
              fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
              console.log(`${dataFilePath} 파일에 데이터가 저장되었습니다.`);
            }
          });
        })
        .catch(err => {
          console.error(`${repoUrl} 저장소 클론 실패:`, err);
        });
    } else {
      console.log(`${repoUrl} 저장소가 이미 존재합니다:`, localPath);
      fs.readdir(localPath, (err, files) => {
        if (err) {
          console.error('디렉토리를 읽는 데 실패했습니다:', err);
        } else {
          console.log(`${repoUrl} 디렉토리 내용:`, files);
        }
      });
      return Promise.resolve();
    }
  }));
};

cloneAllRepos()
  .then(() => {
    console.log('모든 저장소를 성공적으로 클론했습니다');
  })
  .catch(err => {
    console.error('저장소 클론 중 오류가 발생했습니다:', err);
  });

app.get('/repo-history', async (req, res) => {
  try {
    const allLogs = await Promise.all(repoUrls.map((repoUrl, index) => {
      const localPath = path.resolve(__dirname, `cloned-repo-${index}`);
      return git.cwd(localPath).log().then(log => ({
        repoUrl,
        log: log.all
      }));
    }));
    console.log('저장소 히스토리를 성공적으로 가져왔습니다');
    res.json(allLogs);
  } catch (err) {
    console.error('저장소 히스토리를 가져오는 데 실패했습니다:', err);
    res.status(500).send('저장소 히스토리를 가져오는 데 실패했습니다: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});