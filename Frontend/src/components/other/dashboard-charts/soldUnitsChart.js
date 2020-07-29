import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class SoldUnitsChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['Ali-Dist', 'Ahmed-Dist', 'Kamran-Dist', 'Malik-Dist', 'Faisal-Dist'],
				datasets: [
					{
						label: 'Sold Units In Month',
						data: [15, 9, 10, 12, 17],
						backgroundColor: [
							'rgba(215, 29, 92, 0.6)',
							'rgba(115, 31, 132, 0.6)',
							'rgba(128, 45, 78, 0.6)',
							'rgba(186, 50, 122, 0.6)',
							'rgba(63, 62, 64, 0.6)',
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

export default SoldUnitsChart;
