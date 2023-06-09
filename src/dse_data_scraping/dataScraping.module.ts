import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import Browser from './index/browser';
import Index from './index/index';

import PageController from './middlewares/page.Controller';
import PeController from './middlewares/pe.Controller';
import CircuitBreakerController from './middlewares/circuitBreaker.Controller';

import PageScraper from './scrapers/codeNameScraper';
import PeScraper from './scrapers/peScrapar';
import CircuitBreakerScrapper from './scrapers/circuitBreakerScrapper';

import { CompanyService } from './services/company.service';
import { PeService } from './services/pe.service';
import { CircuitBreakerService } from './services/circuitBreaker.service';

// import { Companies } from './entities/company.entities';
// import { Price_earnings } from './entities/pe.entities';
// import { Circuit_breaks } from './entities/circuitBreaker.entities';

import { MongooseModule } from '@nestjs/mongoose';
import { Price_earnings, Price_earningsSchema } from './entities/pe.entities';
import { Companies, CompaniesSchema } from './entities/company.entities';
import {
  Circuit_breaks,
  Circuit_breaksSchema,
} from './entities/circuitBreaker.entities';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   //   password: 'password',
    //   // database: 'dse_scraped_data',
    //   database: 'dse_scraped_data',
    //   entities: [Companies, Price_earnings, Circuit_breaks],
    //   synchronize: true,
    //   //!if enabled every time run the app will try to create table using registerd entity (runs migration automatically).
    // }),
    // TypeOrmModule.forFeature([Companies, Price_earnings, Circuit_breaks]), //to use typeORM Repository on entities

    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/book_nest'),
    MongooseModule.forRoot(
      'mongodb://admin:dseMngDb4tP!@89.117.36.92:27017/dse_exp?authMechanism=DEFAULT',
    ),
    MongooseModule.forFeature([
      { name: Price_earnings.name, schema: Price_earningsSchema },
      { name: Companies.name, schema: CompaniesSchema },
      { name: Circuit_breaks.name, schema: Circuit_breaksSchema },
    ]),
  ],
  controllers: [],
  providers: [
    CompanyService,
    PeService,
    CircuitBreakerService,
    PageController,
    PeController,
    CircuitBreakerController,
    PageScraper,
    PeScraper,
    CircuitBreakerScrapper,
    Index,
    Browser,
  ],
})
export default class CompanyModule {}
