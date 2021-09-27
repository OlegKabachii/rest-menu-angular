import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  toggleChanged = false
  managerState = false

  onToggle() {
    this.toggleChanged = !this.toggleChanged
  }

  onSwitched(event: any) {
    this.managerState = event
  }
}
