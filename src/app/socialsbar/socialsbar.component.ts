import { Component, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ScrollService } from '../scroll.service'

@Component({
  selector: 'app-socialsbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socialsbar.component.html',
  styleUrls: ['./socialsbar.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SocialsbarComponent {
  isPopupVisible = false;

  // Method to copy to clipboard and show the popup
  copyEmail(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showPopup();
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  // Method to show the popup with fade-in effect
  showPopup() {
    this.isPopupVisible = true;

    // Hide the popup after 2 seconds with a fade-out effect
    setTimeout(() => {
      this.isPopupVisible = false; // Trigger fade-out after 2 seconds
    }, 1300);
  }

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Subscribe to the scroll position updates
    this.scrollService.currentScrollPosition.subscribe((scrollPercent: number) => {
      this.updateActiveItem(scrollPercent);
    });
  }

  updateActiveItem(scrollPercent: number): void {
    const scrollItems = document.querySelectorAll('.scrollpos-item');
    const scrollItemsBars = document.querySelectorAll('.scrollpos-item-bar');

    // Remove 'active' class from all items
    scrollItems.forEach(item => item.classList.remove('active'));
    scrollItemsBars.forEach(item => item.classList.remove('active'));

    // Apply the 'active' class based on the scroll percentage
    if (scrollPercent > 4 && scrollPercent <= 100) {
      scrollItems[0].classList.add('active'); // Highlight EXPERIENCE
      scrollItemsBars[0].classList.add('active'); // Highlight EXPERIENCE
    } else if (scrollPercent >= 33 && scrollPercent < 66) {
      scrollItems[1].classList.add('active'); // Highlight PROJECTS
      scrollItemsBars[1].classList.add('active'); // Highlight EXPERIENCE
    } else if (scrollPercent > 66) {
      scrollItems[2].classList.add('active'); // Highlight ABOUT ME
      scrollItemsBars[2].classList.add('active'); // Highlight EXPERIENCE
    }
  }

  scrollTo(scrollPercent: number): void {
    // Use the ScrollService to trigger scrolling
    this.scrollService.scrollToPosition(scrollPercent);
  }
}
