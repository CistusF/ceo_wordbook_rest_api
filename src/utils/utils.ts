import { WorkSheet, readFile, utils } from 'xlsx';
import { sheetDataType, sheetType } from '../interfaces/Sheet.interface';
import { userDataType, userType } from '../interfaces/User.interface';
import { Document } from 'mongoose';
import chalk from 'chalk';
import { logType } from '../interfaces/Utils.interface';
import { NextFunction, Request, Response } from 'express';


export const workbook = readFile("./words.xlsx");

/**
 * Print debugging information
 * @param {string} info - infomation about the debug
 * @param {}
 */
export const logger = (info: string | string[], title?: string, typeCode?: logType): void => {
    if (typeof info !== 'string') {
        info.forEach(i => {
            logger(i, title, typeCode);
        })
    } else {
        var logColor = "white";
        const ctx = new chalk.Instance({ level: 3 });

        switch (typeCode) {
            case logType.error:
                logColor = "red";
                break;
            case logType.warn:
                logColor = "yellow";
                break;
            case logType.success:
                logColor = "green";
                break;
        };
        console.log(ctx`{bold.${logColor} ⚑ [%s]} : %s`, title ?? "DEBUG", info);
    };
};

/**
 * Add middleware for logging
 */
export const logMiddle = (req:Request, res: Response, next:NextFunction) => {
    if (req.method === "POST") {
        const title = req.url.split('/').filter(i => i).join("-").toUpperCase();
        const info = JSON.stringify(req.body) ?? "Body is not found.";
        logger(info, title, logType.success);
    };

    next();
};

/**
 * Type checking for sheet
 * @param {WorkSheet | sheetType | null} obj
 * @returns {boolean}
 */
function isSheet(obj: WorkSheet | sheetType | null): obj is sheetType {
    if (typeof obj != "object") return false;
    try {
        sheetDataType.parse(obj);
        return true;
    } catch {
        return false;
    };
};

/**
 * Type checking for userData
 * @param {Document | userType | null} obj
 * @returns {boolean}
 */
export function isUser(obj: Document | userType | null): obj is userType {
    if (typeof obj != "object") return false;
    try {
        userDataType.parse(obj);
        return true;
    } catch {
        return false;
    };
};

/**
 * Get sheet information from the workbook.
 * @param {sheetType} sheetName - Name of the sheet you want to load
 * @returns {sheetType | null}
 */
export const getSheetData = (sheetName: string): sheetType | null => {
    let sheet = workbook.Sheets[sheetName];
    sheet = utils.sheet_to_json(sheet);
    if (!sheet || !isSheet(sheet)) return null;
    return sheet;
};

/**
 * Get workbook.
 * @returns {sheetType[] | null}
 */
export const getWorkbook = (): sheetType[] | null => {
    const sheets: sheetType[] = [];
    for (let i of workbook.SheetNames) {
        const sheet = utils.sheet_to_json(workbook.Sheets[i], { defval: "" });
        if (!sheet || !isSheet(sheet)) { console.log(i); continue }
        sheets.push(sheet);
    }
    return sheets;
};