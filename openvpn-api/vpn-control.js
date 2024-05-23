const { exec } = require('child_process');

const openvpnExePath = 'C:\\Program Files\\OpenVPN Connect\\OpenVPNConnect.exe';
const ovpnConfigPath = 'C:\\Users\\ubisam007\\AppData\\Roaming\\OpenVPN Connect\\profiles\\1667199472625.ovpn';



function connectVPN() {
    console.log('VPN에 연결하는 중...');
    exec(`"${openvpnExePath}" --config "${ovpnConfigPath}" --connect`, (error, stdout, stderr) => {
        if (error) {
            console.error(`VPN 연결 오류: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log('VPN에 성공적으로 연결되었습니다.');
    });
}

function disconnectVPN() {
    console.log('VPN 연결 해제하는 중...');
    exec(`"${openvpnExePath}" --disconnect`, (error, stdout, stderr) => {
        if (error) {
            console.error(`VPN 연결 해제 오류: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log('VPN 연결이 성공적으로 해제되었습니다.');
    });
}

// 사용 예제
connectVPN();
// VPN 연결 해제를 위해 아래 줄의 주석을 제거하세요.
disconnectVPN();