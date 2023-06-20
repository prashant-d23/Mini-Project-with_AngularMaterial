import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxformComponent } from './dialogboxform.component';

describe('DialogboxformComponent', () => {
  let component: DialogboxformComponent;
  let fixture: ComponentFixture<DialogboxformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogboxformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
