import { Sequelize, Op } from 'sequelize';
const sequelize = new Sequelize('postgres', 'postgres', 'docker', {
  host: 'localhost',
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