import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { idx, IdxSchema } from './entities/idx.entities';
import { trd, TrdSchema } from './entities/trd.entities';
import { mkistat, MkistatSchema } from './entities/mkistat.entities';
import { man, ManSchema } from './entities/man.entities';
import { lastData, LastDataSchema } from './entities/last_data';

import { IndexProvider } from './index';

// import { db1Config } from './Unsued/dbconfig/db1.config';
import { Db1Repository } from './Unsued/repositories/db1.repository';
import { Db2Repository } from './Unsued/repositories/db2.repository';

import { MdsdataService } from './services/mdsdata.service';
import { LastDataService } from './services/lastData.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   //   password: 'password',
    //   database: 'mdsdata',
    //   // entities: [__dirname + '/../**/*.entities.{js,ts}'],
    //   // entities: [idx, man, trd, mkistat],
    //   synchronize: true,
    //   //!if enabled every time run the app will try to create table using registerd entity (runs migration automatically).
    // }),
    // TypeOrmModule.forFeature([idx, man, trd, mkistat]), //to use typeORM Repository on entities
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/book_nest'),
    MongooseModule.forFeature([
      { name: idx.name, schema: IdxSchema },
      { name: trd.name, schema: TrdSchema },
      { name: mkistat.name, schema: MkistatSchema },
      { name: man.name, schema: ManSchema },
      { name: lastData.name, schema: LastDataSchema },
    ]),
  ],
  controllers: [],
  providers: [
    IndexProvider,
    MdsdataService,
    LastDataService,
    Db1Repository,
    Db2Repository,
  ],
})
export default class MdsDataModule {}
