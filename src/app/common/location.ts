import {Client} from "./client";
import {Car} from "./car";

export class Location {
  id!:number;
  startDate!:Date;
  endDate!:Date;
  price!:number;


  //TODO : change this
  client!:Client;
  car !: Car;
}
