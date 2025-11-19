import { Component, DestroyRef, inject, OnInit, viewChild, signal, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LocationDropdownComponent } from '../../reusable/location-dropdown/location-dropdown.component';
import { BusScheduleService } from '../../services/bus-schedule.service';
import { BusDetailService } from '../../services/bus-detail.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimeDifferencePipe } from '../../pipes/time-difference.pipe';
import { BusDetailBusApi } from '../../interface/busDetail.interface';
import { BusSchedule, BusScheduleApi, BusScheduleList2Api } from '../../interface/busSchedule.interface'

@Component({
  selector: 'app-bus-scheduling',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LocationDropdownComponent, TimeDifferencePipe],
  templateUrl: './bus-scheduling.component.html',
  styleUrl: './bus-scheduling.component.css'
})
export class BusSchedulingComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  busScheduleService = inject(BusScheduleService);
  busDetailService = inject(BusDetailService);

  dropDownFromLocationValue = signal<number>(0);
  dropDownToLocationValue = signal<number>(0);
  selectedOption: string = 'option1';
  busIndexValue: number = 0;
  operatorName: string = "";
  seatCapacity: number = 0;

  busDetails: BusDetailBusApi[] = [];
  busScheduleList = signal<BusScheduleList2Api[]>([]);
  // busScheduleForm: FormGroup = new FormGroup({
  //   busDetailId: new FormControl("", [Validators.required]),
  //   fromLocationId: new FormControl
  // });

  busScheduleParams: BusSchedule = {
    busDetailId: 0,
    fromBusLocationId: 0,
    toBusLocationId: 0,
    departureTime: "",
    arrivalTime: "",
    scheduleDate: ""
  }

  busScheduleParamsApi!: BusScheduleApi;
  //busScheduleParamsApi: BusScheduleApi | null = null;


  constructor() {
    effect(() => {
      console.log('Signal dropDownFromLocationValue:..', this.dropDownFromLocationValue());
      console.log('Signal dropDownToLocationValue:..', this.dropDownToLocationValue());
    });
  }

  ngOnInit(): void {
    this.getBusesName();
    this.getBusSchedules();
  }

  handleOnChildFromLocation(value: any) {
    console.log('handleOnChangeFromLocation - value:...', value);
    this.busScheduleParams.fromBusLocationId = Number(value);
  }

  handleOnChildToLocation(value: any) {
    console.log('handleOnChangeToLocation - value:...', value);
    this.busScheduleParams.toBusLocationId = Number(value);
  }

  dateRadioChange(optionName: string) {
    this.selectedOption = optionName;
    console.log('selectedOption:...', this.selectedOption);
  }

  getBusesName() {
    this.busDetailService.getBusesDetail()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((result: any) => {
      this.busDetails = result;
      console.log('busDetails:...', this.busDetails);
    });
  }

  onBusChange(event: any) {
    const select = event.target as HTMLSelectElement;
    const selectedIndex = select.selectedIndex; // subtract 1 for the please select bus
    console.log('selectedIndex:...', selectedIndex);
    if (selectedIndex > 0) {
      this.operatorName = this.busDetails[selectedIndex - 1].operator_name;
      this.seatCapacity = this.busDetails[selectedIndex - 1].seat_capacity;
      this.busScheduleParams.busDetailId = this.busDetails[selectedIndex -1].id;  // bus_detail_id

    } else {
      this.operatorName = "";
    }
  }

  getBusSchedules() {
    this.busScheduleService.getBusSchedules()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: BusScheduleList2Api[]) => {
      this.busScheduleList.set(response);
    });
  }

  createBusSchedule() {
    // console.log('departureTime:...', this.departureTime);
    // console.log('arrivalTime:...', this.arrivalTime);
    //this.BusScheduleService.createBusSchedule();
    console.log('busScheduleParams:...', this.busScheduleParams);

    this.busScheduleParamsApi = {
      bus_detail_id: this.busScheduleParams.busDetailId,
      from_bus_location_id: this.dropDownFromLocationValue(),
      to_bus_location_id: this.dropDownToLocationValue(),
      departure_time: this.busScheduleParams.departureTime,
      arrival_time: this.busScheduleParams.arrivalTime,
      schedule_date: this.busScheduleParams.scheduleDate
    }

    this.busScheduleService.createBusSchedule(this.busScheduleParamsApi)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: any) => {
      console.log('response:...', response);
      alert(response.message);
      this.getBusSchedules();
      this.clearFields();
    });

  }

  clearFields() {
    this.busScheduleParams = {
      busDetailId: 0,
      fromBusLocationId: 0,
      toBusLocationId: 0,
      departureTime: "",
      arrivalTime: "",
      scheduleDate: ""
    }
    this.dropDownFromLocationValue.set(0);
    this.dropDownToLocationValue.set(0);
    this.busIndexValue = 0;
    this.operatorName = "";
    this.seatCapacity = 0;
  }

}
