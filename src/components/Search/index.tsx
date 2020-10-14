import FlexSearch from 'flexsearch';
import React, { useState } from 'react';
import { PickKeyWithType, TSearchRequired } from 'src/type';

type TProp<T> = {
  list: T[];
  field: PickKeyWithType<T, string> | string;
  onChange: (results: T[], searchVal: string) => void;
};

export const Search = <T extends TSearchRequired>(props: TProp<T>) => {
  const [searchVal, setSearchVal] = useState('');
  const { list, field = 'title', onChange } = props;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    if (searchVal) {
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
        },
      );
      return;
    }
    onChange(list, searchVal);
  };

  return <input type='text' value={searchVal} onChange={handleSearch} />;
};
