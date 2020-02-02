import { Chart } from 'react-google-charts';

export const CDBChart = (props) => {
  const options = {
    title: props.title,
    hAxis: { title: "Data", viewWindow: { min: 0, max: 24 } },
    vAxis: { title: "Preço CDB", viewWindow: { min: '2020-04-27', max: '2020-05-03' } },
    legend: "none"
  };

  return (
    <div className={"chart-container"}>
      <Chart
        chartType="LineChart"
        data={[["Sprint", "Nota"],
        [1, 4],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, 8],
        [6, 5],
        [7, 9]]}
        options={options}
        width="90%"
        height="400px"
        legendToggle
      />
    </div>
  );
};