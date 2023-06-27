"use client";

export const renderPageLinks = (currentPage, lastPage, handlePageClick) => {
  const pageLinks = [];
  const pageRange = 2;
  const totalPages = lastPage;

  let rangeStartPage = Math.max(currentPage - pageRange, 1);
  let rangeEndPage = Math.min(currentPage + pageRange, totalPages);

  // primera pagina y ... if needed
  if (rangeStartPage > 1) {
    pageLinks.push(
      <a key={1} href="#" onClick={() => handlePageClick(1)}>
        1
      </a>
    );
    if (rangeStartPage > 2) {
      pageLinks.push(<span key="ellipsis-start">... </span>);
    }
  }

  // desde el inicio del rango hasta la actual
  for (let i = rangeStartPage; i < currentPage; i++) {
    pageLinks.push(
      <a key={i} href="#" onClick={() => handlePageClick(i)}>
        {i}
      </a>
    );
  }

  // pagina actual
  pageLinks.push(
    <a key={currentPage} href="#" onClick={() => handlePageClick(currentPage)} className="active">
      {currentPage}
    </a>
  );

  // desde la actual hasta el fin del rango
  for (let i = currentPage + 1; i <= rangeEndPage; i++) {
    pageLinks.push(
      <a key={i} href="#" onClick={() => handlePageClick(i)}>
        {i}
      </a>
    );
  }

  // ultima pagina y ... if needed
  if (rangeEndPage < totalPages) {
    if (rangeEndPage < totalPages - 1) {
      pageLinks.push(<span key="ellipsis-end">...</span>);
    }
    pageLinks.push(
      <a key={totalPages} href="#" onClick={() => handlePageClick(totalPages)}>
        {totalPages}
      </a>
    );
  }

  return pageLinks;
};