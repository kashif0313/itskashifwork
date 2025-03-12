import { Component, OnInit } from '@angular/core';
import { helperFunctions } from '../helpers/helperFunctions';

@Component({
  selector: 'app-clients',
  standalone: false,

  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  clients: any = [];
  activeIndex = 0;
  loading: boolean = true;

  constructor(private helperFunction: helperFunctions) {}

  async ngOnInit() {
    this.clients = await this.helperFunction.getClients();
    this.loading = false;
    this.startClientAnimation();
  }

  startClientAnimation() {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.clients.length;
    }, 3000); // Change every 3 seconds
  }
}
