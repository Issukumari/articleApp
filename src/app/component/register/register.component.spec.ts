import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({ template: '' })
class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: RouterStub;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    mockRouter = new RouterStub();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register form on init', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.controls['name'].valid).toBeFalsy();
    expect(component.registerForm.controls['email'].valid).toBeFalsy();
    expect(component.registerForm.controls['password'].valid).toBeFalsy();
  });

  it('should register user and navigate to login on successful registration', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    mockAuthService.register.and.returnValue(of(mockUser));

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onRegister();

    expect(mockAuthService.register).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

});
