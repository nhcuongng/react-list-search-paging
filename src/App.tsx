import { List } from './components/List';
import { orignalList } from './data';
import React, { useState } from 'react';

export const App: React.FC = () => {
  const [list, setList] = useState(orignalList);

  const handleAdd = () => {
    const _id = list.length - 1;
    const temp = list.concat({
      _id,
      title: `Image ${_id}`,
      url: `url ${_id}`,
    });
    setList(temp);
  };

  return (
    <>
      <button onClick={handleAdd}>Add more item</button>
      <List data={list} child={({ title }) => <>{title}</>} />
    </>
  );
};
