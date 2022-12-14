import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location.service";
import {Location} from "../../common/location";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit{

  location : Location[] = [];
  constructor(private locationService: LocationService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.getLocations()
  }

  getLocations() {

    this.locationService.getAllLocations().subscribe(
      data =>{
        this.location = data
      }
    );
  }
}
