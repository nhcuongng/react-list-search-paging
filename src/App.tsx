
import { List } from './components/List';
import { orignalList } from './data';
import React from 'react';

export const App: React.FC = () => (
	<List
		data={orignalList}
		child={({ title }) => <>{title}</>}
	/>
)
