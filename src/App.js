import React, { useState, useEffect } from 'react';
import { formatTime } from './additionalFunctions.js';

function MainTimer(props) {
	useEffect(() => {
		if (props.timerState === 'clean' || props.timerState === 'stop') {
			return;
		}

		let timerId = setTimeout(() => {
			let time = new Date() - props.startTime;
			props.setCalculatedTime( time );
			props.setMainTimer(new Date(props.amountOfCalculatedTime + props.calculatedTime));
		}, 200);

		return function cleanup() {
			clearTimeout(timerId);
		} 
	});

	return (
			<div className="main-timer">{formatTime(props.mainTimer)}</div>
	);
}

function IntervalHistory(props) {
	let intervalHistory = [...props.intervalHistory]
	let intervHist = intervalHistory.map((time) => {
		return <div>{formatTime(new Date(time))}</div>;
	});
	return (
		<div>
			{intervHist}
		</div>
	);
}

function ButtonBlock(props) {
	const setButtonBlock = props.setButtonBlock;
	
	function startHandler() {
		let currentDate = new Date();
		props.setTimerState('start');
		props.setStartTime(currentDate);
		props.setStartLapTime(currentDate);
		props.setButtonBlock("stop");
	}

	function stopHandler() {
		props.setTimerState('stop');
		props.setButtonBlock("restart");
		props.setAmountOfCalculatedTime(props.amountOfCalculatedTime + props.calculatedTime);
	}

	function intervalHandler() {
		let currentDate = new Date()
		let lap = currentDate - props.startLapTime;
		props.setStartLapTime(currentDate);
		props.setIntervalHistory([...props.intervalHistory, lap]);
	}

	function restartHandler() {
		let currentDate = new Date();
		props.setTimerState('start');
		props.setStartTime(currentDate);
		props.setStartLapTime(currentDate);
		props.setButtonBlock("stop");
	}

	function dischargeHandler() {
		props.setButtonBlock("start");
		props.setAmountOfCalculatedTime(0);
		props.setCalculatedTime(0);
		props.setMainTimer(new Date(0));
		props.setIntervalHistory([]);
	}

	switch (props.buttonBlock) {
		case ('stop'):
			return (<div>
				<button className="stop" onClick={ () => stopHandler() }>Стоп</button>
				<button className="interval" onClick={ () => intervalHandler() }>Интервал</button>
			</div>
			);
		case ('restart'):
			return (<div>
				<button className="restart" onClick={ () => restartHandler() }>Рестарт</button>
				<button className="discharge" onClick={ () => dischargeHandler(setButtonBlock) }>Сброс</button>
			</div>);
		case ('start'):
		default:
			return (
				<button className="start" onClick={ () => startHandler() }>Начать</button>
			);
	}
}

function App() {
	const [timerState, setTimerState] = useState('clean');
	const [startTime, setStartTime] = useState(new Date());
	const [startLapTime, setStartLapTime] = useState(new Date());
	const [mainTimer, setMainTimer] = useState(new Date(0));
	const [calculatedTime, setCalculatedTime] = useState(0);
	const [amountOfCalculatedTime, setAmountOfCalculatedTime] = useState(0);
	const [buttonBlock, setButtonBlock] = useState('start');
	const [intervalHistory, setIntervalHistory] = useState([]);

	return (
		<div className="app">
			<MainTimer 
				timerState={timerState}
				setTimerState={setTimerState}
				startTime={startTime} 
				setStartTime={setStartTime} 
				startLapTime={startLapTime}
				setStartLapTime={setStartLapTime}
				mainTimer={mainTimer}
				setMainTimer={setMainTimer}
				calculatedTime={calculatedTime}
				setCalculatedTime={setCalculatedTime}
				amountOfCalculatedTime={amountOfCalculatedTime}
				setAmountOfCalculatedTime={setAmountOfCalculatedTime}
			/>
			<IntervalHistory
				intervalHistory={intervalHistory}
				setIntervalHistory={setIntervalHistory}
			/>
			<ButtonBlock
				buttonBlock={buttonBlock}
				setButtonBlock={setButtonBlock}
				timerState={timerState}
				setTimerState={setTimerState}
				startTime={startTime}
				setStartTime={setStartTime}
				startLapTime={startLapTime}
				setStartLapTime={setStartLapTime}
				mainTimer={mainTimer}
				setMainTimer={setMainTimer}
				calculatedTime={calculatedTime}
				setCalculatedTime={setCalculatedTime}
				amountOfCalculatedTime={amountOfCalculatedTime}
				setAmountOfCalculatedTime={setAmountOfCalculatedTime}
				intervalHistory={intervalHistory}
				setIntervalHistory={setIntervalHistory}
			/>
		</div>	
	);
}

export default App;
