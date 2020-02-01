import { useState } from 'react';

export function Form() {
  const [taxaCDB, setTaxaCDB] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (event) => {
    console.log('startDate :: endDate');
    console.log(startDate);
    console.log(endDate);
    event.preventDefault();
  }

  return (
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
      <input type="submit" value="Submit" />
    </form>
  );
}