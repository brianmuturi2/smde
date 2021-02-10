import { Component, ViewEncapsulation } from '@angular/core';
import { TrustService } from './trust.service';
import { AddTrust, UpdateTrust, AddTrustDetails } from './add-trust';
import { ITrust } from './trust';
import { AddIncomingTrustee } from './add-incoming-trustee';
import { AddOutgoingTrustee } from './add-outgoing-trustee';
import { AddComments } from './add-comments';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['./app.component.css'],
  // template: '<router-outlet></router-outlet>',
  providers: [TrustService]
})

export class TrustComponent {
  closeResult: string;
  statuses = ['True', 'False'];
  // levelone = [{ps_number: 'Level one Test'}];
  levelone;
  leveloneData: ITrust[] = [];
  incomingTrustee = [{trustee_name: 'Incomming Test'}];
  outgoingTrustee = [{trustee_name: 'Outgoing Test'}];
  trust = [{id: -1}];
  leveloneSelected;
  levelthreeSelected;
  levelfourSelected;
  trustSelected;
  trustActiveSelected;
  activeTrustId;
  clickedTrustId;
  addCommentModel = new AddComments(null, null, null);
  addTrustModel = new AddTrust( '', '', '', true);
  updateTrustModel = new UpdateTrust('', '', '', '', '', '', null);
  addIncomingTrusteeModel = new AddIncomingTrustee(null,  '', '', '', '', true);
  addOutgoingTrusteeModel = new AddOutgoingTrustee(null, null, '');
  addTrustDetailsModel = new AddTrustDetails(null, null, '');
  allTrusts;
  trustDataId;
  trustName;
  createdTrustName = null;
  createdPsno = null;
  ps_no: string;
  notification;
  incomingNotification;
  outgoingNotification;
  errorMsg = '';
  datac;
  file_no;
  fileStatus;
  postComments;
  document_id;
  fileComments;
  showOutgoing;
  document_url = null;
  trustee_id = null;
  is_register = null;
  
