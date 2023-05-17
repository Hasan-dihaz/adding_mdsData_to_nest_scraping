import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import DataScrapingModule from './dse_data_scraping/dataScraping.module';
import MdsDataModule from './data_migration/mdsdata/mdsdata.module';
import { ConfigModule } from '@nestjs/config';
// import { Index } from '';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { db1Config } from './data_migration/mdsdata/Unsued/dbconfig/db1.config';
// import { Db1Repository } from './data_migration/mdsdata/Unsued/repositories/db1.repository';
// import { Db2Repository } from './data_migration/mdsdata/Unsued/repositories/db2.repository';

@Module({
  imports: [
    MdsDataModule,
    DataScrapingModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  // imports: [
  //   TypeOrmModule.forRoot(db1Config),
  //   ,
  //   CompanyModule,
  //   ScheduleModule.forRoot(),
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
