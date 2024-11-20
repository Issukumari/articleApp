import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { ArticleService } from '../../service/article.service';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Article } from '../../model/article.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    articleService = jasmine.createSpyObj('ArticleService', ['someMethod']);

    await TestBed.configureTestingModule({
      imports: [CarouselComponent, RouterModule, NgIf, NgFor, NgClass],
      providers: [{ provide: ArticleService, useValue: articleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize images from listings on ngOnInit', () => {
    
    const mockListings: Article[] = [
      { id: 1, content: { image: 'image1.jpg' } } as Article,
      { id: 2, content: { image: 'image2.jpg' } } as Article,
    ];

    component.listings = mockListings;

        component.ngOnInit();

    expect(component.images).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('should navigate to the previous image correctly', () => {
    
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 1;

        component.previousImage();

    expect(component.currentIndex).toBe(0);
  });

  it('should navigate to the next image correctly', () => {
    
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 1;

    component.nextImage();

    expect(component.currentIndex).toBe(2);
  });

  it('should loop to the first image when nextImage is called on last image', () => {
    
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 2;

    component.nextImage();

    expect(component.currentIndex).toBe(0);
  });

  it('should loop to the last image when previousImage is called on first image', () => {
    
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentIndex = 0;

        component.previousImage();

    expect(component.currentIndex).toBe(2);
  });

  it('should mark a listing as favorite', () => {
    
    const mockListings: Article[] = [
      { id: 1, isFavourite: false } as Article,
      { id: 2, isFavourite: false } as Article,
    ];
    component.listings = mockListings;

        component.markAsFavorite(1);

    expect(component.listings[0].isFavourite).toBeTruthy();
    expect(component.listings[1].isFavourite).toBeFalsy();
  });

  it('should toggle the favorite status correctly', () => {
    
    const mockListings: Article[] = [
      { id: 1, isFavourite: true } as Article,
      { id: 2, isFavourite: false } as Article,
    ];
    component.listings = mockListings;

     component.markAsFavorite(1);

    expect(component.listings[0].isFavourite).toBeFalsy();
  });
});
