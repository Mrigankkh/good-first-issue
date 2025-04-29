// components/Pagination.tsx

import { PaginationProps } from "@/types/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onPageChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-3 mt-6 text-gray-800">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:text-gray-400"
    >
      Previous
    </button>
  
    <div className="flex items-center space-x-2 text-sm">
      <span>Page</span>
      <input
        type="number"
        value={currentPage}
        onChange={handleInputChange}
        className="w-16 px-2 py-1 border rounded text-center text-gray-800"
        min={1}
        max={totalPages}
      />
      <span>of {totalPages}</span>
    </div>
  
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:text-gray-400"
    >
      Next
    </button>
  </div>
  
  );
}
