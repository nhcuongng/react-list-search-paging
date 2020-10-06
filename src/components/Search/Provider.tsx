import { createContext, useContext } from 'react';

export type TSearch = {
  list: any,
  field: string
}

const SearchContext = createContext<null | TSearch>(null);

export const { Provider, Consumer } = SearchContext;

export const useList = () => {
  let list = useContext(SearchContext);
  if (list === null) {
    throw new Error('You need provide context')
  }
  return list;
}

