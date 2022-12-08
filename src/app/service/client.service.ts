import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../common/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientApiUrl = 'http://localhost:8080/api/clients';
  constructor(private httpClient : HttpClient) { }

  addNewClient(client: Client){
    return this.httpClient.post(this.clientApiUrl,client);
  }
}
