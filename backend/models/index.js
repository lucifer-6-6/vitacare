const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  healthScore: { type: DataTypes.INTEGER, defaultValue: 87 },
  steps: { type: DataTypes.INTEGER, defaultValue: 0 },
  hydration: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const Appointment = sequelize.define('Appointment', {
  doctorName: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }
});

const Vitals = sequelize.define('Vitals', {
  heartRate: { type: DataTypes.INTEGER, allowNull: false },
  spo2: { type: DataTypes.INTEGER, allowNull: false },
  bloodPressureSys: { type: DataTypes.INTEGER, allowNull: false },
  bloodPressureDia: { type: DataTypes.INTEGER, allowNull: false },
});

// Relationships
User.hasMany(Appointment);
Appointment.belongsTo(User);

User.hasMany(Vitals);
Vitals.belongsTo(User);

module.exports = { User, Appointment, Vitals };
