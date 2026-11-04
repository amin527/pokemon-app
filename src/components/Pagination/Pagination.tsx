import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";
import { useThemeStore } from "../../stores/useThemeStore";
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
  const theme = useThemeStore((store) => store.theme);
  const isFirstPage = currentPage == 1;
  const isLastPage = currentPage == totalPages;

  return (
    <nav
      className={`pagination ${theme == "light" ? "" : "pagination--dark"}`}
      data-testid="pagination"
      aria-label="Pagination"
    >
      <ButtonWithIcon
        data-testid="pagination-button-previous"
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        icon={<ChevronLeft aria-hidden="true" />}
        handleClick={onPrevious}
        className={`button-with-icon-nav ${isFirstPage ? "button-with-icon-gray" : ""}`}
      />
      <span className="pagination__text" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
      <ButtonWithIcon
        data-testid="pagination-button-next"
        aria-label="Next page"
        aria-disabled={isLastPage}
        icon={<ChevronRight aria-hidden="true" />}
        handleClick={onNext}
        className={`button-with-icon-nav ${isLastPage ? "button-with-icon-gray" : ""}`}
      />
    </nav>
  );
}
export default Pagination;
