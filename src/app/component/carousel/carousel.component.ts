import { Component, Input } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ArticleService } from '../../service/article.service';
import { Article } from '../../model/article.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterModule,NgIf,NgFor,NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  constructor(private readonly articleService:ArticleService
  ) {}
  highLightingData: any[] = []; 
  @Input() listings: Article[] = [];
  images: any[] = [];
  ngOnInit(): void {
    this.images = this.listings.map(listing => listing.content?.image);
  }
  currentIndex: number = 0;
  previousImage() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  markAsFavorite(listingId: number) {
    const listing = this.listings.find(l => l.id === listingId);
    
    if (listing) {
      const updatedListing = { ...listing, isFavourite: !listing.isFavourite };
            this.listings = this.listings.map(l => l.id === listingId ? updatedListing : l);
    }
  }
  

}
