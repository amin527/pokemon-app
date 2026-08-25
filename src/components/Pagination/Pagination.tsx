import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";
import { useContext } from "react";
import { ThemeContext } from "../../App";

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

  const { theme } = useContext(ThemeContext)
  return (
    <div className={`pagination ${theme == "light" ? "" : "dark"}`}>
      <button
        className={`pagination__button ${theme == "light" ? "" : "dark"} pagination__button--previous`}
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
        className={`pagination__button ${theme == "light" ? "" : "dark"} pagination__button--next`}
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
