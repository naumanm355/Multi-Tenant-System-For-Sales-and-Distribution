import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class OrdersSummaryByPercentage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['Ali-Dist', 'Ahmed-Dist', 'Kamran-Dist', 'Malik-Dist', 'Faisal-Dist'],
				datasets: [
					{
						label: 'Orders summary In Percentage',
						data: [54, 87, 63, 74, 93],
						backgroundColor: [
							'rgba(85, 129, 92, 0.6)',
							'rgba(23, 11, 87, 0.6)',
							'rgba(95, 125, 78, 0.6)',
							'rgba(34, 12, 94, 0.6)',
							'rgba(201, 45, 74, 0.6)',
						],
					},
				],
			},
		};
	}

	static defualtProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
	};

	render() {
		return (
			<div className="chart">
				<Pie
					data={this.state.chartData}
					height={100}
					options={{
						maintainAspectRatio: true,
						title: {
							display: this.props.displayTitle,
							text: 'Largest cities in Sold Units in Month',
							fontSize: 25,
						},
						legend: { display: this.props.displayLegend, position: this.props.legendPosition },
					}}
				/>
			</div>
		);
	}
}

export default OrdersSummaryByPercentage;
