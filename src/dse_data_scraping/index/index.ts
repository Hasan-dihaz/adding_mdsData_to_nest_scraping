import BrowserObject from './browser';
import { Injectable } from '@nestjs/common';
import ScraperController from '../middlewares/page.Controller';
import PeController from '../middlewares/pe.Controller';
import CircuitBreakerController from '../middlewares/circuitBreaker.Controller';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export default class IndexProvider {
  constructor(
    private readonly browserObject: BrowserObject,
    private readonly scraperController: ScraperController,
    private readonly peController: PeController,
    private readonly circuitBreakerController: CircuitBreakerController,
  ) {}

  //Start the browser and create a browser instance

  @Cron('30/5 9-14 * * 0-4') // Starts everyday at 9.30 am from sunday to thursday and repeats after every 5 minutes.
  async func() {
    console.log('Cron Started in DSE scraping');
    const browserInstance = this.browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    this.scraperController.scrapeAll(browserInstance);
    // this.peController.scrapeAll(browserInstance);
    // this.circuitBreakerController.scrapeAll(browserInstance);
  }

  // @Cron('0 10 * * 0-4') // Runs everyday at 10 am from sunday to thursday.
  async Price_earnings() {
    console.log('Cron Started in DSE scraping');
    const browserInstance = this.browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    this.peController.scrapeAll(browserInstance);
  }

  // @Cron('30/5 9-14 * * 0-4') // Starts everyday at 9.30 am from sunday to thursday and repeats after every 5 minutes.
  async Circuit_breaker() {
    console.log('Cron Started in DSE scraping');
    const browserInstance = this.browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    this.circuitBreakerController.scrapeAll(browserInstance);
  }
}
