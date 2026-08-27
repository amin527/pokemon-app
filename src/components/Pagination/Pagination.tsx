import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";

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
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`pagination ${theme == "light" ? "" : "pagination--dark"}`}
      data-testid="pagination"
    >
      {/* <button
        data-testid="pagination-button-previous"
        className={`pagination__button ${theme == "light" ? "" : "pagination__button--dark"} pagination__button--previous`}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="pagination__icon pagination__icon--previous" />
      </button> */}

      <ButtonWithIcon 
        icon={<ChevronLeft className="pagination__icon pagination__icon--previous" />}
        handleClick={onPrevious}
        className={currentPage == 1 ? "button-with-icon-gray" : ""}
      />

      <span className="pagination__text">
        {currentPage} of {totalPages}
      </span>

      {/* <button
        data-testid="pagination-button-next"
        className={`pagination__button ${theme == "light" ? "" : "pagination__button--dark"} pagination__button--next`}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="pagination__icon pagination__icon--next" />
      </button> */}
      <ButtonWithIcon 
        icon={<ChevronRight className="pagination__icon pagination__icon--next" />}
        handleClick={onNext}
        className={currentPage == 10 ? "button-with-icon-gray" : ""}
      />
    </div>
  );
}
export default Pagination;
