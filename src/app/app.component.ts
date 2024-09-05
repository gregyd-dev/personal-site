import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { SocialsbarComponent } from './socialsbar/socialsbar.component';
import { WorkexpComponent } from './workexp/workexp.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, SocialsbarComponent, WorkexpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'personal-site';
}
