import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import CompanyModule from './dse_data_scraping/company.module';
import MdsDataModule from './data_migration/mdsdata/mdsdata.module';

@Module({
  imports: [MdsDataModule, CompanyModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
