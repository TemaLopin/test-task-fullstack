const Pagination = ({
  pages,
  currentPage,
  setCurrentPage,
}: {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pages: number
}) => {
  const start = currentPage - 1 > 0 ? currentPage - 1 : 0
  const end = currentPage + 2 > pages ? pages : currentPage + 2

  const pagination = new Array(pages || 0).fill(0).map((_, page) => page)

  return (
    <div className='pagination'>
      {pagination.slice(start, end).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'selected-page' : ''}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
