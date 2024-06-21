import React from "react";
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  state = {
    series: [2, 1, 1],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Complete', 'Canceled', 'Active'], // Add labels for the series
      colors: ['#8de8ad', '#ff9a91', '#87d3f2'], // Add custom colors for the series
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };

  render() {
    const { series, options } = this.state; // Destructure state for easier access

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
