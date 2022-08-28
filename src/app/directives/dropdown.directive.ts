import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostListener('click') click($event: MouseEvent) {
    this.open = !this.open;
  }

  @HostBinding('class.open') open = false;

  constructor() {}
  ngOnInit(): void {}
}
