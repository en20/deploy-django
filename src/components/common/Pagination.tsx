import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface PaginationProps {
  page: number;
  pageSize: number;
  pageCount: number;
  itemsCount: number;
  pageSizeList: number[];
  changePageSize: (size: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}

function Pagination({
  page,
  pageSize,
  pageCount,
  itemsCount,
  pageSizeList,
  changePageSize,
  previousPage,
  nextPage,
}: PaginationProps) {

  const activeArrowStyle =
    "text-primary text-sm cursor-pointer transition-all duration-200 ease-out hover:text-accent";

  return (
    <section className="flex gap-4 items-center">
      <details className="dropdown">
        <summary className="btn btn-sm btn-ghost">Exibir {pageSize}</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
          {pageSizeList.map((size, index) => {
            return (
              <li
                key={`page-${size}-${index}`}
                onClick={() => changePageSize(size)}
              >
                <a>{size}</a>
              </li>
            );
          })}
        </ul>
      </details>
      <span className="h-8 border-r"></span>
      {itemsCount ? (
        <div>
          {`${page * pageSize + 1} - ${
            (page + 1) * pageSize < itemsCount 
              ? (page + 1) * pageSize
              : itemsCount 
          } de ${itemsCount} itens`}
        </div>
      ) : (
        <button className="btn btn-sm btn-square btn-ghost">
          <span className="loading loading-spinner"></span>
        </button>
      )}
      <span className="ml-auto h-8 border-r"></span>
      <div>
        <span>Página {page + 1}</span>
      </div>
      <div className="flex items-center gap-4">
        <button disabled={page === 0} onClick={() => previousPage()}>
          <FaArrowLeft className={page !== 0 ? activeArrowStyle : "text-sm"} />
        </button>
        <button disabled={page === pageCount - 1} onClick={() => nextPage()}>
          <FaArrowRight
            className={page !== pageCount - 1 ? activeArrowStyle : "text-sm"}
          />
        </button>
      </div>
    </section>
  );
}

export default Pagination;
