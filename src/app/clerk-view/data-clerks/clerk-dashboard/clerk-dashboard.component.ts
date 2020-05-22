

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { clerk_analytics_url } from '../../../app.constants';
import {SurveyService } from '../../services/survey.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-clerk-dashboard',
  templateUrl: './clerk-dashboard.component.html',
  styleUrls: ['./clerk-dashboard.component.css']
})
export class ClerkDashboardComponent implements OnInit {
  transactionseries: any = [];
  monthseries: any = [];
  tenant_tag: string;
  uploaded: number;
  pending: number;
  approved: number;
  rejected: number;
  public filterForm: FormGroup;

  constructor(public surveyService: SurveyService, private formBuilder: FormBuilder, ) {
    this.filterForm = this.formBuilder.group({
      from_date: new FormControl('', Validators.compose([Validators.required])),
      to_date: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
   }

  ngOnInit() {
    this.fetchreport();
    this.fetchrecordanalytics();

  }
  // fetchpermissions(){
  //   var permisions = NgxPermissionsService.get
  // }
  fetchrecordanalytics() {
    this.surveyService.getrecord(clerk_analytics_url).subscribe((res) => {
      this.uploaded = res['uploaded'];
      this.pending = res['pending'];
      this.approved = res['approved'];
      this.rejected = res['rejected'];


    });

  }

  fetchreport() {
    this.surveyService.getrecord(clerk_analytics_url).subscribe((res) => {
      this.uploaded = res['uploaded'];
      this.pending = res['pending'];
      this.approved = res['approved'];
      this.rejected = res['rejected'];


    });
    // this.garbagecollectionService.getCollectionvalues().subscribe((response)=>{
     const response = [
        {
            'month':'Jan',
            'collectionvalue':'100'
        },
        {
            'month':'Feb',
            'collectionvalue':'200'
        },
        {
            'month':'Mar',
            'collectionvalue':'300'
        },
        {
            'month':'Apr',
            'collectionvalue':'500'
        },
        {
            'month':'May',
            'collectionvalue':'300'
        },
        {
            'month':'Jun',
            'collectionvalue':'340'
        },
        {
            'month':'Jul',
            'collectionvalue':'255'
        },

        {
            'month':'Aug',
            'collectionvalue':'267'
        },
        {
            'month':'Sep',
            'collectionvalue':'189'
        },
        {
            'month':'Oct',
            'collectionvalue':'309'
        },
        {
            'month':'Nov',
            'collectionvalue':'457'
        },
        {
            'month':'Dec',
            'collectionvalue':'250'
        }

    ];

      const alldata = response;
      for (const data of alldata) {
        this.monthseries.push(data['month']);
        this.transactionseries.push(
          parseInt(data['collectionvalue']));

      }
      const seriesdata = [{
        'name':'Total',
        'data': this.transactionseries
      }

      ];
      this.showchart(this.monthseries, seriesdata);
    // })
  }
  showchart(monthseriesinfo, transactionseriesinfo) {

    Highcharts.chart('analyticscontainer', {
      colors: ['#5D2CA4'],
      chart: {
          type: 'column'
      },
      title: {
        text: 'Job Statistics'
    },
    xAxis: {
      categories: monthseriesinfo,
  },
  yAxis: {
      title: {
          text: 'No of Documents'
      }

  },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 550,
          y: 100,
          floating: true,
          borderWidth: 1

      },
      exporting: {
          buttons: {
            contextButton: {
              enabled: false
            },
            printButton: {
                enabled: false,
            },
          }
        },

      tooltip: {
          shared: true,
          valuePrefix: ''
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      },
      series: transactionseriesinfo
  });


  }


}
