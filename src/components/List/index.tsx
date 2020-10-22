import React, { useEffect, useRef, useState } from 'react';
import { PaginationBar } from '../PagingnationBar';
import { Search } from '../Search';
import { ITEM_PER_PAGE, RANGE_PAGE_SHOW, SEARCH_FOLLOW_FIELD, SEARCH_PLACE_HOLDER } from '../config';
import { TAnyObject, PickKeyWithType } from '../type';
import { ListProps } from './type';

/**
 * Add paging and search for any list (```array object```)
 * 
 * If you just want searching (use component ```Search```)
 * 
 * If you  just want paging (use component ```PaginationBar```)
 *
 * @example
 * ```ts
 * <List
      data={orignalList}
      child={({ title }) => (<div>{title}</div>)}
    />
  ```
 */
export const List = <T extends TAnyObject>(props: ListProps<T>): JSX.Element => {
  const {
    items,
    child,
    perPage = ITEM_PER_PAGE,
    rangePage = RANGE_PAGE_SHOW,
    hiddenSearch,
    field = SEARCH_FOLLOW_FIELD as PickKeyWithType<T, string>,
    listClass,
    paginationBarClass,
    wrapperSearchClass,
    wrapperComponent,
    mgsSearchNotFound,
    onSearch,
    onPaging,
    searchPlaceholder = SEARCH_PLACE_HOLDER,
  } = props;

  const [searchList, setSearchList] = useState<T[]>([]);
  const [pagedList, setPagedList] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const pageWhenNotSearch = useRef(1);
  const pageWhenSearch = useRef(1);

  const list = searchList.length ? searchList : items;
  const currentPage = isSearching ? pageWhenSearch.current : pageWhenNotSearch.current;

  useEffect(() => {
    !isSearching && setPagedList(items.slice((currentPage - 1) * perPage, currentPage * perPage));
  }, [items, perPage, currentPage]);

  const listDisplay = () => {
    const items = listClass ? <div className={listClass}>{pagedList.map(child)}</div> : pagedList.map(child);
    let listComponents = pagedList.length ? items : <div>{mgsSearchNotFound}</div>;
    if (wrapperComponent) listComponents = wrapperComponent(listComponents);
    return listComponents;
  };

  return (
    <>
      {!hiddenSearch ? (
        <div className={wrapperSearchClass}>
          <Search
            items={items}
            field={field}
            searchPlaceholder={searchPlaceholder}
            onChange={(results, searchVal) => {
              if (searchVal) pageWhenSearch.current = 1;
              setPagedList(results.slice((currentPage - 1) * perPage, currentPage * perPage));
              setSearchList(results);
              setIsSearching(!!searchVal);
              onSearch && onSearch(results, searchVal);
            }}
          />
        </div>
      ) : null}
      {listDisplay()}
      {isSearching && searchList.length === 0 ? null : (
        <div className={paginationBarClass || ''}>
          <PaginationBar
            items={list}
            onChange={(results, currPage) => {
              setPagedList(results);
              if (!isSearching) pageWhenNotSearch.current = currPage;
              else pageWhenSearch.current = currPage;
              onPaging && onPaging(results, currPage);
            }}
            perPage={perPage}
            rangePage={rangePage}
            activePageProp={currentPage}
          />
        </div>
      )}
    </>
  );
};
