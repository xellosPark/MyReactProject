const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3033;

const openvpnExePath = 'C:\\Program Files\\OpenVPN Connect\\OpenVPNConnect.exe';
const ovpnConfigPath = 'C:\\Users\\ubisam007\\AppData\\Roaming\\OpenVPN Connect\\profiles\\1667199472625.ovpn';
const logFilePath = path.join(__dirname, 'vpn_log.txt');

app.use(cors());

const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

function runCommand(command, callback) {
    log(`명령 실행: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            log(`명령 실행 오류: ${stderr}`);
            callback(stderr, null);
        } else {
            log(`명령 실행 결과: ${stdout}`);
            callback(null, stdout);
        }
    });
}

function connectVPN(callback) {
    const command = `"${openvpnExePath}" --config "${ovpnConfigPath}" --connect`;
    log(`연결 명령: ${command}`);
    runCommand(command, callback);
}

function disconnectVPN(callback) {
    const command = `"${openvpnExePath}" --disconnect`;
    log(`연결 해제 명령: ${command}`);
    runCommand(command, callback);
}

app.post('/connect', (req, res) => {
    connectVPN((error, stdout) => {
        if (error) {
            log(`연결 시도 오류: ${error}`);
            res.status(500).json({ status: 'error', message: error });
        } else {
            log('VPN에 성공적으로 연결되었습니다');
            res.json({ status: 'success', message: stdout });
        }
    });
});

app.post('/disconnect', (req, res) => {
    disconnectVPN((error, stdout) => {
        if (error) {
            log(`연결 해제 시도 오류: ${error}`);
            res.status(500).json({ status: 'error', message: error });
        } else {
            log('VPN 연결이 성공적으로 해제되었습니다');
            res.json({ status: 'success', message: stdout });
        }
    });
});

app.listen(port, () => {
    log(`OpenVPN API 서버가 http://localhost:${port}에서 실행 중입니다`);
});