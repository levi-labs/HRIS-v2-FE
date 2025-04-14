// components/Pagination.tsx

import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const DepartmentPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();

  // Logika untuk menentukan halaman yang ditampilkan
  const maxVisiblePages = 3;
  const half = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - half, 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className='mt-4 mx-auto w-1/2 flex justify-between items-center gap-4 lg:p-4'>
      {/* Tombol Previous */}
      {currentPage > 1 && (
        <button
          onClick={() => router.push(`/department?page=${currentPage - 1}`)}
          className='text-black bg-slate-200 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm hover:bg-slate-600 transition-colors duration-200'
        >
          &laquo;
        </button>
      )}

      {/* Tombol Halaman */}
      <div className='flex flex-row justify-center gap-x-2 text-center mx-auto'>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => router.push(`/department?page=${page}`)}
            className={`text-white text-center bg-slate-400 py-2 px-4 rounded-md w-full text-sm hover:bg-slate-600 transition-colors duration-200 ${
              page === currentPage ? 'bg-slate-600' : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Tombol Next */}
      {currentPage < totalPages && (
        <button
          onClick={() => router.push(`/department?page=${currentPage + 1}`)}
          className='text-black bg-slate-200 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm hover:bg-slate-600 transition-colors duration-200'
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default DepartmentPagination;
