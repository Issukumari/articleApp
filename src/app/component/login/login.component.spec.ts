
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../service/auth.service';
import { ArticleService } from '../../service/article.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['userNameSubject']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    articleService = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message if login fails', () => {
    const errorMock = new Error('Invalid credentials');
    authService.login.and.returnValue(throwError(errorMock)); 

    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
    expect(router.navigate).not.toHaveBeenCalled(); 
  });

  it('should set errorMessage to empty after 1 second on failure', (done) => {
    const errorMock = new Error('Invalid credentials');
    authService.login.and.returnValue(throwError(errorMock));

    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.onLogin();

    setTimeout(() => {
      expect(component.errorMessage).toBe('');
      done();
    }, 1000);
  });

  it('should mark the form as invalid if email or password are missing', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalsy();
  });
});
