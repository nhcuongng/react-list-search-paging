import FlexSearch from 'flexsearch';
import React, { useState } from 'react';
import { PickKeyWithType, TSearchRequired } from 'src/type'

type TProp<T> = {
  list: T[];
  onChange: (list: T[]) => void;
  field: PickKeyWithType<T, string> | string,
}

export const Search = <T extends TSearchRequired>(props: TProp<T>) => {
  const [searchVal, setSearchVal] = useState('');
  const { list, onChange, field = 'title'} = props;
  let listSearched = list;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchval = e.target.value;
    const flexSearch = FlexSearch.create({
      profile: 'speed',
      cache: true,
      rtl: true,
      tokenize: 'reverse', /** search tu phai qua trai */
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
        listSearched = results.map(({ id } : { id: number }) => listSearched[id]);
        onChange(listSearched);
      }
    )
    setSearchVal(e.target.value)
  };

  return (
    <input type='text' value={searchVal} onChange={handleSearch} />
  )
} 