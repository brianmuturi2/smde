import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {SurveyService } from '../services/survey.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { clerk_uploaded_documents_url } from '../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../interfaces/survey';
import { Router } from '@angular/router';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-uploaded-documents',
  templateUrl: './uploaded-documents.component.html',
  styleUrls: ['./uploaded-documents.component.css']
})
export class UploadedDocumentsComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  searchString: string;
  regConfig: FieldConfig[] = [
    {
      field_type: 'input',
      label: 'Username',
      input_type: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }
      ]
    }];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  constructor(private router: Router, private loadingService: LoadingService, public toastService: ToastService, public surveyService: SurveyService, ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve: true,



    };
    this.fetchRecords();
  }

  fetchRecords() {
    this.loadingService.showloading();
     this.surveyService.getrecord(clerk_uploaded_documents_url).subscribe((res) => {
       this.records = res;
       this.loadingService.hideloading();

       this.dtTrigger.next();

     }, (err) => {
       this.loadingService.hideloading();

     });
   }
   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     });
   }
   capture_metadata(file_id) {
     this.router.navigate(['clerk-view/document-preview', file_id]);

   }

}
