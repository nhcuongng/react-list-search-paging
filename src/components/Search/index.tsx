import FlexSearch from 'flexsearch';
import React, { useEffect, useState } from 'react';
import { PickKeyWithType, TSearchRequired } from 'src/type'

type TProp<T> = {
  list: T[];
  field: PickKeyWithType<T, string> | string,
  onChange: (results: T[]) => void,
}

export const Search = <T extends TSearchRequired>(props: TProp<T>) => {
  const [searchVal, setSearchVal] = useState('');
  const { list, field = 'title', onChange } = props;
  const [results, setResults] = useState(list);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchval = e.target.value;
    const flexSearch = FlexSearch.create({
      profile: 'speed',
      cache: true,
      // rtl: true,
      // tokenize: 'reverse', /** search tu phai qua trai */
      doc: {
        id: 'id',
        field,
      },
    });
    flexSearch.add(list.map(({ [field]: fieldName }, index) => ({ id: index, [field]: fieldName })));
    flexSearch.search(
      {
        query: searchval,
        field: [field as string],
      },
      (results: any) => {
        const listSearched = results.map(({ id } : { id: number }) => list[id]);
        setResults(listSearched);
      }
    )
    setSearchVal(e.target.value)
  };

  useEffect(() => {
    if (searchVal) {
      onChange(results);
      return;
    }
    onChange(list);
  }, [searchVal]);

  return (
    <>
      <input type='text' value={searchVal} onChange={handleSearch} />
    </>
  )
} 