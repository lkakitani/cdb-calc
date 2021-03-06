const CdiValue = require('../../models/CdiValue');

const getUnitPrice = (tcdiAcumulado) => {
  /*
    Math.round(x * 100000000) / 100000000 rounds x to 8 decimal places.
    For some reason toFixed(8) does not work properly
    (https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary)
    Since the formula is :: 1000 * Math.round(tcdiAcumulado * 100000000) / 100000000,
    we can simplify it to :: Math.round(tcdiAcumulado * 100000000) / 100000
  */
  return Math.round(tcdiAcumulado * 100000000) / 100000;
};

export default async (req, res) => {
  const { investmentDate, cdbRate, currentDate } = req.query;

  if (hasMissingParameters(investmentDate, cdbRate, currentDate)) {
    res.status(400).json({
      "message": "One or more parameters missing"
    });
    return;
  } else if (hasIncorrectParameters(investmentDate, cdbRate, currentDate)) {
    res.status(400).json({
      "message": "One or more parameters are incorrect. Date format: yyyy-MM-dd :: cdbRate: number"
    });
    return;
  }

  const result = [];
  let tcdiAcumulado = 1;

  let cdiInterval = await CdiValue.getCdiInterval(investmentDate, currentDate);
  cdiInterval.forEach(a => {
    tcdiAcumulado *= (1 + a.tcdi * cdbRate / 100);
    result.push({
      "date": a.dt_date,
      "unitPrice": getUnitPrice(tcdiAcumulado)
    });
  });

  res.status(200).json(result);
}

const hasMissingParameters = (investmentDate, cdbRate, currentDate) => {
  return investmentDate === undefined ||
    cdbRate === undefined ||
    currentDate == undefined;
}

const hasIncorrectParameters = (investmentDate, cdbRate, currentDate) => {
  return isNaN(Date.parse(investmentDate)) ||
    isNaN(Date.parse(currentDate)) ||
    isNaN(cdbRate);
}