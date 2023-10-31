
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";
import Icon from "@mui/material/Icon";


const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage }) => {
  // Calculating max number of pages
  const noOfPages = Math.ceil(totalRows / rowsPerPage);

  // Creating an array with length equal to no.of pages
  const pagesArr = [...new Array(noOfPages)];

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState(1);

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Onclick handlers for the butons
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo) => setCurrentPage(pageNo);

  // Disable previous and next buttons in the first and last page
  // respectively
  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  // To set the starting index of the page
  useEffect(() => {
    const skipFactor = (currentPage - 1) * rowsPerPage;
    // Some APIs require skip for paginaiton. If needed use that instead
    // pageChangeHandler(skipFactor);
    pageChangeHandler(currentPage);
  }, [currentPage]);

  return (
    <> 
      {noOfPages > 1 ? (
        <div className={styles.pagination}>
          {/*<div className={styles.pagebuttons}>
            <button
              className={styles.pageBtn}
              onClick={onPrevPage}
              disabled={!canGoBack}
            >
              &#8249;
            </button>
            {pagesArr.map((num, index) => (
              <button
                onClick={() => onPageSelect(index + 1)}
                className={`${styles.pageBtn}  ${
                  index + 1 === currentPage ? styles.activeBtn : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={onNextPage}
              disabled={!canGoNext}
            >
              &#8250;
            </button>
              </div>*/}
          <MDBox
        display="flex"
        sx={{ padding : "10px", mb : '40px',  justifyContent : 'end'}}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        // p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
      <MDTypography variant="p" color="grey" sx={{ mr : '40px', fontSize : '15px'}}>
       Total records : {totalRows}
      </MDTypography>
        {(
          <MDPagination
            variant={"gradient"}
            color={"info"}
          >
            {(
              <MDPagination item 
              onClick={() => onPrevPage()}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {noOfPages > 1 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: noOfPages }}
                  value={currentPage}
                  // onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              // renderPagination
              <>
                
              {pagesArr.map((num, index) => (
                <MDPagination
                item
                // key={option}
                onClick={() => onPageSelect(index + 1)}
                // active={pageIndex === option}
              >
                {index + 1}
              </MDPagination>
              ))}
            </>
            )}
            {(
              <MDPagination item 
              onClick={() => onNextPage()}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;