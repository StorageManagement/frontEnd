import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LoadingService } from '../loading/services/loading.service';
import { CreateAccountApiService } from './services/create-account-api.service';
import { of, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MockService } from 'ng-mocks';

@Component({
  selector: 'app-random',
  template: ``,
})
class DummyComponent {}
describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let mockLoadingService: any;
  let mockCreateAccountApiService: jasmine.SpyObj<CreateAccountApiService>;

  beforeEach(async () => {
    mockLoadingService = MockService(LoadingService, {
      hide() {},
      show() {},
    });

    mockCreateAccountApiService = jasmine.createSpyObj<CreateAccountApiService>(
      ['createAccount'],
    );
    await TestBed.configureTestingModule({
      imports: [
        CreateAccountComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterModule.forRoot([
          {
            path: 'verifyEmail',
            component: DummyComponent,
          },
        ]),
      ],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService },
        {
          provide: CreateAccountApiService,
          useValue: mockCreateAccountApiService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    (window as any).loadingError = new Subject();
    fixture.detectChanges();
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

  it('password input component SHOULD render WHEN urlChanged is false', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="password"]')),
    ).toBeTruthy();
  });

  it('confirmPassword input component SHOULD render WHEN urlChanged is false', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="confirmPassword"]')),
    ).toBeTruthy();
  });

  it('submitButton component SHOULD render WHEN urlChanged is false', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="submitButton"]')),
    ).toBeTruthy();
  });

  it('error SHOULD render WHEN isError is true', () => {
    // Arrange
    // Act
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="password"]'))
      .componentInstance.valueChange.emit('1');
    fixture.debugElement
      .query(By.css('[data-testid="confirmPassword"]'))
      .componentInstance.valueChange.emit('1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="submitButton"]'))
      .nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="error"]')),
    ).toBeTruthy();
  });

  it('hide method of loadingService SHOULD call WHEN submitButton is clicked and has no error and response is valid', () => {
    // Arrange
    mockCreateAccountApiService.createAccount.and.returnValue(
      of({
        detail: 'Verification email sent.',
      }),
    );

    const spy = spyOn(mockLoadingService, 'hide');

    // Act
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="password"]'))
      .componentInstance.valueChange.emit('1');
    fixture.debugElement
      .query(By.css('[data-testid="confirmPassword"]'))
      .componentInstance.valueChange.emit('1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="submitButton"]'))
      .nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('hide method of loadingService SHOULD not call WHEN submitButton is clicked and has no error and response is not valid', () => {
    // Arrange
    mockCreateAccountApiService.createAccount.and.returnValue(
      of({
        detail: 'some random error',
      }),
    );
    const spy = spyOn(mockLoadingService, 'hide');
    // Act
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="password"]'))
      .componentInstance.valueChange.emit('1');
    fixture.debugElement
      .query(By.css('[data-testid="confirmPassword"]'))
      .componentInstance.valueChange.emit('12');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="submitButton"]'))
      .nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Assert
    expect(spy).not.toHaveBeenCalled();
  });

  xit('items SHOULD destroy WHEN submitButton is clicked and has no error and response is valid', fakeAsync(() => {
    // Arrange
    mockCreateAccountApiService.createAccount.and.returnValue(
      of({
        detail: 'Verification email sent.',
      }),
    );

    (window as any).loadingError = new Subject();
    // Act
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="password"]'))
      .componentInstance.valueChange.emit('1');
    fixture.debugElement
      .query(By.css('[data-testid="confirmPassword"]'))
      .componentInstance.valueChange.emit('1');
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[data-testid="submitButton"]'))
      .nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(1500);
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css('[data-testid="inputs"]')),
    ).toBeFalsy();
  }));
});
