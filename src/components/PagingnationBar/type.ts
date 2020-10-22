export type PagingProp<T> = {
  items: T[];
  onChange: (results: T[], currentPage: number) => void;
  perPage?: number;
  rangePage?: number;
  activePageProp?: number;
};
