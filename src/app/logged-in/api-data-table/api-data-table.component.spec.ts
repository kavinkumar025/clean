import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDataTableComponent } from './api-data-table.component';

describe('ApiDataTableComponent', () => {
  let component: ApiDataTableComponent;
  let fixture: ComponentFixture<ApiDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
