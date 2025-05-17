import express, { application } from 'express';
import accountRouter from './src/routes/AccountRouter.js';
import employeeRouter from './src/routes/EmployeeRouter.js';
import cors from 'cors'
import path from 'path'

const app = express();
app.use(cors())
app.use(express.json()); // express middleware
app.use(express.urlencoded({extended:true})) // express middleware

app.use(express.static(path.join("", 'dist')));
app.use("/image",express.static(path.join("", 'public/upload')))

app.get('/', function (req, res) {
    res.sendFile(path.join("", 'dist', 'index.html'));
  });
app.use("/api/v1/account",accountRouter);
app.use("/api/v1/employee",employeeRouter);
// app.get("/", verifyAccount, (req, res) => {
//   res.json({ message: `Welcome, ${req.user.name}` });
// });
// app.get("/api/v1/info/:name",search);

// app.post("/api/v1/signup",signup);

export default app;