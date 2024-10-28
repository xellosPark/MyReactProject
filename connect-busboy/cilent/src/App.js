import React, { useState } from "react";
import axios from "axios";
import { Button, Progress, Upload, message } from "antd";

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setProgress(0); // Reset progress bar
        return false; // Prevent auto upload
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            message.error("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Cache-Control": "no-cache", // Disable cache
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setProgress(percentCompleted); // Update progress state
                },
            });
            message.success("File uploaded successfully.");
        } catch (error) {
            console.error("Upload failed:", error);
            message.error("An error occurred during upload.");
        }
    };

    return (
        <div style={{ width: "50%", margin: "auto", paddingTop: "20px" }}>
            <Upload
                beforeUpload={handleFileSelect}
                showUploadList={{ showRemoveIcon: false }}
            >
                <Button>Select File</Button>
            </Upload>
            {selectedFile && <p>{selectedFile.name}</p>}
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!selectedFile}
                style={{ marginTop: "10px" }}
            >
                Upload File
            </Button>
            <Progress percent={progress} status="active" style={{ marginTop: "10px" }} />
        </div>
    );
};

export default App;