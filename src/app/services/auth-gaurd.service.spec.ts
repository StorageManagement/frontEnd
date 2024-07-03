// import { TestBed } from '@angular/core/testing';
//
// import { AuthGuardService } from './auth-guard.service';
// import { AuthenticationService } from '../components/login-page/services/authentication.service';
//
// describe('AuthGuardService', () => {
//   let service: AuthGuardService;
//   let mockAuthService: AuthenticationService;
//   beforeEach(() => {
//     mockAuthService = jasmine.createSpyObj(
//       'AuthService',
//       [],
//       ['isAuthenticated'],
//     );
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: AuthenticationService,
//           useValue: mockAuthService,
//         },
//       ],
//     });
//     service = TestBed.inject(AuthGuardService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
