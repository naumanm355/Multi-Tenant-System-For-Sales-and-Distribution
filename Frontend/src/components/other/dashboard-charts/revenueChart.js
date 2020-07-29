import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class RevenueChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['Ali-Dist', 'Ahmed-Dist', 'Kamran-Dist', 'Malik-Dist', 'Faisal-Dist'],
				datasets: [
					{
						label: 'Revenue from Distributors in Rs',
						data: [473847, 1232344, 2343435, 434352, 345561],
						backgroundColor: [
							'rgba(255, 99, 92, 0.6)',
							'rgba(65, 91, 132, 0.6)',
							'rgba(231, 65, 78, 0.6)',
							'rgba(85, 90, 122, 0.6)',
							'rgba(103, 12, 64, 0.6)',
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
				<Bar
					data={this.state.chartData}
					height={100}
					options={{
						maintainAspectRatio: true,
						title: {
							display: this.props.displayTitle,
							text: 'Revenue From Different Distributors',
							fontSize: 25,
						},
						legend: { display: this.props.displayLegend, position: this.props.legendPosition },
					}}
				/>
			</div>
		);
	}
}

export default RevenueChart;
