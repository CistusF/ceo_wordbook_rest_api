import { Options } from "swagger-jsdoc";

export const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CEO_WORDBOOK",
            version: process.env.npm_package_version ?? "version is not found",
            description:
                "Simple REST_API for CEO_WORDBOOK",
            license: {
                name: "ISC",
                url: "https://spdx.org/licenses/ISC.html",
            },
            contact: {
                name: "CistusF",
                url: "https://www.devist.me/",
                email: "cistusf@devist.me",
            },
        },
        servers: [
            {
                url: "http://localhost/api/",
            }
        ],
    },
    apis: ["dist/routes/*.routes.*", "dist/routes/**/*.routes.*"],
};
