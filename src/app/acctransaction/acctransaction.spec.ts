import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acctransaction } from './acctransaction';

describe('Acctransaction', () => {
  let component: Acctransaction;
  let fixture: ComponentFixture<Acctransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Acctransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acctransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
