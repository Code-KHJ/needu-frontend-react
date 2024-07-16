import React, { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [pagesPerGroup, setPagesPerGroup] = useState(10);
  useEffect(() => {
    const updatePagesPerGroup = () => {
      if (window.innerWidth < 768) {
        setPagesPerGroup(4);
      } else {
        setPagesPerGroup(10);
      }
    };
    updatePagesPerGroup();
    window.addEventListener('resize', updatePagesPerGroup);
    return () => {
      window.addEventListener('resize', updatePagesPerGroup);
    };
  }, []);

  if (totalPages === undefined || totalPages === 0) {
    return <div style={{ width: '100%' }}>검색 결과가 없습니다.</div>;
  }

  const startPage =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const isFirstGroup = startPage === 1;
  const isLastGroup = endPage === totalPages;

  const handlePreviousGroup = () => {
    if (!isFirstGroup) {
      onPageChange(startPage - pagesPerGroup);
    }
  };
  const handleNextGroup = () => {
    if (!isLastGroup) {
      onPageChange(startPage + pagesPerGroup);
    }
  };

  return (
    <>
      {!isFirstGroup && (
        <div onClick={handlePreviousGroup}>
          <img
            src="/src/assets/images/arrow_right.png"
            style={{
              width: '7px',
              height: '14px',
              transform: 'rotate(180deg)',
            }}
            alt="left"
          />
        </div>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <div
          style={
            currentPage === startPage + index
              ? {
                  border: '1px solid #aaa',
                  borderRadius: '5px',
                  color: '#222',
                  backgroundColor: '#fff',
                }
              : {}
          }
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </div>
      ))}
      {!isLastGroup && (
        <div onClick={handleNextGroup}>
          <img
            src="/src/assets/images/arrow_right.png"
            style={{
              width: '7px',
              height: '14px',
            }}
            alt="right"
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
