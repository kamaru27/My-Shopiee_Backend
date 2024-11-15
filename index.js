import express from 'express';
import cors from 'cors';
import ConnectDB from './src/config/db.js';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import { dashboardRoutes } from './src/routes/dashboard/dashboardRoutes/DashboardRoute.js';
import { cwd } from 'process';
import { frontendRoutes } from './src/routes/frontend/frontendRoutes/FrontendRoute.js';
import { autoCreateAdmin } from './src/utils/createAdmin.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use('/uploads', express.static(cwd() + '/uploads',{ maxAge:31557600 }));

const port = process.env.PORT;

//Dashboard route
app.use('/api/dashboard',dashboardRoutes);

//Frontend route
app.use('/api/frontend',frontendRoutes);

ConnectDB();

app.listen(port, async () => {

  await autoCreateAdmin();
  console.log(`server listening number - ${port}`);

});



