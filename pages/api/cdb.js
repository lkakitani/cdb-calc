const CdiValue = require('../../models/CdiValue');

export default async (req, res) => {
  // console.log('test');
  let aa = await CdiValue.getCdiInterval('2015-01-01', '2015-02-03');
  // aa.forEach(a => console.log(a.dt_date));
  // console.log('test' + (await CdiValue.findAll()).length);

  res.status(200).json(
    [
      {
        "date": "2016-12-26",
        "unitPrice": 1015.10
      },
      {
        "date": "2016-12-25",
        "unitPrice": 1015.15
      },
      {
        "date": "2016-12-24",
        "unitPrice": 1020.10
      }
    ]
  )
}
