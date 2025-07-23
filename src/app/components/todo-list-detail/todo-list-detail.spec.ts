import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDetail } from './todo-list-detail';

describe('TodoListDetail', () => {
  let component: TodoListDetail;
  let fixture: ComponentFixture<TodoListDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
