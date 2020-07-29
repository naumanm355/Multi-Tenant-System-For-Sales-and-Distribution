import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class ProfitChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['Ali-Dist', 'Ahmed-Dist', 'Kamran-Dist', 'Malik-Dist', 'Faisal-Dist'],
				datasets: [
					{
						label: 'Profit from Distributors in Rs',
						data: [4738, 12344, 23435, 452, 3561],
						backgroundColor: [
							'rgba(55, 99, 92, 0.6)',
							'rgba(215, 91, 132, 0.6)',
							'rgba(241, 65, 78, 0.6)',
							'rgba(854, 90, 122, 0.6)',
							'rgba(03, 12, 64, 0.6)',
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
				<Line
					data={this.state.chartData}
					height={100}
					options={{
						maintainAspectRatio: true,
						title: {
							display: this.props.displayTitle,
							text: 'Profit From Different Distributors',
							fontSize: 25,
						},
						legend: { display: this.props.displayLegend, position: this.props.legendPosition },
					}}
				/>
			</div>
		);
	}
}

export default ProfitChart;
