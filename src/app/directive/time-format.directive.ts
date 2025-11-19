import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appTimeFormat]',
  standalone: true,
  providers: [DatePipe]
})
export class TimeFormatDirective implements OnChanges {
  @Input('appTimeFormat') timeString: string | null | undefined = null;

  constructor(private el: ElementRef, private datePipe: DatePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('timeString' in changes) {
      this.updateTime();
    }
  }

  private updateTime(): void {
    if (!this.timeString) {
      this.el.nativeElement.textContent = 'No time';
      return;
    }

    const formatted = this.datePipe.transform(`1970-01-01T${this.timeString}`, 'hh:mm a');
    this.el.nativeElement.textContent = formatted ?? 'Invalid time';
  }

}
