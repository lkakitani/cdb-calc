import { Chart } from 'react-google-charts';

export const CDBChart = (props) => {
  const options = {
    title: props.title,
    hAxis: { title: "Data" },
    vAxis: { title: "Preço CDB" },
    legend: "none"
  };

  return (
    <div className={"chart-container"}>
      <Chart
        chartType="LineChart"
        data={props.chartData}
        options={options}
        width="90%"
        height="400px"
        legendToggle
      />
    </div>
  );
};