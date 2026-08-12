interface OrdersPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export function OrdersPagination({
    currentPage,
    totalPages,
    onPageChange,
  }: OrdersPaginationProps) {
    if (totalPages <= 1) {
      return null;
    }
  
    return (
      <nav
        className="orders-pagination"
        aria-label="Orders pagination"
      >
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          Previous
        </button>
  
        <span>
          Page {currentPage} of {totalPages}
        </span>
  
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          Next
        </button>
      </nav>
    );
  }