import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusLocation } from '../../interface/bus.interface';
import { BusService } from '../../services/bus.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-location-dropdown',
  imports: [FormsModule, CommonModule],
  templateUrl: './location-dropdown.component.html',
  styleUrl: './location-dropdown.component.css'
})
export class LocationDropdownComponent implements OnInit {
  @Input() label: string = 'Location';
  @Input() icon: string = 'fa-map-marker-alt';
  @Input() options: { id: number, name: string }[] = [];
  //@Input() selectedValue: number | string | null  = '';
  @Input({required: true}) selectedValue!: ReturnType<typeof signal<number>>;

  @Output() selectedValueChange = new EventEmitter<number | string| null>();

  private destroyRef = inject(DestroyRef);
  busService = inject(BusService);

  busLocationList: BusLocation[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.getLocations();
  }

  // onValueChange(value: any) {
  //   this.selectedValue = value;
  //   this.selectedValueChange.emit(this.selectedValue);
  // }

  // signal version
  onValueChange(value: number) {
    this.selectedValue.set(value);
  }

  getLocations() {
    this.busService.getLocations().pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((result: any) => {
      this.busLocationList = result;
    });
  }

}
