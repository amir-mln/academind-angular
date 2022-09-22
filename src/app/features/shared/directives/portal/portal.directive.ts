import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[portalTemplate]' })
export class PortalDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
