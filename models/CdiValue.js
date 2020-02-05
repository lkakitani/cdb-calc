import { Sequelize, Op } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });

const CdiValue = sequelize.define('cdi_price', {
  s_security_name: Sequelize.STRING,
  dt_date: Sequelize.DATE,
  d_last_trade_price: Sequelize.NUMBER,
  tcdi: Sequelize.NUMBER
}, {
  timestamps: false
});

CdiValue.getCdiInterval = function (startDate, endDate) {
  return this.findAll({
    attributes: ['dt_date', 'd_last_trade_price', 'tcdi'],
    where: {
      dt_date: {
        [Op.between]: [startDate, endDate]
      }
    }
  });
};

module.exports = CdiValue;