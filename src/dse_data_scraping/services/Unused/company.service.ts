// // company.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Companies } from '../entities/company.entities';
// import { CreateCompanyDto } from '../dto/company.dto';

// @Injectable()
// export class CompanyService {
//   constructor(
//     @InjectRepository(Companies)
//     private readonly companyRepository: Repository<Companies>,
//   ) {}

//   async upsertCompanyEntity(
//     createCompanyDto: CreateCompanyDto,
//   ): Promise<Companies> {
//     const {
//       code,
//       name,
//       last_agm,
//       market_capitalization_mn,
//       authorized_capital_mn,
//       paidup_capital_mn,
//       type_of_instrument,
//       total_outstanding_share_mn,
//       face_par_value,
//       sector,
//       cash_dividend,
//       dividend_yield_percentage,
//       bonus_issued_stock_dividend,
//       pe,
//       eps,
//       listing_since,
//       category,
//       sponsor_director,
//       govt,
//       institute,
//       _foreign,
//       _public,
//       address,
//       phone,
//       email,
//       eps_share,
//       // created_at
//     } = createCompanyDto;

//     // console.log('_public', _public);

//     const company = new Companies();

//     company.code = code;
//     company.name = name;
//     company.last_agm = last_agm;
//     company.market_capitalization_mn = market_capitalization_mn;
//     company.authorized_capital_mn = authorized_capital_mn;
//     company.paidup_capital_mn = paidup_capital_mn;
//     company.type_of_instrument = type_of_instrument;
//     company.total_outstanding_share_mn = total_outstanding_share_mn;
//     company.face_par_value = face_par_value;
//     company.sector = sector;
//     company.cash_dividend = cash_dividend;
//     company.dividend_yield_percentage = dividend_yield_percentage;
//     company.bonus_issued_stock_dividend = bonus_issued_stock_dividend;
//     company.pe = pe;
//     company.eps = eps;
//     company.listing_since = listing_since;
//     company.category = category;
//     company.sponsor_director = sponsor_director;
//     company.govt = govt;
//     company.institute = institute;
//     company._foreign = _foreign;
//     company.public = _public;
//     company.address = address;
//     company.phone = phone;
//     company.email = email;
//     company.eps_share = eps_share;
//     // company.created_at = date;

//     const queryBuilder = this.companyRepository
//       .createQueryBuilder()
//       .insert()
//       .into(Companies)
//       .values(company)
//       .orUpdate([
//         'name',
//         'last_agm',
//         'market_capitalization_mn',
//         'authorized_capital_mn',
//         'paidup_capital_mn',
//         'type_of_instrument',
//         'total_outstanding_share_mn',
//         'face_par_value',
//         'sector',
//         'cash_dividend',
//         'dividend_yield_percentage',
//         'bonus_issued_stock_dividend',
//         'pe',
//         'eps',
//         'listing_since',
//         'category',
//         'sponsor_director',
//         'govt',
//         'institute',
//         '_foreign',
//         'public',
//         'address',
//         'phone',
//         'email',
//         'eps_share',
//         'updated_at',
//       ]);

//     await queryBuilder.execute();

//     const upsertedEntity = await this.companyRepository.findOneOrFail({
//       where: { code: code },
//     });

//     return upsertedEntity;
//   }
// }
