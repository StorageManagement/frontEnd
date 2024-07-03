import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailPageComponent } from './verify-email-page.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyEmailService } from './services/verify-email.service';

describe('VerifyEmailPageComponent', () => {
  let component: VerifyEmailPageComponent;
  let fixture: ComponentFixture<VerifyEmailPageComponent>;
  let mockVerifyEmailService: VerifyEmailService;
  beforeEach(async () => {
    mockVerifyEmailService = jasmine.createSpyObj('VerifyEmailService', [
      'getVerifyEmail',
    ]);

    await TestBed.configureTestingModule({
      imports: [VerifyEmailPageComponent, NoopAnimationsModule],
      providers: [
        {
          provide: VerifyEmailService,
          useValue: mockVerifyEmailService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logo component SHOULD render WHEN ever', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="logo"]')),
    ).toBeTruthy();
  });

  it('header SHOULD render WHEN urlChanged is false', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="header"]')),
    ).toBeTruthy();
  });

  it('image SHOULD render WHEN urlChanged is false', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="img"]')),
    ).toBeTruthy();
  });

  it('description text SHOULD be equal to expected value WHEN urlChanged is false', () => {
    // Arrange
    const expected = 'random@gmail.com';
    mockVerifyEmailService.email = expected;
    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement
        .query(By.css('[data-testid="descriptionText"]'))
        .query(By.css('a')).nativeElement.innerText,
    ).toEqual(expected);
  });
});
