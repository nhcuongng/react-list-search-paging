import React, { useEffect, useRef, useState } from 'react';
import { PaginationBar } from '../PagingBar';
import { Search } from '../Search';
import { ITEM_PER_PAGE, RANGE_PAGE_SHOW, SEARCH_FOLLOW_FIELD } from '../config';
import { PickKeyWithType, ItemInterface } from '../type';

type TChildComponent<T> = (props: Pick<T, keyof T>, index: number) => JSX.Element | React.FC<T> | null;

type TProps<T> = {
  /** Component use to display */
  child: TChildComponent<T>;
  /** original list */
  data: T[];
  /** message show when search not found, pass as a ```component``` or ```string``` */
  mgsSearchNotFound?: string | React.ReactNode;
  /** Wrapper component will wrap your list */
  wrapperComponent?: React.ReactElement<any>;
  /** Hidden search bar */
  hiddenSearch?: boolean;
  /** if ```hiddenSearch = true```, you should fill this is string value (```type safed will your list```), default is ```title``` */
  field?: PickKeyWithType<T, string>;
  /** number of items per page */
  perPage?: number;
  /** Range page in paging bar */
  rangePage?: number;
  /** Class wrap your list */
  listClass?: string;
  /** Class wrap search input */
  wrapperSearchClass?: string;
  /** Class wrap paging bar */
  paginationBarClass?: string;
  /** Event on searching */
  onSearch?: (results: T[], searchVal: string) => void;
  /** Event on click on paging bar  */
  onPaging?: (results: T[], currPage: number) => void;
};

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
export const List = <T extends ItemInterface>(props: TProps<T>): JSX.Element => {
  const {
    data,
    child,
    perPage = ITEM_PER_PAGE,
    rangePage = RANGE_PAGE_SHOW, // paging
    hiddenSearch,
    field = SEARCH_FOLLOW_FIELD as PickKeyWithType<T, string>, // search
    listClass,
    paginationBarClass,
    wrapperSearchClass, // class
    wrapperComponent,
    mgsSearchNotFound,
    onSearch,
    onPaging,
  } = props;

  const [searchList, setSearchList] = useState<T[]>([]);
  const [pagedList, setPagedList] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const pageWhenNotSearch = useRef(1);
  const pageWhenSearch = useRef(1);

  const list = searchList.length ? searchList : data;
  const currentPage = isSearching ? pageWhenSearch.current : pageWhenNotSearch.current;

  useEffect(() => {
    setPagedList(data.slice((currentPage - 1) * perPage, currentPage * perPage));
  }, [data, perPage, currentPage]);

  const listDisplay = () => {
    const items = listClass ? <div className={listClass}>{pagedList.map(child)}</div> : pagedList.map(child);
    let listComponents = pagedList.length ? items : <div>{mgsSearchNotFound}</div>;
    if (wrapperComponent) {
      listComponents = React.cloneElement(wrapperComponent, { children: listComponents });
    }
    return listComponents;
  };

  return (
    <>
      {!hiddenSearch ? (
        <div className={wrapperSearchClass}>
          <Search
            list={data}
            field={field}
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

List.defaultProps = {
  rangePage: RANGE_PAGE_SHOW,
  field: SEARCH_FOLLOW_FIELD,
  perPage: ITEM_PER_PAGE,
  hiddenSearch: false,
};
