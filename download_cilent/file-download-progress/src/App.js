import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // UUID 패키지 가져오기

const socket = io('http://localhost:5000'); // 서버 주소 설정

const App = () => {
    const [files, setFiles] = useState([]); // 선택한 파일들 상태
    const [uuid, setUuid] = useState(null); // UUID 상태 (한 폴더 내 모든 파일)
    const [progress, setProgress] = useState([]); // 파일별 업로드 진행률 상태
    const [uploadComplete, setUploadComplete] = useState(false); // 업로드 완료 여부 상태
    const [totalProgress, setTotalProgress] = useState(0); // 전체 업로드 진행률 상태

    // 서버로부터 업로드 진행 상태 수신
    useEffect(() => {
        socket.on('uploadProgress', (progress) => {
            console.log(`서버에서 받은 업로드 진행 상태: ${progress}%`);
        });

        // 컴포넌트 언마운트 시 소켓 이벤트 리스너 제거
        return () => {
            socket.off('uploadProgress');
        };
    }, []);

    // 파일 선택 시 호출되는 함수 (여러 파일 선택 가능)
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files); // 여러 파일을 배열로 저장
        setFiles(selectedFiles); // 상태에 파일 목록 설정
        setProgress(selectedFiles.map(() => 0)); // 파일별 진행률 초기화
        setUploadComplete(false); // 업로드 완료 상태 초기화
        setTotalProgress(0); // 전체 진행률 초기화
    };

    // 전체 진행률 업데이트 함수
    const updateTotalProgress = (individualProgress) => {
        const total = individualProgress.reduce((sum, fileProgress) => sum + fileProgress, 0);
        const averageProgress = total / individualProgress.length;
        setTotalProgress(averageProgress); // 전체 진행률 상태 업데이트
    };

    // 파일 업로드 처리 함수
    const handleUpload = async () => {
        if (files.length === 0) {
            alert('파일을 먼저 선택하세요.');
            return;
        }

        // 파일 업로드 시점에 UUID 생성
        const newUuid = uuidv4(); // 새 UUID 생성
        setUuid(newUuid); // UUID 상태 업데이트
        console.log(`생성된 UUID: ${newUuid}, 선택된 파일 수: ${files.length}`);
        
        files.forEach((file) => {
            console.log(`파일: ${file.name}`); // 파일명 출력
        });

        // UUID를 서버로 전송하여 폴더 생성
        socket.emit('sendUuid', newUuid, (response) => {
            if (response === 'UUID received') {
                console.log(`UUID가 서버에서 확인됨: ${newUuid}`);

                // 모든 파일 업로드 처리
                files.forEach((file, index) => {
                    console.log(`파일 업로드 시작: ${file.name} (UUID: ${newUuid})`);

                    const formData = new FormData();
                    formData.append('file', file); // 파일 추가
                    formData.append('uuid', newUuid); // 같은 UUID 추가

                    axios.post(`http://localhost:5000/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setProgress((prevProgress) => {
                                const newProgress = [...prevProgress];
                                newProgress[index] = percentCompleted; // 각 파일별 진행률 업데이트
                                updateTotalProgress(newProgress); // 전체 진행률 업데이트
                                return newProgress;
                            });

                            console.log(`파일: ${file.name} 업로드 중... ${percentCompleted}% 완료`);

                            // 서버로 업로드 진행 상태 전송
                            socket.emit('uploadProgress', percentCompleted);
                        },
                    })
                    .then(() => {
                        console.log(`파일 업로드 완료: ${file.name}`);
                    })
                    .catch((error) => {
                        console.error(`파일 업로드 실패: ${file.name}, 오류:`, error);
                    });
                });

                setUploadComplete(true); // 전체 업로드 완료 상태 업데이트
            }
        });
    };

    return (
        <div>
            <h1>다중 파일 업로드 및 진행률 표시</h1>
            <input type="file" onChange={handleFileChange} multiple /> {/* 다중 파일 선택 */}
            <button onClick={handleUpload}>파일 업로드</button> {/* 업로드 버튼 */}

            <div>
                <h2>전체 업로드 진행 상태: {totalProgress}%</h2> {/* 전체 진행 상태 */}
                <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
                    <div
                        style={{
                            width: `${totalProgress}%`,
                            height: '20px',
                            backgroundColor: 'green',
                        }}
                    />
                </div>

                <h2>선택된 파일들:</h2>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>
                            {file.name} - 진행 상태: {progress[index]}%
                            <div style={{ width: '100%', backgroundColor: '#ccc', marginTop: '5px' }}>
                                <div
                                    style={{
                                        width: `${progress[index]}%`,
                                        height: '10px',
                                        backgroundColor: 'blue',
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>

                {uploadComplete && <p>모든 파일 업로드 완료!</p>} {/* 업로드 완료 시 메시지 표시 */}
            </div>
        </div>
    );
};

export default App;