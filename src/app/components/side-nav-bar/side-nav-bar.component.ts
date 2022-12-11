import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {
  constructor(public userService:UserService) {
  }
}
