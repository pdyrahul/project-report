import styles from '../styles/Pagination.module.scss';
const Pagination = ({ currentPage, totalPapers, papersPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalPapers / papersPerPage);
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages} (Total: {totalPapers})
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;