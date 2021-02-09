import { Component, ViewEncapsulation } from '@angular/core';
import { UpdatorService } from './updator.service';
// import { AddDocument } from './add-Document';

import { ToastService } from '../../common-module/shared-service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['./app.component.css'],
  // template: '<router-outlet></router-outlet>',
  providers: [UpdatorService]
})

export class UpdatorComponent {

  keyword1: string;
  keyword2: string;

  documentType = null;
  department = null;
  documentTypes;
  departmentId

 
  constructor(private api: UpdatorService, public toastService: ToastService, private modalService: NgbModal, public loadingService: LoadingService, private router: Router,) {

    this.getDocumentTypes();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/document-updator']);
  }   


  getDocumentTypes = () => {
    this.api.getDocumentTypes().subscribe(
      data => {
        // console.log(data);
        this.documentTypes = data
        this.departmentId = data[0]['id']
      },
      error => {
        console.log(error);
      }
    );
  }

  updator = () => {
    const keywords = {'old': this.keyword1, 'new': this.keyword2}
    this.api.updator(keywords).subscribe(
      data => {
        if (data === 'Success') {
          this.toastService.showToastNotification('success', 'Updated successfully', '');
        }
      },
      error => {
        console.log(error);
      }
    );
  }



 




}
