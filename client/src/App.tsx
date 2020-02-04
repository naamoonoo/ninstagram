import React from "react";

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="/api/auth/google"
					target="_blank"
					rel="noopener noreferrer"
				>
					google login
				</a>
				<a
					className="App-link"
					href="/api/auth/facebook"
					target="_blank"
					rel="noopener noreferrer"
				>
					facebook login
				</a>
			</header>
		</div>
	);
};

export default App;
