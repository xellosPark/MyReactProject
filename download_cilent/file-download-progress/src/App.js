// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; // UUID 패키지 가져오기

// const socket = io('http://localhost:5000'); // 서버 주소 설정

// const App = () => {
//     const [files, setFiles] = useState([]); // 선택한 파일들 상태
//     const [uuid, setUuid] = useState(null); // UUID 상태 (한 폴더 내 모든 파일)
//     const [progress, setProgress] = useState([]); // 파일별 업로드 진행률 상태
//     const [uploadComplete, setUploadComplete] = useState(false); // 업로드 완료 여부 상태
//     const [totalProgress, setTotalProgress] = useState(0); // 전체 업로드 진행률 상태

//     // 서버로부터 업로드 진행 상태 수신
//     useEffect(() => {
//         socket.on('uploadProgress', (progress) => {
//             console.log(`서버에서 받은 업로드 진행 상태: ${progress}%`);
//         });

//         // 컴포넌트 언마운트 시 소켓 이벤트 리스너 제거
//         return () => {
//             socket.off('uploadProgress');
//         };
//     }, []);

//     // 파일 선택 시 호출되는 함수 (여러 파일 선택 가능)
//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files); // 여러 파일을 배열로 저장
//         setFiles(selectedFiles); // 상태에 파일 목록 설정
//         setProgress(selectedFiles.map(() => 0)); // 파일별 진행률 초기화
//         setUploadComplete(false); // 업로드 완료 상태 초기화
//         setTotalProgress(0); // 전체 진행률 초기화
//     };

//     // 전체 진행률 업데이트 함수
//     const updateTotalProgress = (individualProgress) => {
//         const total = individualProgress.reduce((sum, fileProgress) => sum + fileProgress, 0);
//         const averageProgress = total / individualProgress.length;
//         setTotalProgress(averageProgress); // 전체 진행률 상태 업데이트
//     };

//     // 파일 업로드 처리 함수
//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('파일을 먼저 선택하세요.');
//             return;
//         }

//         // 파일 업로드 시점에 UUID 생성
//         const newUuid = uuidv4(); // 새 UUID 생성
//         setUuid(newUuid); // UUID 상태 업데이트
//         console.log(`생성된 UUID: ${newUuid}, 선택된 파일 수: ${files.length}`);
        
//         files.forEach((file) => {
//             console.log(`파일: ${file.name}`); // 파일명 출력
//         });

//         // UUID를 서버로 전송하여 폴더 생성
//         socket.emit('sendUuid', newUuid, (response) => {
//             if (response === 'UUID received') {
//                 console.log(`UUID가 서버에서 확인됨: ${newUuid}`);

//                 // 모든 파일 업로드 처리
//                 files.forEach((file, index) => {
//                     console.log(`파일 업로드 시작: ${file.name} (UUID: ${newUuid})`);

//                     const formData = new FormData();
//                     formData.append('file', file); // 파일 추가
//                     formData.append('uuid', newUuid); // 같은 UUID 추가

//                     axios.post(`http://localhost:5000/upload`, formData, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                         onUploadProgress: (progressEvent) => {
//                             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                             setProgress((prevProgress) => {
//                                 const newProgress = [...prevProgress];
//                                 newProgress[index] = percentCompleted; // 각 파일별 진행률 업데이트
//                                 updateTotalProgress(newProgress); // 전체 진행률 업데이트
//                                 return newProgress;
//                             });

//                             console.log(`파일: ${file.name} 업로드 중... ${percentCompleted}% 완료`);
//                             // 서버로 업로드 진행 상태 전송
//                             socket.emit('uploadProgress', percentCompleted);
//                         },
//                     })
//                     .then(() => {
//                         console.log(`파일 업로드 완료: ${file.name}`);
//                     })
//                     .catch((error) => {
//                         console.error(`파일 업로드 실패: ${file.name}, 오류:`, error);
//                     });
//                 });

//                 setUploadComplete(true); // 전체 업로드 완료 상태 업데이트
//             }
//         });
//     };

//     return (
//         <div>
//             <h1>다중 파일 업로드 및 진행률 표시</h1>
//             <input type="file" onChange={handleFileChange} multiple /> {/* 다중 파일 선택 */}
//             <button onClick={handleUpload}>파일 업로드</button> {/* 업로드 버튼 */}

