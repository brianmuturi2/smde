import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { DateService } from '../../common-module/shared-service/date.service';
import { AnalyticsService } from '../services/analytics.service';
import { data_validators_analytics_url, list_data_validators_url, list_departments_url } from '../../app.constants';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
export interface DocumentsList {
  id: string;
  user__last_name: string;
  user__first_name: string;
  user__username: string;
  document__department__name: string;
  rejected_documents: string;
  approved_documents: string;
  revoked_documents: string;
  resubmitted_documents: string;
  total_count: string;
  document_status: string;
}

@Component({
  selector: 'app-data-analyst-analytics',
  templateUrl: './data-analyst-analytics.component.html',
  styleUrls: ['./data-analyst-analytics.component.css']
})


export class DataAnalystAnalyticsComponent implements OnInit, AfterViewInit {
  public filterForm: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  filterformstatus = false;
  all_users = [];
  all_departments = [];
  allfieldsstatus = [];
  isVisualizationCollapsed: boolean = true;
  isTabularCollapsed: boolean = true;
  isFilterCollapsed: boolean = false;
  records: DocumentsList[] = [];
  searchString: string;
  constructor(private formBuilder: FormBuilder,
    public loadingService: LoadingService, public toastService: ToastService,
    public sweetalertService: SweetalertService, public dateService: DateService,
    public analyticsService: AnalyticsService) {
    this.filterForm = this.formBuilder.group({
      from_date: new FormControl('', Validators.compose([Validators.required])),
      to_date: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }


  ngOnInit(): void {
    this.fetchdepartments();
    this.fetchdataclerks();
    this.initializetable();

  }
  initializetable() {
    this.dtOptions = {

      pagingType: 'full_numbers',
      responsive: true,
      pageLength: 5,
      retrieve: true,
      destroy: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
      data: [],
      lengthChange: true,

      // pagingType: 'full_numbers',
      // responsive: true,
      // 'columnDefs': [ {'targets': 0,'checkboxes': {'selectRow': true} }],
      // 'select': {'style': 'multi'},
      // 'order': [[1, 'asc']],"lengthChange": true,
      // "searching": true,"ordering": true,
      // "info": true,"scrollX": true,
      // destroy : true,
      // // "scrollY":"500px","scrollCollapse": true,
      // "paging":true,"data": [],
      // "retrieve": true



    };

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  fetchdataclerks() {
    const params = {
    };
    this.analyticsService.getrecords(list_data_validators_url, params).subscribe((res) => {
      this.all_users = res;
    });
  }
  fetchdepartments() {
    const params = {
    };
    this.analyticsService.getrecords(list_departments_url, params).subscribe((res) => {
      this.all_departments = res;
    });
  }

  filterrecords() {
    if (this.filterForm.valid) {
      const payload = {
        'from_date': this.dateService.convertDate(this.filterForm.value['from_date']),
        'to_date': this.dateService.convertDate(this.filterForm.value['to_date']),
        'department_id': this.filterForm.value['department'],
        'user_id': this.filterForm.value['users']
      };
      this.loadingService.showloading();

      this.analyticsService.getrecords(data_validators_analytics_url, payload).subscribe((res) => {
        
        this.destroy_chart();
        let approved_documents: any = 0;
        let rejected_documents: any = 0;
        let revoked_documents: any = 0;
        let uploaded_documents: any = 0;
        let metadata_captured_documents: any = 0;
        let resubmitted_documents: any = 0;
        const returned_records: [] = res['records'];
        const total_count: any = res['total_count'];

        // this.dtTrigger.next();

        this.allfieldsstatus.length = 0;
        if (total_count > 0) {
         
          this.records = returned_records;

          for (const records of returned_records) {

            approved_documents += parseInt(records['approved_documents'], 10);
            rejected_documents += parseInt(records['rejected_documents'], 10);
            revoked_documents += parseInt(records['revoked_documents'], 10);
            uploaded_documents += parseInt(records['uploaded_documents'], 10);
            metadata_captured_documents += parseInt(records['metadata_captured_documents'], 10);
            resubmitted_documents += parseInt(records['resubmitted_documents'], 10);
          }
         
          this.allfieldsstatus.push({
            'name': 'Approved',
            'y': parseInt(approved_documents, 10)
          },
            {
              'name': 'Rejected',
              'y': parseInt(rejected_documents, 10)
            },
            {
              'name': 'Revoked',
              'y': parseInt(revoked_documents, 10)
            },
            {
              'name': 'MetaData Not Captured',
              'y': parseInt(uploaded_documents, 10)
            },
            {
              'name': 'Metadata Captured',
              'y': parseInt(metadata_captured_documents, 10)
            },
            {
              'name': 'Resubmitted',
              'y': parseInt(resubmitted_documents, 10)
            },
          );
          this.drawpiechartanalytics(this.allfieldsstatus);
          this.isVisualizationCollapsed = false;
          this.isTabularCollapsed = true;
          this.isFilterCollapsed = true;

        } else {
          this.records = [];
    
          this.allfieldsstatus.length = 0;

          // this.dtTrigger.next();
          this.toastService.showToastNotification('warning', 'No Records Found Within the Search Criteria', '');
          // this.drawpiechartanalytics([]);
          this.isVisualizationCollapsed = true;
          this.isTabularCollapsed = false;
          this.isFilterCollapsed = false;
        }


        this.loadingService.hideloading();
      });




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

    let seriesdata: any = [{ name: 'Total', colorByPoint: true, data: chartseriesdata }];
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
