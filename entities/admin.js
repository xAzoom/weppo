import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

class Admin extends Model {}
Admin.init({
    username: DataTypes.STRING,
}, { sequelize, modelName: 'customer' });