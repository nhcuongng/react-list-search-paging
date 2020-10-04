import React, { useState } from 'react';
import { TSearchRequired } from 'src/type';
import { Search } from '../Search';
import { PagingBar } from '../PagingBar';

interface IProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  perPage?: number; 
}

export const List = <T extends TSearchRequired>(props: IProps<T>) => {
  const { items, renderItem, perPage = 3 } = props;
  const [list, setList] = React.useState(props.items.slice(0, perPage));

  const genlist = (function () {
    const temp: number[] = []
    const totalPages = Math.ceil(items.length / perPage);
    for (let index = 0; index < totalPages; index++) {
      temp.push(index + 1)
    }
    return temp
  }())

  const setPagedList = (currPage: number) => {
    const tmp = items.map((_a, index) => index);
    const start = (currPage - 1) * perPage;
    const end = currPage * perPage;
    setList(tmp.slice(start, end).map((p) => items[p]));
  }

  return (
    <>
      {list.map(renderItem)}
      <PagingBar
        range={5}
        list={genlist}
        onClick={setPagedList}
      />
    </>
  );
};