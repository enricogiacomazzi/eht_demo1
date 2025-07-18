import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUser2 } from './add-user2';

describe('AddUser2', () => {
  let component: AddUser2;
  let fixture: ComponentFixture<AddUser2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUser2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUser2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
