import express, { application } from 'express';
import accountRouter from './src/routes/AccountRouter.js';
import employeeRouter from './src/routes/EmployeeRouter.js';
import {path} from 'path'

const app = express();
app.use(express.json()); // express middleware
app.use(express.urlencoded({extended:true})) // express middleware

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
app.use("/api/v1/account",accountRouter);
app.use("/api/v1/employee",employeeRouter);
// app.get("/api/v1/info/:name",search);

// app.post("/api/v1/signup",signup);

export default app;