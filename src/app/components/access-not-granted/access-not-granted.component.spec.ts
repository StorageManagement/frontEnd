import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNotGrantedComponent } from './access-not-granted.component';

describe('AccessNotGrantedComponent', () => {
  let component: AccessNotGrantedComponent;
  let fixture: ComponentFixture<AccessNotGrantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNotGrantedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessNotGrantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
