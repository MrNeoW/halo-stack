import { Request, Response } from 'express';
import docClient from '../config/dynamoClient'; // use the file from above
import { v4 as uuidv4 } from 'uuid'; // for generating unique employeeId
//AKIAVRUVVL3GZVZA4LPT
//hIw0ww49C4Vfo+lmjZsqZScvecdD/i1oUpppX2y9
const TABLE_NAME_EMPLOYEES = 'employees';
const TABLE_NAME_EMPLOYEE = 'employee';
// export AWS_ACCESS_KEY_ID=your-access-key
// export AWS_SECRET_ACCESS_KEY=your-secret-key
// export AWS_REGION=us-east-1
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = uuidv4(); // Generate a unique ID
    const employeesData = {
        name: req.body.name,
        lastName: req.body.lastName,
        salutation: req.body.salutation,
        profileColor: req.body.profileColor,
        employeeNumber: req.body.employeeNumber,
        userId: employeeId
    }
    
    console.log(employeesData)
    const paramsEmployees = {
      TableName: TABLE_NAME_EMPLOYEES,
      Item: employeesData,
    };   
    const newEmployee = { ...req.body, userId: employeeId };
    console.log(newEmployee)
    const paramsEmployee = {
      TableName: TABLE_NAME_EMPLOYEE,
      Item: newEmployee,
    };

    await docClient.put(paramsEmployees).promise();
    await docClient.put(paramsEmployee).promise();

    res.status(201).json(employeesData);
  } catch (error) {
    res.status(400).json({ error: `Failed to create employee: ${error}` });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id)
    const params = {
      TableName: TABLE_NAME_EMPLOYEE,
      Key: { userId: req.params.id },
    };

    const result = await docClient.get(params).promise();

    if (!result.Item) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.Item);
  } catch (error) {
    console.error("Get employee error:", error);
    res.status(400).json({ error: 'Failed to get employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updateFields = Object.keys(req.body).filter(key => key !== 'userId'); // exclude primary key

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const expressionParts = updateFields.map((key, i) => `#key${i} = :val${i}`);
    const expressionNames = Object.fromEntries(updateFields.map((key, i) => [`#key${i}`, key]));
    const expressionValues = Object.fromEntries(updateFields.map((key, i) => [`:val${i}`, req.body[key]]));

    // Update TABLE_NAME_EMPLOYEE
    const paramsEmployee = {
      TableName: TABLE_NAME_EMPLOYEE,
      Key: { userId: req.params.id },
      UpdateExpression: `SET ${expressionParts.join(', ')}`,
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      ReturnValues: 'ALL_NEW',
    };

    // Update TABLE_NAME_EMPLOYEES
    const paramsEmployees = {
      TableName: TABLE_NAME_EMPLOYEES,
      Key: { userId: req.params.id },
      UpdateExpression: `SET ${expressionParts.join(', ')}`,
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      ReturnValues: 'ALL_NEW',
    };

    // Perform both updates (in parallel)
    const [resultEmployee, resultEmployees] = await Promise.all([
      docClient.update(paramsEmployee).promise(),
      docClient.update(paramsEmployees).promise()
    ]);

    res.json({
      employee: resultEmployee.Attributes,
      employees: resultEmployees.Attributes
    });
  } catch (error) {
    console.error("Failed to update employee:", error);
    res.status(400).json({ error: 'Failed to update employee' });
  }
};  

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const params = {
      TableName: TABLE_NAME_EMPLOYEES,
    };

    const result = await docClient.scan(params).promise();

    res.json(result.Items);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get employees' });
  }
};
