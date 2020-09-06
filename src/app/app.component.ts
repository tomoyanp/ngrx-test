import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tomoyanpy-blog';
  opened: boolean = true;

  onReceiveSidenavStatus($event): void {
    this.opened = $event;
  }
}
