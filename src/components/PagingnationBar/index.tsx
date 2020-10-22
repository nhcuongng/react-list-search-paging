import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styles from './paginations.module.scss';
import { RANGE_PAGE_SHOW } from '../config';
import { TAnyObject } from '../type';
import { PagingProp } from './type';

/**
 *
 * Paging bar
 *
 * ```ts
 * <PaginationBar
 *  items={originalList},
 *  onChange={(pagedList, currentPage) => console.log(pagedList)}
 * />
 * ```
 */
export const PaginationBar = <T extends TAnyObject>(props: PagingProp<T>): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const { items, onChange, perPage = RANGE_PAGE_SHOW, rangePage = 5, activePageProp } = props;

  const handlePaging = useCallback(
    (_currentPage: number) => {
      const pagedList = items.slice((_currentPage - 1) * perPage, _currentPage * perPage);
      return pagedList;
    },
    [items, perPage],
  );

  const handlePageChange = useCallback(
    (value: number) => {
      const pagedList = handlePaging(value);
      setCurrentPage(value);
      onChange(pagedList, value);
    },
    [onChange, handlePaging, items],
  );

  useEffect(() => {
    if (activePageProp) handlePageChange(activePageProp);
    // eslint-disable-next-line
  }, [activePageProp]);

  // eslint-disable-next-line no-bitwise
  const isShowPagination = ~~(items.length / (perPage + 1));

  return (
    <div className={styles.wrapperPagination}>
      {isShowPagination ? (
        <Pagination
          innerClass={styles.pagination}
          activeClass={styles.active}
          activePage={currentPage}
          itemsCountPerPage={perPage}
          totalItemsCount={items.length}
          pageRangeDisplayed={rangePage}
          onChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};
