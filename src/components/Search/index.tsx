import FlexSearch from 'flexsearch';
import React, { useState, useEffect } from 'react';
import { TAnyObject } from '../type';
import { SearchProp } from './type';

/**
 * Componet use to search, return result after searched
 *
 * @example
 *
 * ```ts
 * const [list, setList] = useState(originalList);
 *
 * <Search
 *  items={list}
 *  onChange={setList}
 * />
 * ```
 */
export const Search = <T extends TAnyObject>(props: SearchProp<T>): JSX.Element => {
  const [searchVal, setSearchVal] = useState('');
  const { items, field = 'title', onChange, searchPlaceholder } = props;

  const handleSearch = (searchVal: string) => {
    setSearchVal(searchVal);

    if (!searchVal) {
      onChange(items, searchVal);
      return;
    }

    const flexSearch = FlexSearch.create({
      profile: 'speed',
      cache: true,
      doc: {
        id: 'id',
        field,
      },
    });
    flexSearch.add(items.map(({ [field]: fieldName }, index) => ({ id: index, [field]: fieldName })));
    flexSearch.search(
      {
        query: searchVal,
        field: [field as string],
      },
      (results: any) => {
        const listSearched = results.map(({ id }: { id: number }) => items[id]);
        onChange(listSearched, searchVal);
        return;
      },
    );
  };

  useEffect(() => {
    searchVal && handleSearch(searchVal);
  }, [items, searchVal]);

  return <input placeholder={searchPlaceholder} type='text' value={searchVal} onChange={e => handleSearch(e.target.value)} />;
};
