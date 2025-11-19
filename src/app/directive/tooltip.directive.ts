import { Directive, Input, ElementRef, HostListener, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {

  @Input('appTooltip') tooltipText = '';
  @Input() showDelay = 300;
  @Input() hideDelay = 3000;

  private tooltipElement: HTMLElement | null = null;
  private showTimeoutId: any;
  private hideTimeoutId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.clearHideTimeout();
    this.showTimeoutId = setTimeout(() => {
      this.createTooltip();
    }, this.showDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.clearShowTimeout();
    this.startHideTimeout();
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
    this.clearShowTimeout();
    this.clearHideTimeout();
  }

  private createTooltip() {
    if (this.tooltipElement) { return; }

    const hostPos = this.el.nativeElement.getBoundingClientRect();

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(
      document.body,
      this.tooltipElement
    );
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');

    this.renderer.setProperty(
      this.tooltipElement,
      'innerText',
      this.tooltipText
    );

    // position: below the host element, centered horizontally
    const top = hostPos.bottom + 8;  // 8px offset
    const left = hostPos.left + (hostPos.width / 2);

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'transform', 'translateX(-50%)');

    // optional: auto-hide after some time
    if (this.hideDelay) {
      this.hideTimeoutId = setTimeout(() => {
        this.destroyTooltip();
      }, this.hideDelay);
    }
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private startHideTimeout() {
    // short delay before hide so that if we re-enter quickly, it may stay
    this.hideTimeoutId = setTimeout(() => {
      this.destroyTooltip();
    }, 100);
  }

  private clearShowTimeout() {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  private clearHideTimeout() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }

}
