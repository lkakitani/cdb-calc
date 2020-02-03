import { useState } from 'react';
import { CDBChart } from '../components/Charts';
import fetch from 'isomorphic-unfetch';

export function Form() {
  const [cdbRate, setCdbRate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('');
  const [chartData, setChartData] = useState([]);

  const parseResponse = (data) => {
    let result = [['Data', 'Preço CDB']];
    data.forEach(d => result.push([d.date, d.unitPrice]));
    return result;
  };

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
    setResult(data[data.length - 1].unitPrice);
    setChartData(parseResponse(data));
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
      <br />
      Result: {result}
      {chartData.length > 0 && <CDBChart title='Evolução CDB' chartData={chartData} />}
    </div>
  );
}