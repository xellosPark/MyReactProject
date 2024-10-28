const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000'], // Allow React client
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const PORT = 5000;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());

// 루트 경로에 대한 간단한 응답 추가
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

io.on('connection', (socket) => {
    console.log('A client connected');
    
    socket.on('sendUuid', (uuid) => {
        console.log(`Received UUID: ${uuid}`);
        io.emit('uuidReceived', uuid);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});