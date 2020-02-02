import { useState } from 'react';
import { CDBChart } from '../components/Charts';
import fetch from 'isomorphic-unfetch';

export function Form() {
  const [taxaCDB, setTaxaCDB] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const [chartData, setChartData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('taxaCDB :: startDate :: endDate');
    console.log(taxaCDB);
    console.log(startDate);
    console.log(endDate);

    const res = await fetch('/api/mock');
    const data = await res.json();
    setChartData(data);
    console.log(data);

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
        <input type="text" value={taxaCDB} onChange={e => setTaxaCDB(e.target.value)} />
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