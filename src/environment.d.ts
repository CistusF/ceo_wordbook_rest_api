declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'develoment' | 'test' | 'production';
            MONGO_DB_URI?: string;
            PORT?: string;
            npm_package_version: string;
        }
    }
}