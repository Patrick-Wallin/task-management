import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTasksComponent } from './template-tasks.component';

describe('TemplateTasksComponent', () => {
  let component: TemplateTasksComponent;
  let fixture: ComponentFixture<TemplateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
