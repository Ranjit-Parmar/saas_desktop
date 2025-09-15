const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex justify-center">
      <ul className="flex items-center gap-2 text-sm lg:text-base">
        <li>
          <button
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 rounded-md transition ${
                page === currentPage
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-black hover:text-white"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
