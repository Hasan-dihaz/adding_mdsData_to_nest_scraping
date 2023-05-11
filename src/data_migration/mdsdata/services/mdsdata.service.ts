import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManDocument } from '../entities/man.entities';
import { MkistatDocument } from '../entities/mkistat.entities';
import { TrdDocument } from '../entities/trd.entities';
import { IdxDocument } from '../entities/idx.entities';

import { config } from '../../../dbconfig/db.config';
@Injectable()
export class MysqlService {
  constructor(
    @InjectModel('idx') private idxModel: Model<IdxDocument>,
    @InjectModel('trd') private trdModel: Model<TrdDocument>,
    @InjectModel('mkistat') private mkistatModel: Model<MkistatDocument>,
    @InjectModel('man') private manModel: Model<ManDocument>,
  ) {}

  async readAll(): Promise<any> {
    const connection = await mysql.createConnection(config);
    // const [rows, fields] = await connection.execute('SELECT * FROM idx');

    //!===============================
    const mySqlTables = ['mkistat', 'idx', 'man', 'trd'];

    mySqlTables.forEach(async (element) => {
      if (
        element == 'mkistat' ||
        element == 'idx' ||
        element == 'man' ||
        element == 'trd'
      ) {
        const table = element;
        let model;

        try {
          if (table == 'idx') {
            model = this.idxModel;
          } else if (table == 'man') {
            model = this.manModel;
          } else if (table == 'mkistat') {
            model = this.mkistatModel;
          } else if (table == 'trd') {
            model = this.trdModel;
          } else {
            throw new Error('No model found');
          }
          // const [rows, fields] = connection.execute(`SELECT * FROM ${table}`);

          //!========================================
          const promise = new Promise((resolve, reject) => {
            connection.execute(
              `SELECT * FROM ${table}`,
              (err, rows, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve([rows, fields]);
                }
              },
            );
          });

          promise
            .then(([rows, fields]) => {
              // Handle rows and fields here
                if (Object.keys(rows).length != 0) {
                  //Object.keys(results)... converts the result into an array....since...length is a method of array.
    
                  console.time(`Writing_Time_to..${table}`);
                  try {
                    await model.insertMany(rows, {
                      ordered: false,
                    });
                  } catch (error) {
                    console.log('Error');
                  }
                  console.timeEnd(`Writing_Time_to..${table}`);
                } else {
                  console.log('Task Completed...For', table);
                }
             
            })
            .catch((err) => {
              // Handle error here
            });

          //!========================================


      }
    });

    //!===============================
    connection.end();
    //!---------------------------
    await model.insertMany(rows, { ordered: false });
    //!---------------------------
    console.log(rows);
    // results.map((item) => {
    //   console.log('item', item);
    // });

    return rows;
  }
}
