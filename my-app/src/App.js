import './App.css';
import {useEffect, useState} from 'react';

function App() {
	const [users, setUsers] = useState([]);
	const [hasLoaded, setHasLoaded] = useState(false);

	const fetchUsers = async () => {
		try {
			const resp = await fetch('http://localhost:3000/users/');
			const data = await resp.json();
			return data.data;
		} catch (e) {
			console.log(e);
			return [];
		}
	};

	useEffect(() => {
		fetchUsers().then((data) => {
			setUsers(data);
			setHasLoaded(true);
		});
	}, []);

	const modifyUsersData = (user) => {
		return (
			<div class="card">
				<div class="container">
					<div>
						<b>UserId &nbsp;</b>: {user.id} <br />
						<b>Name &nbsp;</b>: {user.name} <br />
						<b>Email &nbsp;</b>: {user.email} <br />
						{user?.company?.name ? (
							<>
								<b>Company Name &nbsp;</b>: {user?.company?.name}
								<br />
							</>
						) : null}
						{user?.company?.email ? (
							<>
								<b>Company Company email &nbsp;</b>:{user?.company?.email}
								<br />
							</>
						) : null}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="App">
			{!hasLoaded ? (
				<div>Loading....</div>
			) : (
				<div>
					<h1 style={{textAlign: 'center'}}>All Users</h1>
					{users.map((user) => {
						return <div key={user.id}>{modifyUsersData(user)}</div>;
					})}
				</div>
			)}
		</div>
	);
}

export default App;
