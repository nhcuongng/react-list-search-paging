# React List Paging Search

Component giúp phân trang và search. HOC này sẽ cung cấp cho bạn một thanh search và một thanh paging ở dưới cùng của một list

## Run

```bash
yarn

yarn dev
```

## Cách dùng

```ts
  <List
    items={list}
    child={({ id, title, body }) => (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{body}</td>
      </tr>
    )}
    wrapperComponent={wrapperTable}
  />
```

xem chi tiết example ở [đây](https://github.com/nhcuongng/react-list-search-paging/blob/main/src/App.tsx)

## Props

```ts
export type ListProps<T> = {
  /** Component use to display */
  child: TChildComponent<T>;
  /** original list */
  items: T[];
  /** message show when search not found, pass as a ```component``` or ```string``` */
  mgsSearchNotFound?: React.ReactNode;
  /** Wrapper component will wrap your list */
  wrapperComponent?: (children: React.ReactNode) => JSX.Element;
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
  /** Search place holder */
  searchPlaceholder?: string;
  /** Event on searching */
  onSearch?: (results: T[], searchVal: string) => void;
  /** Event on click on paging bar  */
  onPaging?: (results: T[], currPage: number) => void;
};
```