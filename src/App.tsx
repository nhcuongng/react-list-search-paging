
import { List } from './components/List';
import { genListFake } from './data';
import React from 'react';

class App extends React.PureComponent {
	render() {
		return (
			<div>
				<h1>Hello World!</h1>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						<List
							items={genListFake}
							perPage={5}
							renderItem={(_item) => (
								<tr key={_item.id}>
									<td>{_item.id}</td>
									<td>{_item.name}</td>
									<td>{_item.role}</td>
								</tr>
							)}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;