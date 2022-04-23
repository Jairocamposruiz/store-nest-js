import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { BrandsService } from '../src/modules/products/services/brands.service';

describe('BrandsController (e2e)', () => {
  let app: INestApplication;
  const route = '/brands';
  const service = {
    findAll: () => ['test'],
    findOne: () => ['test'],
    create: () => ['test'],
    update: () => ['test'],
    delete: () => ['test'],
  };

  const item = {
    name: 'test',
    image: 'test@test.com',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BrandsService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET ${route}`, async () => {
    await request(app.getHttpServer())
      .get(route)
      .expect('Content-Type', /json/)
      .expect(service.findAll());
  });

  it(`/GET ${route}/:id`, () => {
    return request(app.getHttpServer())
      .get(`${route}/1`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(service.findOne());
  });

  it(`/POST ${route} without token`, () => {
    return request(app.getHttpServer()).post(route).send(item).expect(401);
  });
});
