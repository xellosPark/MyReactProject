const { log } = require('console');
const fs = require('fs');
const path = require('path');

// 데이터 파일 경로 __dirname (현재 파일의 디렉토리 경로)
const dataFilePath = path.join(__dirname, '..', 'data', 'posts.json');

// posts 데이터를 가져오는 함수
const getPosts = (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file', err);
            res.status(500).send('Error reading the file');
            return;
        }
        res.status(200).json(JSON.parse(data));
        console.error('성공');
    });
};

// 새로운 함수: title을 기준으로 post 검색
const getPostByTitle = (req, res) => {
    const { title } = req.body; // 클라이언트 요청 본문에서 title 추출
    console.log(title);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        
        if (err) {
            console.log('Error reading the file', err);
            res.status(500).send('Error reading the file');
            return;
        }
        const posts = JSON.parse(data);
        const post = posts.find(post => post.title === title);
        
        if (!post) {
            console.log('Post not found');
            return res.status(404).send('Post not found');
            
        }
        console.log('성공', post);
        res.status(200).json(post);
    });
};

// 모든 제목을 가져오는 함수
const getAllTitles = (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file', err);
            res.status(500).send('Error reading the file');
            return;
        }
        const posts = JSON.parse(data);
        const titles = posts.map(post => post.title); // 모든 게시물의 title 추출
        console.log('성공', titles);
        res.status(200).json(titles);
        
    });
};

// 게시물 편집 함수
const editPost = (req, res) => {
    const { id, title, body } = req.body;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file', err);
            return res.status(500).send('Error reading the file');
        }
        const posts = JSON.parse(data);
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return res.status(404).send('Post not found');
        }
        posts[postIndex] = { id, title, body }; // 게시물 업데이트
        fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error('Error writing the file', err);
                return res.status(500).send('Error writing the file');
            }
            res.status(200).send('Post updated successfully');
        });
    });
};

// 게시물 삭제 함수
const deletePost = (req, res) => {
    const { id } = req.params; // URL 파라미터에서 id 추출
    console.log(req);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file', err);
            return res.status(500).send('Error reading the file');
        }
        let posts = JSON.parse(data);
        const postIndex = posts.findIndex(post => post.id == id); // == 사용하여 문자열/숫자 비교
        if (postIndex === -1) {
            return res.status(404).send('Post not found');
        }
        posts = posts.filter(post => post.id != id); // 해당 id의 게시물 제거
        fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error('Error writing the file', err);
                return res.status(500).send('Error writing the file');
            }
            res.status(200).send('Post deleted successfully');
        });
    });
};

module.exports = {
    getPosts,
    getPostByTitle,
    getAllTitles,
    editPost,
    deletePost
};