//             <div>
//                 <h2>전체 업로드 진행 상태: {totalProgress}%</h2> {/* 전체 진행 상태 */}
//                 <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
//                     <div
//                         style={{
//                             width: `${totalProgress}%`,
//                             height: '20px',
//                             backgroundColor: 'green',
//                         }}
//                     />
//                 </div>

//                 <h2>선택된 파일들:</h2>
//                 <ul>
//                     {files.map((file, index) => (
//                         <li key={index}>
//                             {file.name} - 진행 상태: {progress[index]}%
//                             <div style={{ width: '100%', backgroundColor: '#ccc', marginTop: '5px' }}>
//                                 <div
//                                     style={{
//                                         width: `${progress[index]}%`,
//                                         height: '10px',
//                                         backgroundColor: 'blue',
//                                     }}
//                                 />
//                             </div>
//                         </li>
//                     ))}
//                 </ul>

//                 {uploadComplete && <p>모든 파일 업로드 완료!</p>} {/* 업로드 완료 시 메시지 표시 */}
//             </div>
//         </div>
//     );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const socket = io('http://localhost:5000');

// const App = () => {
//     const [files, setFiles] = useState([]);
//     const [uuid, setUuid] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0); // 파일 업로드 진행 상태
//     const [saveProgress, setSaveProgress] = useState(0); // HDD 저장 진행 상태
//     const [uploadComplete, setUploadComplete] = useState(false);

//     useEffect(() => {
//         // 서버로부터 HDD 저장 진행 상태 수신
//         socket.on('saveProgress', (progress) => {
//             console.log(`서버에서 받은 저장 진행 상태: ${progress}%`);
//             setSaveProgress(progress); // HDD 저장 진행 상태 업데이트
//         });

//         return () => {
//             socket.off('saveProgress');
//         };
//     }, []);

//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         setFiles(selectedFiles);
//         setUploadProgress(0);
//         setSaveProgress(0);
//         setUploadComplete(false);
//     };

//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('파일을 먼저 선택하세요.');
//             return;
//         }

//         const newUuid = uuidv4();
//         setUuid(newUuid);
//         socket.emit('sendUuid', newUuid, (response) => {
//             if (response === 'UUID received') {
//                 files.forEach((file) => {
//                     const formData = new FormData();
//                     formData.append('file', file);
//                     formData.append('uuid', newUuid);

//                     axios.post(`http://localhost:5000/upload`, formData, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                         onUploadProgress: (progressEvent) => {
//                             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                             setUploadProgress(percentCompleted);
//                         },
//                     })
//                     .then(() => {
//                         console.log(`파일 업로드 완료: ${file.name}`);
//                         setUploadComplete(true);
//                         setSaveProgress(0);
//                         // 업로드 완료 후 HDD 저장 진행률 요청
//                         socket.emit('requestSaveProgress');
//                     })
//                     .catch((error) => {
//                         console.error(`파일 업로드 실패: ${file.name}, 오류:`, error);
//                     });
//                 });
//             }
//         });
//     };

//     return (
//         <div>
//             <h1>파일 업로드 및 진행률 표시</h1>
//             <input type="file" onChange={handleFileChange} multiple /> {/* 다중 파일 선택 */}
//             <button onClick={handleUpload}>파일 업로드</button> {/* 업로드 버튼 */}

//             <div>
//                 <h2>업로드 진행 상태: {uploadProgress}%</h2>
//                 <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
//                     <div
//                         style={{
//                             width: `${uploadProgress}%`,
//                             height: '20px',
//                             backgroundColor: 'blue',
//                         }}
//                     />
//                 </div>

//                 {uploadComplete && (
//                     <>
//                         <h2>HDD 저장 진행 상태: {saveProgress}%</h2>
//                         <div style={{ width: '100%', backgroundColor: '#eee' }}>
//                             <div
//                                 style={{
//                                     width: `${saveProgress}%`,
//                                     height: '20px',
//                                     backgroundColor: 'green',
//                                 }}
//                             />
//                         </div>
//                     </>
//                 )}

//                 {uploadComplete && saveProgress === 100 && <p>파일 업로드 및 저장 완료!</p>}
//             </div>
//         </div>
//     );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; // UUID 패키지 가져오기

// const socket = io('http://localhost:5000'); // 서버 주소 설정

