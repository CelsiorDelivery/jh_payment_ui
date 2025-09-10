import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paytransaction } from './paytransaction';

describe('Paytransaction', () => {
  let component: Paytransaction;
  let fixture: ComponentFixture<Paytransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paytransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paytransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
