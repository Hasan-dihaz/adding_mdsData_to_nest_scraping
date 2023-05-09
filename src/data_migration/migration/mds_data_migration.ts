// // import dotenv from 'dotenv';
// // dotenv.config();

// // import { pool_1 } from '../db_config/mdsdata_db.module.ts/index.js';
// // import { pool_1 } from '../db_config/mdsdata_db.module.ts/index.js';
// import { Idx } from '../mdsdata/entities/idx.entities';
// import { Man } from '../mdsdata/entities/man.entities';
// import { Mkistat } from '../mdsdata/entities/mkistat.entities';
// import { Trd } from '../mdsdata/entities/trd.entities';
// import mongoose from 'mongoose';
// // import { getLastData, setLastData } from '../last_data.js';
// import { LastData } from '../last_data';
// import { Inject, Injectable } from '@nestjs/common';

// // Reading MySQL dhaka_stock_exchange tables name and storing into an array.................
// @Injectable()
// export default class mdsdata_data_migration {
//   constructor(
//     @Inject('MYSQL_POOL') private readonly pool_1,
//     private readonly lastData: LastData,
//   ) {}

//   async tableName_mdsdata() {
//     const tables_mdsdata = [];
//     const results_1 = await this.pool_1.query(`SHOW TABLES`);
//     for (const i in results_1) {
//       tables_mdsdata.push(results_1[i].Tables_in_mdsdata);
//     }
//     return tables_mdsdata;
//   }

//   //Reading mdsdata tables name
//   async mdsdata_tables() {
//     // let mySqlTables;
//     const mySqlTables = await this.tableName_mdsdata();

//     // const db = await dbConnect();  //Connection to the MongoDB Database
//     // mongoose.connect(process.env.DATABASE_URL);
//     mongoose.connect('mongodb://localhost:27017/dsetp');

//     const LastDoc = await this.lastData.getLastData(); //Getting last migration trace from DB.

//     mySqlTables.forEach(async (element) => {
//       if (
//         element == 'mkistat' ||
//         element == 'idx' ||
//         element == 'man' ||
//         element == 'trd'
//       ) {
//         // || element == 'idx' || element == 'man' || element == 'trd'......element == 'idx' || element == 'man' || element == 'stats' || element == 'trd' || element == 'mkistat'
//         // console.log(element);
//         const table = element;
//         let model_1, LastData, SortOn;
//         // fieldName,

//         // LastDoc= await getLastData();  //Getting last migration trace from DB.
//         const fieldName = `${table}LastData`;
//         LastData = LastDoc[0][fieldName];

//         console.log('From MDS...', table, ':', LastData);

//         try {
//           if (table == 'idx') {
//             model_1 = idxModel;
//             SortOn = 'IDX_DATE_TIME';
//           } else if (table == 'man') {
//             model_1 = manModel;
//             SortOn = 'MAN_ANNOUNCEMENT_DATE_TIME';
//           } else if (table == 'mkistat') {
//             model_1 = mkistatModel;
//             SortOn = 'MKISTAT_LM_DATE_TIME';
//           }
//           // else if (table == 'stats') {
//           //   model_1 = statsModel;
//           // }
//           else if (table == 'trd') {
//             model_1 = trdModel;
//             SortOn = 'TRD_SNO';
//           } else {
//             throw new Error('No model found');
//           }

//           let mdsResults;
//           function mdsDataMigration() {
//             console.log('LastData.....', typeof LastData);
//             mdsResults = this.pool_1.query(
//               `SELECT * FROM ${table} WHERE ${SortOn} > '${LastData}' ORDER BY ${SortOn} LIMIT 50000`,
//             );
//             // console.log('mdsResults...',mdsResults);
//             mdsResults.then(async (results) => {
//               if (Object.keys(results).length != 0) {
//                 //Object.keys(results)... converts the result into an array....since...length is a method of array.

//                 console.time(`Writing_Time_to..${table}`);
//                 try {
//                   await model_1.insertMany(results, {
//                     ordered: false,
//                     upsert: true,
//                   });
//                 } catch (error) {
//                   console.log('Error');
//                 }
//                 // await model_1.insertMany(results,{ordered:false, upsert: true});
//                 console.timeEnd(`Writing_Time_to..${table}`);
//                 LastData = results.pop()[SortOn].toLocaleString('sv-SE'); // "sv-SE" Converting date formate
//                 console.log('LastData .......MKISTAT*******.....', LastData);
//                 await this.lastData.setLastData({ [fieldName]: LastData }); //Saving last migrated data trace to DB.
//                 mdsDataMigration(); // Repeatative function Calling...
//               } else {
//                 // await setLastData({[fieldName]:LastData});          //Saving last migration trace in DB.
//                 console.log('Task Completed...For', table);
//               }
//             });
//           }
//           mdsDataMigration();
//         } catch (error) {
//           console.log('got Error');
//           // console.log(error);
//         }
//       }
//     });
//   }
// }

// // export { mdsdata_tables };
