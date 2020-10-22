import React, { useEffect, useRef, useState } from 'react';
import { ITEM_PER_PAGE } from '../config';
import { Item } from './Item';
import styles from './paging.module.scss';

type TProp = {
  list: number[];
  onClick: (currPage: number) => void;
  range?: number;
  activePageProp?: number;
  perPage?: number;
};

export const Bar: React.FC<TProp> = props => {
  const { range, list, onClick, activePageProp, perPage = ITEM_PER_PAGE } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [arrRange, setArrRange] = useState(list.slice(0, range));

  const isFisrtRender = useRef(true);

  useEffect(() => {
    const tmp = [...arrRange];
    if (currentPage === arrRange[arrRange.length - 1] && currentPage !== list[list.length - 1]) {
      tmp.shift();
      tmp.push(list[currentPage]);
    } else if (currentPage === arrRange[0] && currentPage !== list[0]) {
      tmp.pop();
      tmp.unshift(list[currentPage - 2]);
    }
    setArrRange(tmp);
    onClick(currentPage);
  }, [currentPage]);

  // BUG: Moi khi list thay doi, range lai bi set ve mang dau
  useEffect(() => setArrRange(list.slice(0, range)), [list.length]);

  useEffect(() => {
    if (activePageProp) setCurrentPage(activePageProp);
  }, [activePageProp]);

  const start = () => {
    setArrRange(list.slice(0, range));
    setCurrentPage(1);
  };

  const end = () => {
    setArrRange(list.slice(Number(`-${range}`)));
    setCurrentPage(list[list.length - 1]);
  };

  return (
    <ul className={styles.pagingBar}>
      {arrRange[0] !== list[0] && arrRange[0] < list.length ? <Item content='<' onClick={start} /> : null}
      {arrRange.map((page, index) => (
        <Item
          key={index}
          className={currentPage === page ? styles.active : ''}
          content={String(page)}
          onClick={_page => setCurrentPage(Number(page))}
        />
      ))}
      {arrRange[arrRange.length - 1] < list[list.length - 1] ? <Item content='>' onClick={end} /> : null}
    </ul>
  );
};
