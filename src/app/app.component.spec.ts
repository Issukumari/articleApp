import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './component/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component'
import { By } from '@angular/platform-browser';
import { AuthService } from './service/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        RouterOutlet,
        CommonModule, // CommonModule is needed for common Angular directives like ngIf, ngFor
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService },
   
    
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });



  it('should render header component', () => {
    fixture.detectChanges();
    const header = fixture.debugElement.queryAll(By.directive(HeaderComponent));
    expect(header.length).toBeGreaterThan(0); 
  });
});
