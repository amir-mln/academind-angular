import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() routerHandler = new EventEmitter();

  onLinkClick(e: MouseEvent) {
    e.preventDefault();
    console.log((e!.target as HTMLAnchorElement).title);
    this.routerHandler.emit((e!.target as HTMLAnchorElement).title);
  }
  constructor() {}
  ngOnInit(): void {}
}
