import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [allPosts, setAllPosts] = useState([]);
    const [titles, setTitles] = useState([]); // 제목을 저장할 새로운 상태
    const [post, setPost] = useState(null); // 검색 결과를 저장할 상태
    const [title, setTitle] = useState(''); // 사용자 입력을 저장할 상태
    const [editTitle, setEditTitle] = useState(''); // 편집할 제목 상태
    const [editBody, setEditBody] = useState(''); // 편집할 본문 상태
    const [editId, setEditId] = useState(null); // 편집할 게시물의 ID

    useEffect(() => {
        axios.get('http://localhost:5055/api/posts')
            .then(response => {
                setAllPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts:', error);
            });
    }, []);

    function fetchAllTitles() {
        axios.get('http://localhost:5055/api/posts/titles')
            .then(response => {
                setTitles(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the titles:', error);
            });
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const fetchPostByTitle = () => {
        axios.post('http://localhost:5055/api/posts/title', { title })
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching the post:', error);
                setPost(null);
            });
    };

    const handleEdit = (id, title, body) => {
        axios.post('http://localhost:5055/api/posts/edit', { id, title, body })
            .then(response => {
                alert('게시물이 편집되었습니다.');
                // Refresh posts list after editing
                fetchAllTitles();
            })
            .catch(error => {
                console.error('편집 중 오류가 발생했습니다:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5055/api/posts/${id}`)
            .then(response => {
                alert('게시물이 삭제되었습니다.');
                // Refresh posts list after deletion
                fetchAllTitles();
            })
            .catch(error => {
                console.error('삭제 중 오류가 발생했습니다:', error);
            });
    };

    return (
        <>
            <div>
                <h1>All Posts</h1>
                <ul>
                    {allPosts.map(post => (
                        <li key={post.id}>
                            <h3>{post.id}</h3>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
                <h2>Titles</h2>
                <button onClick={fetchAllTitles}>Load Titles</button>
                <ul>
                    {titles.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Search Post by Title</h1>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title"
                />
                <button onClick={fetchPostByTitle}>Find Post</button>
                {post && (
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                )}
            </div>
            <div>
                <h1>Posts List</h1>
                
                {allPosts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => {
                            setEditId(post.id);
                            setEditTitle(post.title);
                            setEditBody(post.body);
                        }}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))}
                {editId && (
                    <div>
                        <h2>Edit Post</h2>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            placeholder="Content"
                        />
                        <button onClick={() => handleEdit(editId, editTitle, editBody)}>Save</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;