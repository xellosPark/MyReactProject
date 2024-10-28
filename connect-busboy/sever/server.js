const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const busboy = require("connect-busboy");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});

const uploadDirectory = "D:\\uploads";
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(busboy());
app.use(express.json());

// Handle file upload with progress tracking
app.post("/upload", (req, res) => {
    req.pipe(req.busboy);

    req.busboy.on("file", (fieldname, file, { filename }) => {
        const savePath = path.join(uploadDirectory, filename);
        const writeStream = fs.createWriteStream(savePath);

        let uploadedSize = 0;
        const totalSize = parseInt(req.headers["content-length"], 10);

        file.on("data", (data) => {
            uploadedSize += data.length;
            const progress = Math.round((uploadedSize / totalSize) * 100);
            io.emit("uploadProgress", { progress, uploadedSize, totalSize });
            console.log(`Uploaded ${uploadedSize} of ${totalSize} bytes (${progress}%)`);
        });

        file.pipe(writeStream);

        file.on("end", () => {
            console.log(`File ${filename} uploaded successfully`);
            io.emit("uploadProgress", { progress: 100, uploadedSize, totalSize });
            res.status(200).send({ message: "File uploaded successfully!" });
        });

        writeStream.on("error", (err) => {
            console.error("File write error:", err);
            io.emit("uploadError", "File upload failed.");
            res.status(500).send("File upload failed");
        });
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});