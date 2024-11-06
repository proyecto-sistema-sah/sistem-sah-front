import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartosComponent } from './cuartos.component';

describe('CuartosComponent', () => {
  let component: CuartosComponent;
  let fixture: ComponentFixture<CuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuartosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
