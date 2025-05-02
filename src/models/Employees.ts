// This is for short fast employee records dispaly only certain data
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Employees extends Model {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public salutation!: string;
    public profileColor!: string;
    public employeeNumber!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Employees.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salutation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'employees',
    }
  );
  
  export default Employees; 