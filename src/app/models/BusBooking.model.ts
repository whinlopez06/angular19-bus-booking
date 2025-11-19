export class Booking {
  bookingId: number;
  customerId: number;
  bookingDate: Date;
  scheduleId: number;
  busBookingPassengers: BusBookingPassenger[];

  constructor() {
    this.bookingId = 0;
    this.customerId = 0;
    this.bookingDate = new Date();
    this.scheduleId = 0;
    this.busBookingPassengers = [];
    }
}

export class BusBookingPassenger {
  passengerId?: number;
  bookingId?: number;
  passengerFullname: string;
  emailAddress: string;
  age: number;
  gender: string;
  seatNo: number;

  constructor() {
    this.passengerId = 0;
    this.bookingId = 0;
    this.passengerFullname = "";
    this.emailAddress = "";
    this.age = 0;
    this.gender = "";
    this.seatNo = 0;
  }

}
