// This is the full employee records fetched from employees
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Employee extends Model {
  public id!: number;
  public name!: string;
  public lastName!: string;
  public fullName!: string;
  public salutation!: string;
  public gender!: string;
  public gsalary!: number;
  public employeeNumber!: number;
  public profileColor!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salutation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    gsalary: {
      type: DataTypes.INTEGER,
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
    tableName: 'employee',
  }
);

export default Employee; 