import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorService } from '../../service/author.service';
import { of } from 'rxjs';
import { AuthorDirectoryComponent } from '../author-directory/author-directory.component';

describe('AuthorDirectoryComponent', () => {
  let component: AuthorDirectoryComponent;
  let fixture: ComponentFixture<AuthorDirectoryComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;

  const mockAuthors :any= [
    { id: 1, author: 'Author 1', bio: 'Bio 1' },
    { id: 2, author: 'Author 2', bio: 'Bio 2' },
    { id: 3, author: 'Author 3', bio: 'Bio 3' }
  ];

  beforeEach(async () => {
    const authorServiceSpy = jasmine.createSpyObj('AuthorService', ['getAuthors']);

    await TestBed.configureTestingModule({
      imports: [AuthorDirectoryComponent], 
      providers: [
        { provide: AuthorService, useValue: authorServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDirectoryComponent);
    component = fixture.componentInstance;
    authorService = TestBed.inject(AuthorService) as jasmine.SpyObj<AuthorService>;

    authorService.getAuthors.and.returnValue(mockAuthors);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load authors on ngOnInit', () => {
    component.ngOnInit();
    expect(component.authors).toEqual(mockAuthors);
    expect(component.filteredAuthors).toEqual(mockAuthors);
  });

  it('should reset filtered authors when search query is empty', () => {
    component.ngOnInit();
    component.searchQuery = '';
    component.filterAuthors();
    expect(component.filteredAuthors).toEqual(mockAuthors);
  });

  
});
