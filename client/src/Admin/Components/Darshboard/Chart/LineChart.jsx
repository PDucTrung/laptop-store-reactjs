import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Paper } from '@material-ui/core';
import GroupData from '../../../../utils/groupData';
LineChart.propTypes = {};

function LineChart({ payments = [], countpaypal = [] }) {
	const labelsTime = payments.map((item) => item.createdAt);

	const countOrder = payments.map((item) => item.cart?.length);
	const time = new Set(labelsTime.map((item) => new Date(item).toLocaleDateString()));
	const array = [];
	const arrayItemOrder = [];
	//filter by createdAt
	Array.from(time).map((i) => {
		payments.filter((item) => {
			if (new Date(item.createdAt).toLocaleDateString() === i)
				array.push({ date: i, quantity: item.cart.length });
		});
	});

	//group item follow date

	let arrayGroupByDate = GroupData(array, 'date');
	const countOrderedInEveryDay = Object.values(arrayGroupByDate).map((item) => item.length);

	//count order of date
	const dataNumbers = Object.values(arrayGroupByDate).map((item) => item.reduce((total, i) => (total += i), 0));
	const data = {
		labels: Array.from(time),
		datasets: [
			{
				label: 'Số mặt hàng được đặt',
				data: [...dataNumbers, dataNumbers.length + 5],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
				lineTension: 0.1,
			},
			{
				label: 'Số đơn hàng trong ngày',
				data: [...countOrderedInEveryDay, countOrderedInEveryDay.length + 5],
				fill: false,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgba(54, 162, 235, 0.2)',
				lineTension: 0.1,
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: false,
					},
				},
			],
		},
	};
	return (
		<Paper style={{ padding: '2rem' }}>
			<div className="header">
				<h1 className="title">Phân tích bán hàng</h1>
			</div>
			<Line data={data} options={options} labels={options.labels1} />
		</Paper>
	);
}

export default LineChart;
