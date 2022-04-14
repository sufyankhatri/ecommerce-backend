import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceResolver } from './user.resolver';
import { UserService } from './user.service';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceResolver, 
      {provide: UserService, useValue: {}},
      ],
    }).compile();

    resolver = module.get<InvoiceResolver>(InvoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
