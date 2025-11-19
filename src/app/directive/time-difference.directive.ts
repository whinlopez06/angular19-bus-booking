import { DatePipe } from '@angular/common';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTimeDifference]',
  standalone: true,
  providers: [DatePipe]
})
export class TimeDifferenceDirective implements OnChanges {

  @Input('departureTime') departureTime: string | null = null;
  @Input('arrivalTime') arrivalTime: string | null = null;


  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departureTime'] || changes['arrivalTime']) {
      this.updateDifference();
    }
  }

  private updateDifference(): void {
    let result = '';
    if (!this.departureTime || !this.arrivalTime) {
      result = '';
    } else {
      const [sh, sm] = this.departureTime.split(':').map(Number);
      const [eh, em] = this.arrivalTime.split(':').map(Number);

      if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) {
        result = '';
      } else {
        let startMinutes = sh * 60 + sm;
        let endMinutes = eh * 60 + em;

        // handle overnight (end time after midnight)
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60;
        }

        const diff = endMinutes - startMinutes;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        result = `${h}h ${m}m`;
      }
    }
    this.el.nativeElement.textContent = result.trim();
  }

}
