import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validator-analytics',
  templateUrl: './validator-analytics.component.html',
  styleUrls: ['./validator-analytics.component.css']
})
export class ValidatorAnalyticsComponent implements OnInit {
  approved:any;
  rejected:any;
  constructor() { }

  ngOnInit(): void {
  }

}