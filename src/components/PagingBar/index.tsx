import React, { useEffect } from 'react';
import { TSearchRequired } from 'src/type';
import { Bar } from './Bar';

interface IProps<T> {
  items: T[];
  onChange: (list: T[], currPage: number) => void,
  perPage?: number;
  rangePage?: number;
  activePageProp?: number,
}

export const PaginationBar = <T extends TSearchRequired>(props: IProps<T>) => {
  const { items, perPage = 3, onChange, rangePage = 5, activePageProp } = props;

  const genlist = (function () {
    const temp: number[] = [];
    console.log(items.length)
    const totalPages = Math.ceil(items.length / perPage);
    for (let index = 0; index < totalPages; index++) {
      temp.push(index + 1)
    }
    return temp
  }())

  
  const setPagedList = (currPage: number) => {
    const start = (currPage - 1) * perPage;
    const end = currPage * perPage;
    const _list = items.slice(start, end);
    onChange(_list, currPage)
  }

  useEffect(() => {
    if (activePageProp) setPagedList(activePageProp);
  }, [activePageProp]);
  
  return (
      <Bar
        range={rangePage}
        list={genlist}
        onClick={setPagedList}
        activePageProp={activePageProp}
      />
  );
};