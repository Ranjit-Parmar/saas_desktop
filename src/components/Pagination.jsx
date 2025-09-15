// Pagination component to navigate between pages
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Generate an array of page numbers [1, 2, 3, ... totalPages]
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex justify-center">
      <ul className="flex items-center gap-2 text-sm lg:text-base">
        {/* Previous page button */}
        <li>
          <button
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)} // go to previous page
            disabled={currentPage === 1} // disable if on first page
          >
            Prev
          </button>
        </li>

        {/* Page number buttons */}
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 rounded-md transition ${
                page === currentPage
                  ? "bg-black text-white" // highlight current page
                  : "bg-gray-100 hover:bg-black hover:text-white" // normal page style
              }`}
              onClick={() => onPageChange(page)} // go to selected page
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next page button */}
        <li>
          <button
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)} // go to next page
            disabled={currentPage === totalPages} // disable if on last page
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
