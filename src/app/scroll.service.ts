import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPosition = new BehaviorSubject<number>(0); // Initial scroll position
  currentScrollPosition = this.scrollPosition.asObservable();
  private landingPageElement: HTMLElement | null = null;

  updateScrollPosition(position: number): void {
    this.scrollPosition.next(position); // Update the scroll position
  }

    // Method to set the landing page element reference
    setLandingPageElement(element: HTMLElement): void {
      this.landingPageElement = element;
    }
  
    // Method to programmatically scroll to a percentage
    scrollToPosition(scrollPercent: number): void {
      if (this.landingPageElement) {
        const scrollHeight = this.landingPageElement.scrollHeight;
        const clientHeight = this.landingPageElement.clientHeight;
  
        // Calculate the scroll position in pixels
        const scrollPosition = ((scrollHeight - clientHeight) * scrollPercent) / 100;
        this.landingPageElement.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    }
}