export default (req, res) => {
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
