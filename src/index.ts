import express from 'express';
import dotenv from 'dotenv';
// import sequelize from './config/database';
// import Employee from './models/Employee';
// import Employees from './models/Employees';
import {
  createEmployee,
  getEmployee,
  updateEmployee,
  getAllEmployees
} from './controllers/employeeDynamoDbController';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Database initialization
// const initializeDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     await Employee.sync();
//     await Employees.sync();
//     console.log('Database connection established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Halo Stack API!' });
});

// Employee routes
app.post('/api/employees', createEmployee);
app.get('/api/employees', getAllEmployees);
app.get('/api/employees/:id', getEmployee);
app.put('/api/employees/:id', updateEmployee);

// Nuke Employees
app.put('/api/employees/:id', updateEmployee);

// Start server
app.listen(port, async () => {
  // await initializeDatabase();
  console.log(`Server is running on port ${port}`);
}); 