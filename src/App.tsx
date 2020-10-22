import { List } from './components/List';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const wrapperTable = (children: React.ReactNode) => (
  <table>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
    {children}
  </table>
);

interface IComment {
  id: number;
  title: string;
  body: string;
}

export const App: React.FC = () => {
  const [list, setList] = useState<(IComment & { title: string })[]>([]);

  useEffect(() => {
    axios.get<IComment[]>('https://jsonplaceholder.typicode.com/posts').then(res => setList(res.data));
  }, []);

  const handleAdd = () => {
    axios
      .post<IComment[]>('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
      .then(res => setList(list.concat(res.data)));
  };

  return (
    <>
      <button onClick={handleAdd}>Add post</button>
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
    </>
  );
};
