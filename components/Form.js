import { useState } from 'react';
import { CDBChart } from '../components/Charts';
import fetch from 'isomorphic-unfetch';

export function Form() {
  const [cdbRate, setCdbRate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [chartData, setChartData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isNaN(Date.parse(startDate)) ||
      isNaN(Date.parse(endDate)) ||
      isNaN(parseFloat(cdbRate))) {
      alert('Please fill the fields correctly');
      return;
    }

    const res = await fetch(`/api/cdb?investmentDate=${startDate}&currentDate=${endDate}&cdbRate=${cdbRate}`);
    const data = await res.json();
    setChartData(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Data inicial do investimento:
          <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <br />
        <label>
          Taxa do CDB:
        <input type="text" value={cdbRate} onChange={e => setCdbRate(e.target.value)} />
        </label>
        <br />
        <label>
          Data atual:
          <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <CDBChart title='Evolução CDB' />
      {JSON.stringify(chartData)}
    </div>
  );
}