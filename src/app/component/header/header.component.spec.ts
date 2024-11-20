import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {  throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,  
        RouterTestingModule 
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    component.goHome();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to login if not authenticated when clicking goHome', () => {
    authService.isAuthenticated.and.returnValue(false);

    component.goHome();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to login when clicking openLogin', () => {
    component.openLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register when clicking openRegister', () => {
    component.openRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should navigate to create post if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    component.createPost();

    expect(router.navigate).toHaveBeenCalledWith(['/createpost']);
  });

  it('should navigate to login if not authenticated when clicking createPost', () => {
    authService.isAuthenticated.and.returnValue(false);

    component.createPost();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });



  it('should handle logout error', () => {
    const error = new Error('Logout failed');
    authService.logout.and.returnValue(throwError(error));

    spyOn(console, 'error'); 
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Logout error:', error);
  });
});
