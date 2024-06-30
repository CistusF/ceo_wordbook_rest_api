import 'dotenv/config';
import './utils/Database';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import api from './routes/api.routes';
import { options } from './utils/swagger.config';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const specs = swaggerJsdoc(options);
app.use("/api-docs",
    serve,
    setup(specs)
);
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());


app.use("/api", api);

app.listen(80, () => {
    console.log("Web is listening on port 80");
});