"use client"
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ApexCharts from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartLineProps {}

const ChartLine: React.FC<ChartLineProps> = ({}) => {
  useEffect(() => {
    const options = {
      series: [
        {
          name: 'TEAM A',
          type: 'area',
          data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
        },
        {
          name: 'TEAM B',
          type: 'line',
          data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 1],
      },
      labels: [
        'Dec 01',
        'Dec 02',
        'Dec 03',
        'Dec 04',
        'Dec 05',
        'Dec 06',
        'Dec 07',
        'Dec 08',
        'Dec 09 ',
        'Dec 10',
        'Dec 11',
      ],
      markers: {
        size: 0,
      },
      yaxis: [
        {
          title: {
            text: 'Series A',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Series B',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points';
            }
            return y;
          },
        },
      },
    };

    const chart = new ApexCharts(document.getElementById('chartline'), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chartline" />;
};

export default ChartLine;
