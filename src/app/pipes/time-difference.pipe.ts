import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff',
  standalone: true,
  pure: true
})
export class TimeDifferencePipe implements PipeTransform {

  transform(startTime: string, endTime: string): string {
      if (!startTime || !endTime) return '';

      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);

      if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return '';

      let startMinutes = sh * 60 + sm;
      let endMinutes = eh * 60 + em;

      // handle overnight (end time after midnight)
      if (endMinutes < startMinutes) {
        endMinutes += 24 * 60;
      }

      const diff = endMinutes - startMinutes;
      const h = Math.floor(diff / 60);
      const m = diff % 60;

      return `${h}h ${m}m`;
  }

}
