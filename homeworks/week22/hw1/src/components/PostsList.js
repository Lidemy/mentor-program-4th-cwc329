import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../WebAPI';
import { timeStampConvert } from '../utils';
import Pagination from '../components/Pagination';

const StyledPostsList = styled.div`
  width: 900px;
  margin: 0 auto;
`

const StyledPostCard = styled.div`
  border: 1.5px solid black;
  border-radius: 4px;
  padding: 0 10px;

  & ~ & {
    margin-top: 5px;
  }
`

const PostTitleLink = styled(Link)`
  text-decoration: none;
  color: blue;
`

export default function PostsList({ page }) {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalpages] = useState();
  
  useEffect(() => {
    const querystrings = {
      page,
      sort: 'createdAt',
      order: 'desc',
      limit: 5
    }
    getPosts({ querystrings })
      .then(res => {
        setTotalpages(Math.ceil(Number(res.headers.get('X-Total-Count')) / 5));
        return res.json()
      })
      .then(json => {
        setPosts(json);
      })
  }, [page]);

  return (
    <StyledPostsList>
      {posts.map(post => {
        return (
          <StyledPostCard key={post.id}>
            <h1><PostTitleLink to={`posts/${post.id}`}>{post.title}</PostTitleLink></h1>
            <h4>{timeStampConvert(post.createdAt)}</h4>
          </StyledPostCard>
        )
      })}
      <Pagination currentPage={page} totalPages={totalPages} />
    </StyledPostsList>
  )
}