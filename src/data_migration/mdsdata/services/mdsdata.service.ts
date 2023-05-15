import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManDocument } from '../entities/man.entities';
import { MkistatDocument } from '../entities/mkistat.entities';
import { TrdDocument } from '../entities/trd.entities';
import { IdxDocument } from '../entities/idx.entities';
import { LastDataService } from './lastData.service';

import { config } from '../../../dbconfig/db.config';

import { FieldPacket, RowDataPacket } from 'mysql2';
@Injectable()
export class MdsdataService {
  constructor(
    @InjectModel('idx') private idxModel: Model<IdxDocument>,
    @InjectModel('trd') private trdModel: Model<TrdDocument>,
    @InjectModel('mkistat') private mkistatModel: Model<MkistatDocument>,
    @InjectModel('man') private manModel: Model<ManDocument>,
    private readonly lastDataService: LastDataService,
  ) {}

  async readAll(): Promise<any> {
    // console.log('last Data...', await this.lastDataService.getLastData());

    const connection = await mysql.createConnection(config);
    // const [rows, fields] = await connection.execute('SELECT * FROM idx');

    //!===============================//////
    const mySqlTables = ['mkistat', 'idx', 'man', 'trd'];
    // const mySqlTables = ['mkistat'];

    //!....................................... Last data
    const LastDoc = await this.lastDataService.getLastData();
    //!....................................... Last data

    mySqlTables.forEach(async (element) => {
      if (
        element == 'mkistat' ||
        element == 'idx' ||
        element == 'man' ||
        element == 'trd'
      ) {
        const table = element;
        let model, SortOn, LastData;

        //!....................................... Last data
        const fieldName = `${table}LastData`;
        LastData = LastDoc[0][fieldName];
        //!....................................... Last data

        try {
          if (table == 'idx') {
            model = this.idxModel;
            SortOn = 'IDX_DATE_TIME';
          } else if (table == 'man') {
            model = this.manModel;
            SortOn = 'MAN_ANNOUNCEMENT_DATE_TIME';
          } else if (table == 'mkistat') {
            model = this.mkistatModel;
            SortOn = 'MKISTAT_LM_DATE_TIME';
          } else if (table == 'trd') {
            model = this.trdModel;
            SortOn = 'TRD_SNO';
          } else {
            throw new Error('No model found');
          }
          // const [rows, fields] = connection.execute(`SELECT * FROM ${table}`);

          let promise: any;
          const mdsDataMigration = () => {
            // promise = connection.execute(`SELECT * FROM ${table}`);
            promise = connection.execute(
              `SELECT * FROM ${table} WHERE ${SortOn} > '${LastData}' ORDER BY ${SortOn} LIMIT 50000`,
            );

            promise
              .then(
                async ([rows, fields]: [RowDataPacket[], FieldPacket[]]) => {
                  // Handle rows and fields here
                  if (Object.keys(rows).length != 0) {
                    //Object.keys(results)... converts the result into an array....since...length is a method of array.

                    // console.time(`Writing_Time_to..${table}`);
                    // console.log('rows', rows);

                    try {
                      console.log('Writing to Collection ', table);

                      await model.insertMany(rows, {
                        ordered: false,
                      });
                    } catch (error) {
                      console.log('Error');
                    }
                    // console.timeEnd(`Writing_Time_to..${table}`);
                    LastData = rows.pop()[SortOn].toLocaleString('sv-SE'); // "sv-SE" Converting date formate
                    // console.log('LastData .....', LastData);
                    await this.lastDataService.setLastData({
                      [fieldName]: LastData,
                    }); //Saving last migrated data trace to DB.
                    mdsDataMigration(); // Repeatative function Calling...
                  } else {
                    console.log('Task Completed...For', table);
                  }
                },
              )
              .catch((err) => {
                // Handle error here
                console.log('error in mdsdata', err);
              });
          };
          mdsDataMigration();
        } catch (error) {
          console.log('got Error in mdsdata');
        }
      }
    });

    //!---------------------------
    // connection.end();
    //!---------------------------
  }
}
