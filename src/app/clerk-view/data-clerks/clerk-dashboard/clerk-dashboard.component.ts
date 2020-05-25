

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SurveyService} from '../../services/survey.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DateService } from '../../../common-module/shared-service/date.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { data_clerk_analytics_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
@Component({
  selector: 'app-clerk-dashboard',
  templateUrl: './clerk-dashboard.component.html',
  styleUrls: ['./clerk-dashboard.component.css']
})
export class ClerkDashboardComponent implements OnInit {
  todays_date_start = new Date();
  todays_date_start_hours = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  todays_date_end_hours = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  public filterForm: FormGroup;
  filterformstatus = false;
  all_users = [];
  all_departments = [];
  allfieldsstatus = [];
  isVisualizationCollapsed: boolean = true;
  isTabularCollapsed: boolean = true;
  isFilterCollapsed: boolean = false;
  searchString: string;
  records = [];
  uploaded = 0;
  pending = 0;
  approved = 0;
  rejected = 0;
  total_documents = 0;
  logged_in_user_id = '';
  logged_in_user__department_id = '';
  fetch_records = [];
  constructor(public surveyService: SurveyService, private formBuilder: FormBuilder,
    public dateService: DateService,
    public loadingService: LoadingService, public toastService: ToastService,
    public sweetalertService: SweetalertService,
    public authService: AuthenticationService, ) {

    this.filterForm = this.formBuilder.group({
      from_date: new FormControl('', Validators.compose([Validators.required])),
      to_date: new FormControl('', Validators.compose([Validators.required])),
      // department: new FormControl('', Validators.compose([Validators.required])),
      // users: new FormControl('', Validators.compose([Validators.required])),
    });
    const populate_form_values = {
      'from_date': this.todays_date_start_hours,
      'to_date': this.todays_date_end_hours,
    };
    this.filterForm.patchValue(populate_form_values);
    this.fetchuserDetails();

   }

  ngOnInit() {
    this.fetchinitial_data();


  }
  fetchuserDetails() {
    this.authService.getuserprofileInfo().then((res) => {

      this.logged_in_user_id = res['user_id'];
      this.logged_in_user__department_id = res['department_id'];
    });
  }
  fetchinitial_data ( ) {


    const payload = {
      'from_date': this.todays_date_start_hours,
      'to_date': this.dateService.convertDate(this.todays_date_end_hours),
      'department_id': this.logged_in_user__department_id,
      'user_id': this.logged_in_user_id
    };
    this.fetchdashboardrecords(payload);


  }

  fetchdashboardrecords(payload ) {
    this.loadingService.showloading();
    this.surveyService.getrecorddetail(data_clerk_analytics_url, payload).subscribe((res) => {
      this.destroy_chart();
      const approved_documents: any = 0;
      const rejected_documents: any = 0;
      const revoked_documents: any = 0;
      const uploaded_documents: any = 0;
      const metadata_captured_documents: any = 0;
      const resubmitted_documents: any = 0;
      const returned_records: [] = res['records'];
      const total_count: any = res['total_count'];
      this.allfieldsstatus.length = 0;
      if (total_count > 0) {
        this.records = returned_records;

        console.log(this.records );

        for (const records of returned_records) {
          this.fetch_records.push({
            'name': records['document_status'],
            'y': parseInt(records['total_count'], 10),
          });
          this.total_documents += parseInt(records['total_count'], 10);
        }

        this.drawpiechartanalytics(this.fetch_records);
        this.isVisualizationCollapsed = false;
        this.isTabularCollapsed = true;
        this.isFilterCollapsed = true;

      } else {

        this.allfieldsstatus.length = 0;
        this.records = [];
        // this.toastService.showToastNotification('warning', 'No Records Found Within the Search Criteria', '');
        // this.drawpiechartanalytics([]);
        this.isVisualizationCollapsed = true;
        this.isTabularCollapsed = false;
        this.isFilterCollapsed = false;
      }


      this.loadingService.hideloading();
    });

  }
  filterrecords() {
    if (this.filterForm.valid) {
      const payload = {
        'from_date': this.dateService.convertDate(this.filterForm.value['from_date']),
        'to_date': this.dateService.convertDate(this.filterForm.value['to_date']),
        'department_id': this.logged_in_user__department_id,
        'user_id': this.logged_in_user_id
      };
      this.fetchdashboardrecords(payload);





    } else {
      this.filterformstatus = true;
      this.toastService.showToastNotification('error', 'Kindly correct the highlighted errors to proceed', '');

    }


  }
  destroy_chart() {
    const chart = Highcharts.chart('analyticscontainer', {});
    chart.destroy();
   }
drawpiechartanalytics(chartseriesdata) {

  const seriesdata: any = [{ name: 'Total', colorByPoint: true, data: chartseriesdata }];
  Highcharts.chart('analyticscontainer', {

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      // text: 'Connections by Status'
      text: '.'
    },
    credits: {
      enabled: false
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
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
      pie: {

        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: seriesdata
  });


}





}
