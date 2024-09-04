import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'homepage',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})

export class Homepage implements OnInit {
  originalName = 'Gregyd';
  newName = 'Gregory Deng';
  typingSpeed = 100; 
  deletingSpeed = 100; 
  delayBeforeTyping = 400;
  delayAfterTyping = 600;
  delayAfterDelete = 250;

  ngOnInit() {
    setTimeout(() => {
      this.typeAndReplace();
    }, this.delayBeforeTyping)
  }

  typeAndReplace() {
    const nameElement = document.getElementById('name-text');

    if (nameElement) {
      this.typeText(nameElement, this.originalName, () => {
        setTimeout(() => {
          this.deleteText(nameElement, this.originalName.length, () => {
            setTimeout(() => {
              this.typeText(nameElement, this.newName);
            }, this.delayAfterDelete)
          });
        }, this.delayAfterTyping);
      });
    }
  }

  typeText(element: HTMLElement, text: string, callback?: () => void) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
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
        element.textContent = element.textContent!.slice(0, -1);
        i--;
      } else {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, this.deletingSpeed);
  }
}
