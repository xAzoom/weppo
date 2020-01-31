import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

class Customer extends Model {}
Customer.init({
    username: DataTypes.STRING,
}, { sequelize, modelName: 'customer' });