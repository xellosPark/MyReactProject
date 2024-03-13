import React, { useState } from 'react';
import Table from './Table';
import Pagination from './Pagination';

// 가정: postData는 제공된 포스트 객체 배열입니다.
import postData from './posts.json';

const BulletinBoard = () => {
  const [posts, setPosts] = useState(postData); // 포스트 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [postsPerPage] = useState(5); // 페이지 당 포스트 수

  // 현재 표시할 포스트 계산
  const indexOfLastPost  = currentPage * postsPerPage; // 현재 페이지의 마지막 포스트 인덱스
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 현재 페이지의 첫 포스트 인덱스
  const currentPosts     = posts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지의 포스트 슬라이스

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // 페이지 번호를 받아 현재 페이지 상태를 업데이트

  return (
    <div className='container mt-5'>
      <Table posts={currentPosts} /> {/* 테이블 컴포넌트에 현재 페이지의 포스트를 전달 */}
      <Pagination
        postsPerPage={postsPerPage} // 페이지 당 포스트 수
        totalPosts={posts.length} // 전체 포스트 수
        paginate={paginate} // 페이지 번호를 변경하는 함수
        currentPage={currentPage} // 현재 페이지 번호
      />
    </div>
  );
};

export default BulletinBoard;