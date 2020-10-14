import React, { useEffect, useRef, useState } from 'react';
import { PaginationBar } from '../PagingBar';
import { Search } from '../Search';
import { ITEM_PER_PAGE, RANGE_PAGE_SHOW, SEARCH_FOLLOW_FIELD } from '../config';
import { PickKeyWithType, ItemInterface } from '../type';

type TChildComponent<T> = (props: Pick<T, keyof T>, index: number) => JSX.Element | React.FC<T> | null;

type TProps<T> = {
  /** component dùng để hiển thị một item trong list */
  child: TChildComponent<T>;
  /** list data truyền vào */
  data: T[];
  /** ẩn thanh search */
  hiddenSearch?: boolean;
  /** Nếu bật chức năng search thì nên điền field sẽ search theo, mặc định là search theo title */
  field?: PickKeyWithType<T, string>;
  /** mỗi page có bao nhiêu item */
  perPage?: number;
  /** Hiển thị số trang ở trên paging */
  rangePage?: number;
  /** class bao ngoài của list */
  listClass?: string;
  /** class bao ngoài ô search */
  wrapperSearchClass?: string;
  /** class bao ngoài paging bar */
  paginationBarClass?: string;
};

/**
 * List truyền vào yêu cầu có thuộc tính là ```title``` (vì sẽ mặc định search theo ```title```)
 *
 * @example
 * ```ts
 * <List
      data={orignalList}
      child={({ title }) => (<div>{title}</div>)}
    />
  ```
 */
export const List = <T extends ItemInterface>(props: TProps<T>) => {
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
  } = props;

  const [searchList, setSearchList] = useState<T[]>([]);
  const [pagedList, setPagedList] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const pageWhenNotSearch = useRef(1);
  const pageWhenSearch = useRef(1);

  const list = searchList.length ? searchList : data;

  useEffect(() => {
    setPagedList(data.slice(0, perPage));
  }, [data, perPage]);

  const items = listClass ? <div className={listClass}>{pagedList.map(child)}</div> : pagedList.map(child);
  const currentPage = isSearching ? pageWhenSearch.current : pageWhenNotSearch.current;

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
            }}
          />
        </div>
      ) : null}
      {pagedList.length ? items : <>Not found any results</>}
      {isSearching && searchList.length === 0 ? null : (
        <div className={paginationBarClass || ''}>
          <PaginationBar
            items={list}
            onChange={(results, currPage) => {
              setPagedList(results);
              console.log(currPage);
              if (!isSearching) pageWhenNotSearch.current = currPage;
              else pageWhenSearch.current = currPage;
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
