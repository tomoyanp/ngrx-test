import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private sidenavStatus: boolean = true;
  @Output() sidenavStatusEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeSidenavStatus(): void {
    this.sidenavStatus = !this.sidenavStatus;
    this.sidenavStatusEvent.emit(this.sidenavStatus);
  }

}