// const App = () => {
//     const [files, setFiles] = useState([]); // 선택한 파일들 상태
//     const [uuid, setUuid] = useState(null); // UUID 상태 (한 폴더 내 모든 파일)
//     const [uploadProgress, setUploadProgress] = useState(0); // 파일 업로드 진행 상태
//     const [saveProgress, setSaveProgress] = useState(0); // HDD 저장 진행 상태
//     const [uploadComplete, setUploadComplete] = useState(false); // 업로드 완료 여부 상태

//     // 서버로부터 저장 진행 상태 수신
//     useEffect(() => {
//         socket.on('saveProgress', (progress) => {
//             if (progress === 'error') {
//                 alert('파일 저장 중 오류 발생');
//                 setSaveProgress(0);
//             } else {
//                 setSaveProgress(progress); // HDD 저장 진행 상태 업데이트
//                 console.log(`저장 진행 상태: ${progress}%`);
//             }
//         });

//         return () => {
//             socket.off('saveProgress');
//         };
//     }, []);

//     // 파일 선택 시 호출되는 함수 (여러 파일 선택 가능)
//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files); // 선택된 파일들을 배열로 저장
//         setFiles(selectedFiles); // 파일 목록 상태 설정
//         setUploadProgress(0); // 업로드 진행 상태 초기화
//         setSaveProgress(0); // 저장 진행 상태 초기화
//         setUploadComplete(false); // 업로드 완료 상태 초기화
//     };

//     // 파일 업로드 처리 함수
//     const handleUpload = async () => {
//         if (files.length === 0) {
//             alert('파일을 먼저 선택하세요.');
//             return;
//         }

//         // 업로드 시점에 UUID 생성 및 서버에 전송
//         const newUuid = uuidv4(); // 새로운 UUID 생성
//         setUuid(newUuid); // UUID 상태 업데이트
//         socket.emit('sendUuid', newUuid, (response) => {
//             if (response === 'UUID received') {
//                 files.forEach((file) => {
//                     const formData = new FormData();
//                     formData.append('file', file); // 파일 추가
//                     formData.append('uuid', newUuid); // 동일 UUID 추가

//                     // 파일 업로드 진행 상태 업데이트
//                     axios.post(`http://localhost:5000/upload`, formData, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data',
//                         },
//                         onUploadProgress: (progressEvent) => {
//                             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                             setUploadProgress(percentCompleted); // 업로드 진행 상태 업데이트
//                         },
//                     })
//                     .then(() => {
//                         console.log(`파일 업로드 완료: ${file.name}`);
//                         setUploadComplete(true); // 업로드 완료 상태 업데이트
//                         setSaveProgress(0); // 저장 진행 상태 초기화
//                     })
//                     .catch((error) => {
//                         console.error(`파일 업로드 실패: ${file.name}, 오류:`, error);
//                     });
//                 });
//             }
//         });
//     };

//     return (
//         <div>
//             <h1>파일 업로드 및 진행률 표시</h1>
//             <input type="file" onChange={handleFileChange} multiple /> {/* 다중 파일 선택 */}
//             <button onClick={handleUpload}>파일 업로드</button> {/* 업로드 버튼 */}

//             <div>
//                 <h2>업로드 진행 상태: {uploadProgress}%</h2>
//                 <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
//                     <div
//                         style={{
//                             width: `${uploadProgress}%`,
//                             height: '20px',
//                             backgroundColor: 'blue',
//                         }}
//                     />
//                 </div>

//                 {/* 업로드 완료 후 HDD 저장 진행 상태 표시 */}
//                 {uploadComplete && (
//                     <>
//                         <h2>HDD 저장 진행 상태: {saveProgress}%</h2>
//                         <div style={{ width: '100%', backgroundColor: '#eee' }}>
//                             <div
//                                 style={{
//                                     width: `${saveProgress}%`,
//                                     height: '20px',
//                                     backgroundColor: 'green',
//                                 }}
//                             />
//                         </div>
//                     </>
//                 )}

//                 {/* 모든 작업 완료 시 메시지 표시 */}
//                 {uploadComplete && saveProgress === 100 && <p>파일 업로드 및 저장 완료!</p>}
//             </div>
//         </div>
//     );
// };

// export default App;


//클라이언트의 onUploadProgress: 파일 업로드 진행률을 90%로 제한하여 업데이트합니다.

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // UUID 패키지 가져오기

const socket = io('http://localhost:5000'); // 서버 주소 설정

