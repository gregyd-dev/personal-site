import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 

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
}
