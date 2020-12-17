import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledPagination = styled.div`
  margin: 10px auto;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledPageIndicator = styled.div`
  margin: 0 auto;
  text-align: center;
`

const PaginationLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: blue;
  min-width: 15px;
  text-align: center;
  & ~ & {
    margin-left: 5px;
  }
  &:hover {
    background: #1111ff;
    color: white;
  }
`

export default function Pagination({ currentPage, totalPages }) {
  let pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    pages.push(i);
  }
  return (
    <StyledPagination>
      {currentPage && totalPages && <StyledPageIndicator>{`${currentPage} / ${totalPages} page`}</StyledPageIndicator>}
      <div>
        {currentPage > 1 ? <PaginationLink to={`/posts?page=${currentPage - 1}`} ><button>上一頁</button></PaginationLink> : ''}
        {pages
          .filter(page => {
            return page > 0 && page <= totalPages;
          })
          .map(page => {
            return (
              <PaginationLink key={page} to={`/posts?page=${page}`}>{page}</PaginationLink>
            )
          })
        }
        {currentPage < totalPages ? <PaginationLink to={`/posts?page=${currentPage + 1}`} ><button>下一頁</button></PaginationLink> : ''}
      </div>
    </StyledPagination>
  )
}