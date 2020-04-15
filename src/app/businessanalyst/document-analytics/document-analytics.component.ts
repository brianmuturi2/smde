import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { DateService } from '../../common-module/shared-service/date.service';
import { AnalyticsService } from '../services/analytics.service';
import { data_document_status_analytics_url, list_data_clerks_url, list_departments_url } from '../../app.constants';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
export interface DocumentsList {
  id: string;
  document__department__name: string;
  total_count: string;
  document_status: string;
}

@Component({
  selector: 'app-document-analytics',
  templateUrl: './document-analytics.component.html',
  styleUrls: ['./document-analytics.component.css']
})

export class DocumentAnalyticsComponent implements OnInit, AfterViewInit {
  public filterForm: FormGroup;
  @ViewChild(DataTableDirective, {static: false})
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
  constructor(private formBuilder: FormBuilder,
    public loadingService: LoadingService, public toastService: ToastService,
    public sweetalertService: SweetalertService, public dateService: DateService,
    public analyticsService: AnalyticsService) {
    this.filterForm = this.formBuilder.group({
      from_date: new FormControl('', Validators.compose([Validators.required])),
      to_date: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
    });
  }


  ngOnInit(): void {
    this.fetchdepartments();
    this.initializetable();

  }
initializetable() {
  this.dtOptions = {

    pagingType: 'full_numbers',
    responsive: true,
      pageLength: 5,
      retrieve: true,
      destroy : true,
      lengthMenu: [ [ 10, 25, 50, 100, -1], [ 10, 25, 50, 100,'All'] ],
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
        'department_id': this.filterForm.value['department']
      };
      this.loadingService.showloading();

      this.analyticsService.getrecords(data_document_status_analytics_url, payload).subscribe((res) => {
        // this.rerenderTable();
        this.destroy_chart();
        const approved_documents: any = 0;
        const rejected_documents: any = 0;
        const revoked_documents: any = 0;
        const uploaded_documents: any = 0;
        const metadata_captured_documents: any = 0;
        const resubmitted_documents: any = 0;
        const returned_records: [] = res['records'];
        const total_count: any = res['total_count'];

        // this.dtTrigger.next();

        this.allfieldsstatus.length = 0;
        if (total_count > 0) {
          // this.rerenderTable();
          this.records = returned_records;


          this.redrawTable();

          // this.drawpiechartanalytics(this.allfieldsstatus);
          this.isVisualizationCollapsed = true;
          this.isTabularCollapsed = false;
          this.isFilterCollapsed = true;

        } else {

          this.allfieldsstatus.length = 0;
          this.records = [];
          this.redrawTable();
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

  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      // dtInstance.draw();
      dtInstance.clear().draw();
      // dtInstance.draw();
    });
  }
  redrawTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      // dtInstance.draw();
      dtInstance.draw();
      // dtInstance.draw();
    });
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