const App = () => {
    const [files, setFiles] = useState([]); // 선택한 파일들 상태
    const [uuid, setUuid] = useState(null); // UUID 상태 (한 폴더 내 모든 파일)
    const [uploadProgress, setUploadProgress] = useState(0); // 파일 업로드 진행 상태
    const [saveProgress, setSaveProgress] = useState(0); // HDD 저장 진행 상태
    const [uploadComplete, setUploadComplete] = useState(false); // 업로드 완료 여부 상태

    // 서버로부터 저장 진행 상태 수신
    useEffect(() => {
        socket.on('saveProgress', (progress) => {
            if (progress === 'error') {
                alert('파일 저장 중 오류 발생');
                setSaveProgress(0);
            } else {
                setSaveProgress(progress); // HDD 저장 진행 상태 업데이트
                console.log(`저장 진행 상태: ${progress}%`);
            }
        });

        return () => {
            socket.off('saveProgress');
        };
    }, []);

    // 파일 선택 시 호출되는 함수 (여러 파일 선택 가능)
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files); // 선택된 파일들을 배열로 저장
        setFiles(selectedFiles); // 파일 목록 상태 설정
        setUploadProgress(0); // 업로드 진행 상태 초기화
        setSaveProgress(0); // 저장 진행 상태 초기화
        setUploadComplete(false); // 업로드 완료 상태 초기화
    };

    // UUID의 앞 4자리 알파벳과 숫자만 남기는 함수
    function getFormattedUUID() {
        const uuid = uuidv4(); // UUID 전체 생성
        const alphanumericUUID = uuid.replace(/[^a-zA-Z0-9]/g, ''); // 알파벳과 숫자가 아닌 문자 제거
        return alphanumericUUID.slice(0, 4); // 앞 4자리 추출
    }

  
    // 파일 업로드 처리 함수
    const handleUpload = async () => {
        if (files.length === 0) {
            alert('파일을 먼저 선택하세요.');
            return;
        }

        // 업로드 시점에 UUID 생성 및 서버에 전송
        const newUuid =  getFormattedUUID(); //uuidv4(); // 새로운 UUID 생성
        console.log(newUuid);
        setUuid(newUuid); // UUID 상태 업데이트
        socket.emit('sendUuid', newUuid, (response) => {
            if (response === 'UUID received') {
                files.forEach((file) => {
                    const formData = new FormData();
                    formData.append('file', file); // Add file to formData
                    formData.append('uuid', newUuid); // Add UUID to formData
    
                    axios.post(`http://localhost:5000/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent) => {
                            // Update file upload progress, limited to 90%
                            const percentCompleted = Math.min(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total),
                                90
                            );
                            setUploadProgress(percentCompleted); // Update upload progress
                        },
                    })
                    .then(() => {
                        // After reaching 90% upload progress, mark upload as complete
                        console.log(`파일 업로드 완료: ${file.name}`);
                        setUploadComplete(true); // Update upload completion status
                        setSaveProgress(100); // Initialize save progress to 100%
                        setUploadProgress(100);
                    })
                    .catch((error) => {
                        console.error(`파일 업로드 실패: ${file.name}, 오류:`, error);
                    });
                });
            }
        });
    };

    return (
        <div>
            <h1>파일 업로드 및 진행률 표시</h1>
            <input type="file" onChange={handleFileChange} multiple /> {/* 다중 파일 선택 */}
            <button onClick={handleUpload}>파일 업로드</button> {/* 업로드 버튼 */}

            <div>
                <h2>업로드 진행 상태: {uploadProgress}%</h2>
                <div style={{ width: '100%', backgroundColor: '#eee', marginBottom: '10px' }}>
                    <div
                        style={{
                            width: `${uploadProgress}%`,
                            height: '20px',
                            backgroundColor: 'blue',
                        }}
                    />
                </div>

                {/* 업로드 완료 후 HDD 저장 진행 상태 표시 */}
                {uploadComplete && (
                    <>
                        <h2>HDD 저장 진행 상태: {saveProgress}%</h2>
                        <div style={{ width: '100%', backgroundColor: '#eee' }}>
                            <div
                                style={{
                                    width: `${saveProgress}%`,
                                    height: '20px',
                                    backgroundColor: 'green',
                                }}
                            />
                        </div>
                    </>
                )}

                {/* 모든 작업 완료 시 메시지 표시 */}
                {uploadComplete && saveProgress === 100 && <p>파일 업로드 및 저장 완료!</p>}
            </div>
        </div>
    );
};

export default App;