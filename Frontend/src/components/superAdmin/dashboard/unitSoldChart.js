import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import {Line,Bar,Pie} from 'react-chartjs-2'
class UnitSoldChart extends Component {
	constructor(props){
		super(props)
		this.state={
// 			chartData:{labels:[
// 				'fgre','gr','egrff','dgrfv','dgd'
// 			],
// 		datasets:[
// 			{label:'population',
// 		data:[76762,36765,47668,58676,68787]
// 	,
// 	backgroundColor:[
// 		'rgba(255,99,132,0.6)',
// 		'rgba(255,99,132,0.6)',
// 		'rgba(255,99,132,0.6)',
// 		'rgba(255,99,132,0.6)',
// 		'rgba(255,99,132,0.6)'
// 	]
// }
// 		]

// 		}
		}
	}
		render() {
		const options = {
			title: {
				text: "Unit Sold Per Month"
			},
			animationEnabled: true,
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "line",
				dataPoints: [
					{ label: 1,  y: 10  },
					{ label: 2, y: 15  },
					{ label: 3, y: 25  },
					{ label: 4,  y: 30  },
					{ label: 5,  y: 28  }
				]
			}
			]
		}
		
		return (
		<div>
		
		{/* <Bar data={this.state.chartDat}
		options={{}} /> */}
		<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. 
			This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default UnitSoldChart;