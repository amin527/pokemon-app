import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--previous"
        onClick={onPrevious}
        aria-label="Previous page"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="pagination__icon pagination__icon--previous" />
      </button>

      <span className="pagination__text">
        {currentPage} of {totalPages}
      </span>

      <button
        className="pagination__button pagination__button--next"
        onClick={onNext}
        aria-label="Next page"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="pagination__icon pagination__icon--next" />
      </button>
    </div>
  );
}
export default Pagination;
