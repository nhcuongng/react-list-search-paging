import FlexSearch from 'flexsearch';
import React, { useState, useEffect } from 'react';
import { PickKeyWithType, TSearchRequired } from 'src/type';

type TProp<T> = {
  list: T[];
  field: PickKeyWithType<T, string> | string;
  onChange: (results: T[], searchVal: string) => void;
};

/**
 * Componet use to search, return result after searched
 *
 * @example
 *
 * ```ts
 * const [list, setList] = useState(originalList);
 *
 * <Search
 *  list={list}
 *  onChange={setList}
 * />
 * ```
 */
export const Search = <T extends TSearchRequired>(props: TProp<T>): JSX.Element => {
  const [searchVal, setSearchVal] = useState('');
  const { list, field = 'title', onChange } = props;

  const handleSearch = (searchVal: string) => {
    setSearchVal(searchVal);

    if (!searchVal) {
      onChange(list, searchVal);
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
    flexSearch.add(list.map(({ [field]: fieldName }, index) => ({ id: index, [field]: fieldName })));
    flexSearch.search(
      {
        query: searchVal,
        field: [field as string],
      },
      (results: any) => {
        const listSearched = results.map(({ id }: { id: number }) => list[id]);
        onChange(listSearched, searchVal);
        return;
      },
    );
  };

  useEffect(() => {
    handleSearch(searchVal);
  }, [list, searchVal]);

  return <input type='text' value={searchVal} onChange={e => handleSearch(e.target.value)} />;
};
