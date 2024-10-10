import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  getImages() {
    return [
      {
        itemImageSrc: '../../assets/images/quiz-banner-home.png',
        thumbnailImageSrc: '../../assets/images/quiz-banner-home.png',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: '../../assets/images/quiz-banner-2.png',
        thumbnailImageSrc: '../../assets/images/quiz-banner-2.png',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
      // Add more images here...
    ];
  }
}
