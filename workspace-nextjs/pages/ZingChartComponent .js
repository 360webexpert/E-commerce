// ZingChartComponent.js
import React, { useEffect } from 'react';
import zingchart from 'zingchart';

const ZingChartComponent = () => {
  useEffect(() => {
    zingchart.render({
      id: 'myChart',
      data: {
        type: 'gauge',
        series: [{
          values: [87]
        }]
      },
      height: '100%',
      width: '100%'
    });
  }, []);

  return (
    <div id="myChart" style={{ height: '100%', width: '100%' }}></div>
  );
};

export default ZingChartComponent;
