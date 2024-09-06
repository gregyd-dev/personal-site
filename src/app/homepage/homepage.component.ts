import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WorkexpComponent } from '../workexp/workexp.component';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [WorkexpComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],  // Corrected styleUrl to styleUrls
})

export class HomepageComponent implements OnInit {
  originalName = 'Gregyd';
  newName = 'Gregory Deng';
  typingSpeed = 100;
  deletingSpeed = 100;
  delayBeforeTyping = 400;
  delayAfterTyping = 600;
  delayAfterDelete = 250;

  constructor(private scrollService: ScrollService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.typeAndReplace();
    }, this.delayBeforeTyping);
  }

  typeAndReplace() {
    const nameElement = this.el.nativeElement.querySelector('#name-text');

    if (nameElement) {
      this.typeText(nameElement, this.originalName, () => {
        setTimeout(() => {
          this.deleteText(nameElement, this.originalName.length, () => {
            setTimeout(() => {
              this.typeText(nameElement, this.newName);
            }, this.delayAfterDelete);
          });
        }, this.delayAfterTyping);
      });
    }
  }

  typeText(element: HTMLElement, text: string, callback?: () => void) {
    let i = 0;
    
    // Clear the existing text content before starting to type
    this.renderer.setProperty(element, 'textContent', '');
  
    const interval = setInterval(() => {
      if (i < text.length) {
        this.renderer.setProperty(element, 'textContent', element.textContent + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, this.typingSpeed);
  }

  deleteText(element: HTMLElement, length: number, callback?: () => void) {
    let i = length;
    const interval = setInterval(() => {
      if (i > 0) {
        this.renderer.setProperty(element, 'textContent', element.textContent!.slice(0, -1));
        i--;
      } else {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, this.deletingSpeed);
  }

  @ViewChild('landingpage') landingpage!: ElementRef;

  ngAfterViewInit(): void {
    // Register the landingpage element with the ScrollService
    this.scrollService.setLandingPageElement(this.landingpage.nativeElement);

    // Listen to scroll events
    this.landingpage.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    const scrollTop = this.landingpage.nativeElement.scrollTop;
    const scrollHeight = this.landingpage.nativeElement.scrollHeight;
    const clientHeight = this.landingpage.nativeElement.clientHeight;

    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

    // Update the scroll position in the ScrollService
    this.scrollService.updateScrollPosition(scrollPercent);
  }
}