
import { List } from './components/List';
import { genListFake, TList } from './data';
import React from 'react';
import { Search } from './components/Search';

type TState = { listDisplay: TList }
type TProps = {}

class App extends React.PureComponent<TProps, TState> {

	constructor(props: TProps) {
		super(props);
		this.state = {
			listDisplay: genListFake
		}
	}

	render() {
		return (
			<div>
				<h1>Hello World!</h1>
					<Search list={genListFake} onChange={(res) => this.setState({ listDisplay: res })} field='title' />
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
								items={this.state.listDisplay}
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