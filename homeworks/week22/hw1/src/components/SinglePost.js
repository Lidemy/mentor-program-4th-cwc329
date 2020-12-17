import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../WebAPI';
import { timeStampConvert } from '../utils';

const StyledPostCard = styled.div`
  width: 900px;
  margin: 0 auto;
  border: 1.5px solid black;
  border-radius: 4px;
  padding: 0 10px;
`
export default function SinglePost() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getPosts({ id })
      .then(response => response.json())
      .then(data => { setPost(data) });
  }, [])
  return (
    <StyledPostCard>
      <h1>{post.title}</h1>
      <h4>{post.createdAt && timeStampConvert(post.createdAt)}</h4>
      <p>{post.body}</p>
    </StyledPostCard>
  )
}