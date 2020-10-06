import React, { useEffect, useRef, useState } from 'react';
import { TSearchRequired } from 'src/type';
import { PagingBar } from '../PagingBar';

interface IProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  perPage?: number; 
}

export const List = <T extends TSearchRequired>(props: IProps<T>) => {
  const { items, renderItem, perPage = 3 } = props;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);

  const genlist = (function () {
    const temp: number[] = [];
    const totalPages = Math.ceil(items.length / perPage);
    for (let index = 0; index < totalPages; index++) {
      temp.push(index + 1)
    }
    return temp
  }())

  const setPagedList = (currPage: number) => {
    setStart((currPage - 1) * perPage);
    setEnd(currPage * perPage);
  }

  const _list = items.slice(start, end);

  return (
    <>
      {_list.length ? _list.map(renderItem) : 'Not found!!'}
      {_list.length > 1 && (
        <PagingBar
          key={genlist.length}
          range={5}
          list={genlist}
          onClick={setPagedList}
        />
      )}
    </>
  );
};