  // levelonedata

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredleveloneData=this.listFilter ? this.performFilter(this.listFilter) : this.leveloneData;
  }

  filteredleveloneData:ITrust[];

  constructor(private api: TrustService, public toastService: ToastService, private modalService: NgbModal) {
    this.getFileStatus();
    this.getLevelOne();
    this.getIncomingTrustee();
    this.getOutgoingTrustee();
    this.leveloneSelected = {id: -1, ps_number: '', trust_name: '', status: ''};
    this.levelthreeSelected = {id: -1, trust: '', trustee_name: '', date_registered: '', endorsement_date: '', status: ''};
    this.levelfourSelected = {id: -1, trustee_name: '', replaced_by: '', date_registered: ''};
    this.trustSelected = {id: -1};
    if (this.addCommentModel.document_id !== '') {
      this.getFileComment();
    }
    if (GlobalVars.document_id !== null) {
      this.file_no = GlobalVars.document_id;
      this.searchFileNumber();

    }
  }

  performFilter(filterBy: string): ITrust[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.leveloneData.filter((trust: ITrust) =>
      trust.trust_name.toLocaleLowerCase().indexOf(filterBy) !== -1); 
  }

  setTrusteeId(id) {
    this.trustee_id = id;
    // console.log(this.trustee_id);
  }

  // start modal config
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
  // end modal config

  // fetches all TRUSTS
  getLevelOne = () => {
    this.api.getAllLevelOne().subscribe(
      data => {
        this.levelone = data;
        this.filteredleveloneData = data;
        this.leveloneData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getFileStatus = () => {
    this.api.getFileCleaningStatus().subscribe(
      data => {
        this.fileStatus = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  getIncomingTrustee = () => {
    this.api.getAllIncomingTrustee().subscribe(
      data => {
        this.incomingTrustee = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getOutgoingTrustee = () => {
    this.api.getAllOutgoingTrustee().subscribe(
      data => {
        this.outgoingTrustee = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  exitRegisterMembers = () => {
    this.showOutgoing = 'register';
  }

  closeRegisterMembers = () => {
    this.showOutgoing = null;
  }

  TrustClicked = (trust) => {
    this.trustName = trust.trust_name;
    this.activeTrustId = trust.id;
    this.api.getOneTrust(trust.id).subscribe(
      data => {
        if (data.length === 0) {
          this.toastService.showToastNotification('info', 'No members found', '');
        } else {
          this.exitRegisterMembers();
        }
        this.trustSelected = data;
      },
      error => {
        console.log(error);
      }
    );
    this.TrustActiveMembers();
  }


  TrustActiveMembers = () => {
    // Gets all cative members of a specific Trust
    this.api.getOneActiveTrust(this.activeTrustId).subscribe(
      data => {
        this.trustActiveSelected = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  TrustClickedUpdate = (trust) => {
    // adds values to trust update form
    this.updateTrustModel.id = trust.id;
    this.updateTrustModel.ps_number = trust.ps_number;
    this.updateTrustModel.trust_name = trust.trust_name;
    this.updateTrustModel.status = trust.status;
    this.updateTrustModel.date_of_incorporation = trust.date_of_incorporation;
    this.updateTrustModel.date_of_registration = trust.date_of_registration;
  }

  TrustDetails = (data) => {
    // adds values to trust form
    this.addIncomingTrusteeModel.trust = data.trust_name;
    this.addIncomingTrusteeModel.trust_id = data.id;
    this.addTrustDetailsModel.trust_id = data.id;
    this.addOutgoingTrusteeModel.trust_id = data.id;
    // console.log(this.addIncomingTrusteeModel);
  }



  TrustData = () => {
    this.api.getOneTrustData(this.trustDataId).subscribe(
      data => {
        this.trustSelected = data;
      },
      error => {
        console.log(error);
      }
    );
  }



  // Onchange gets OUTGOING trust members
  TrustClickedGet = () => {
    this.activeTrustId = this.addTrustModel.ps_number;
    this.api.getOneTrust(this.addTrustModel.ps_number).subscribe(
      data => {
        this.trustSelected = data;
        this.showOutgoing = 'outgoing';
        console.log(this.showOutgoing);
      },
      error => {
        console.log(error);
      }
    );
    this.TrustActiveMembers();
  }


  // Onchange gets incoming trust members (INCOMING)
  TrustClickedGetOne = () => {
    this.clickedTrustId = this.addIncomingTrusteeModel.trust;
    this.activeTrustId = this.addIncomingTrusteeModel.trust;
    this.api.getOneTrust(this.addIncomingTrusteeModel.trust).subscribe(
      data => {
        this.trustSelected = data;
        this.showOutgoing = 'incoming';
      },
      error => {
        console.log(error);
      }
    );
  }

  // gets current members of a trust
  TrustClickedGetData = () => {
    this.api.getOneTrust(this.activeTrustId).subscribe(
      data => {
        this.trustSelected = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  searchFileNumber = () => {
    this.api.getFile(this.file_no).subscribe(      
      data => {
        console.log(data);
        try {
          this.addTrustModel.register = data.id;
          this.addCommentModel.document_id = data.document;
          this.document_url = data.doc_url;
          this.getFileComment();
          // this.file_no = null;
          GlobalVars.document_id = null;
          this.toastService.showToastNotification('success', 'Document Found', '');
        } catch (Error) {
            this.notification = 'error';
          }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchPsNumber = () => {
    const search_payload = {
      'ps_no': this.ps_no
    };
    this.api.getPsno(search_payload).subscribe(      
      data => {
        console.log(data);
        try {
          this.file_no = data.file_number
          this.createdPsno = data.ps_number;
          this.createdTrustName = data.trust_name;
          this.TrustDetails(data);
          this.searchFileNumber();
          this.toastService.showToastNotification('success', 'Trust Found', '');
        } catch (Error) {
            this.notification = 'error';
          }
      },
      error => {
        console.log(error);
      }
    );
  }

  getFileComment = () => {
    this.api.getFileComments(this.addCommentModel.document_id).subscribe(
      data => {
        // console.log(data);
        this.fileComments = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  leveloneClicked = (levelone) => {
    this.api.getOneLevelone(levelone.id).subscribe(
      data => {
        this.leveloneSelected = data;
        this.levelthreeSelected.trust = levelone.id;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  // clicking on incoming trustee edit button
  levelthreeClicked = (levelthree) => {
    this.api.getOneLevelthree(levelthree.id).subscribe(
      data => {
        if (data.id) {
          this.addIncomingTrusteeModel.status = data.status
          this.addIncomingTrusteeModel.trustee_name = data.trustee_name
          this.addIncomingTrusteeModel.date_registered = data.date_registered
          this.addIncomingTrusteeModel.endorsement_date = data.endorsement_date
          this.activeTrustId = data.trust
          this.trustee_id = data.id
          // console.log(this.addIncomingTrusteeModel)
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  createLevelone = () => {
    this.api.createLevelone(this.addTrustModel).subscribe(
      data => {
        console.log(data);
        if (data.status === 'Success') {          
          this.createdPsno = data.ps_number;
          this.createdTrustName = data.trust_name;
          this.getLevelOne(); // fetches all trusts
          this.toastService.showToastNotification('success', 'Created successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  updateLevelone = () => {
    this.api.updateLevelone(this.updateTrustModel).subscribe(
      data => {
        if (data === 'Success') {
          this.getLevelOne(); // fetches all trusts
          this.toastService.showToastNotification('success', 'Updated successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteLevelone = () => {
    this.api.deleteLevelone(this.updateTrustModel.id).subscribe(
      data => {
        if (data === 'Success') {
          this.getLevelOne(); // fetches all trusts
          this.toastService.showToastNotification('success', 'Deleted successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteMember = () => {
    this.api.deleteMember(this.trustee_id).subscribe(
      data => {
        if (data === 'Success') {
          this.TrustClickedGetData(); // re-fetches all trust members
          this.toastService.showToastNotification('success', 'Deleted successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createTrustDetails = () => {
    console.log(this.addTrustDetailsModel);
    this.api.createTrustDetails(this.addTrustDetailsModel).subscribe(
      data => {
        console.log(data);
        if (data.status === 'Success') {          
          this.toastService.showToastNotification('success', 'Updated successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  createLevelthree = () => {
    this.api.createLevelthree(this.addIncomingTrusteeModel).subscribe(
      data => {
        if (data.status === 'Success') {
          this.TrustClickedGetData(); // gets current members of a trust
          this.toastService.showToastNotification('success', 'Created successfully', '');
        }
        this.incomingTrustee.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateLevelthree = () => {
    this.api.updateLevelthree(this.addIncomingTrusteeModel,this.trustee_id).subscribe(
      data => {
        // console.log(data);
        if (data === 'Success') {
          this.TrustClickedGetData(); // re-fetches all trust members
          this.trustee_id = null;
          this.toastService.showToastNotification('success', 'Updated successfully', '');
        }
        this.levelone.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelUpdateLevelthree = () => {
    this.trustee_id = null;
  }



  createLevelfour = () => {
    this.api.createLevelfour(this.addOutgoingTrusteeModel).subscribe(
      data => {
        // console.log(data);
        if (data.status === 'Success') {
          this.trustDataId = data.trustee_name;
          this.TrustData();
          this.toastService.showToastNotification('success', 'Updated successfully', '');
        }
        this.outgoingTrustee.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  createComments = () => {
    this.api.addComments(this.addCommentModel).subscribe(
      data => {
        // console.log(data);
        this.addCommentModel.remarks = '';
        if (data.status === 'Success') {
          this.addCommentModel.document_id = data.document;
          this.addCommentModel.remarks = null;
          this.toastService.showToastNotification('success', 'Created successfully', '');
          this.getFileComment();
        }
        this.postComments.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }



}
export class GlobalVars {
  public static document_id: any = null;
}
