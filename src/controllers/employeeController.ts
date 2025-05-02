import { Request, Response } from 'express';
import Employee from '../models/Employee';
import Employees from '../models/Employees';

export const createEmployee = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    delete req.body.id // Here we delete the temp id so that the db can auto gen its own one
    const employees = await Employees.create(req.body);
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: `Failed to create employee ${error}`});
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    console.log("updating", req.body)
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get employees' });
  }
}; 