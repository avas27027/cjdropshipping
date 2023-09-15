
import fs from 'fs';
import jsonfile from 'jsonfile';

import { IUser } from '@src/models/User';
import { IKey } from '@src/models/Key';
import { Product } from '@src/models/Products';


// **** Variables **** //

const DB_FILE_NAME = 'database.json';


// **** Types **** //

interface IDb {
  users: IUser[];
  key: IKey;
  products: Product[];
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  //console.log(__dirname)
  if (!fs.existsSync(__dirname + '/' + DB_FILE_NAME)) {
    jsonfile.writeFile(__dirname + '/' + DB_FILE_NAME, { users: [], key: {}, products: [] })
  }
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
