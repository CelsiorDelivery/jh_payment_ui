import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInitiation } from './payment-initiation';

describe('PaymentInitiation', () => {
  let component: PaymentInitiation;
  let fixture: ComponentFixture<PaymentInitiation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentInitiation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentInitiation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
