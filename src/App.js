import React, { useState, useEffect } from 'react';
import { formatTime } from './additionalFunctions.js';

function MainTimer() {
	const [timeCounter, setTimeCounter] = useState(new Date());
	const [mainTimer, setMainTimer] = useState(new Date(2020, 0, 1));

	useEffect(() => {
		let timerId = setTimeout(() => {
			setMainTimer(new Date(new Date() - timeCounter))
		}, 100);

		return function cleanup() {
			clearTimeout(timerId);
		} 
	});

	return (
		<div className="App">
			<p>{formatTime(mainTimer)}</p>
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<MainTimer />
		</div>
	);
}

export default App;
