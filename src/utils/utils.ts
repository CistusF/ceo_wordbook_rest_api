import { WorkSheet, readFile, utils } from 'xlsx';
import { sheetDataType, sheetType } from '../interfaces/Sheet.interface';
import { userDataType, userType } from '../interfaces/User.interface';
import { Document } from 'mongoose';

export const workbook = readFile("./words.xlsx");

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