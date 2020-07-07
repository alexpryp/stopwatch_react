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
	let intervHist = intervalHistory.map((time, index) => {
		let ind = index + 1;
		if(ind < 10) {
			ind = '0' + ind;
		}
		return <div key={ind.toString()}><span>{ind}</span> | <span>{formatTime(time[0])}</span> | <span>{formatTime(new Date(time[1]))}</span></div>;
	});
	return (
		<div class="interval-history">
			{intervHist}
		</div>
	);
}

function ButtonBlock(props) {
	const setButtonBlock = props.setButtonBlock;
	
	function startHandler() {
		props.setTimerState('start');
		props.setStartTime(new Date());
		props.setStartLapTime(props.mainTimer);
		props.setButtonBlock("stop");
	}

	function stopHandler() {
		props.setTimerState('stop');
		props.setButtonBlock("restart");
		props.setAmountOfCalculatedTime(props.amountOfCalculatedTime + props.calculatedTime);
	}

	function intervalHandler() {
		let lap = props.mainTimer - props.startLapTime;
		props.setStartLapTime(props.mainTimer);
		props.setIntervalHistory([...props.intervalHistory, [props.mainTimer, lap]]);
	}

	function restartHandler() {
		props.setTimerState('start');
		props.setStartTime(new Date());
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
			return (<div className="buttons-block">
				<button className="stop" onClick={ () => stopHandler() }>Стоп</button>
				<button className="interval" onClick={ () => intervalHandler() }>Интервал</button>
			</div>
			);
		case ('restart'):
			return (<div className="buttons-block">
				<button className="restart" onClick={ () => restartHandler() }>Рестарт</button>
				<button className="discharge" onClick={ () => dischargeHandler(setButtonBlock) }>Сброс</button>
			</div>);
		case ('start'):
		default:
			return (
				<div className="buttons-block">
					<button className="start" onClick={ () => startHandler() }>Начать</button>
				</div>
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
