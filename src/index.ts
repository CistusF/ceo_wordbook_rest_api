// Load environment
import { config } from 'dotenv';
import { join } from 'path';
const NODE_ENV = process.env.NODE_ENV;
config({
    path: join(__dirname, "..", (NODE_ENV === 'production' ? ".env" : ".env"))
});

// Load modules
import './utils/Database';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import api from './routes/api.routes';
import { options } from './utils/swagger.config';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { logger } from './utils/utils';
import { logType } from './interfaces/Utils.interface';

const app = express();
const port = parseInt(process.env.PORT ?? "3000");

const specs = swaggerJsdoc(options);
app.use("/api-docs",
    serve,
    setup(specs)
);
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/api", api);

app.listen(port, () => {
    logger("Web is listening on port " + port, "Main", logType.success);
});

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'develoment' | 'production';
            MONGO_DB_URI?: string;
            PORT?: string;
            npm_package_version: string;
        }
    }
}