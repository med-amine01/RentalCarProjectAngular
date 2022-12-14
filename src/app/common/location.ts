import {Car} from "./car";
import {User} from "./user";

export class Location {
  id!:number;
  startDate!:Date;
  endDate!:Date;
  price!:number;
  user!: User;
  car !: Car;
}
