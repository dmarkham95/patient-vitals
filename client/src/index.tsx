import App from 'app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import './react-chartjs-2-defaults';
import './react-table-defaults';
import './styles/index.css';

const rootEl = document.getElementById('root');

const render = () => {
	ReactDOM.render(<App />, rootEl);
};

window.onload = () => {
	render();
};
