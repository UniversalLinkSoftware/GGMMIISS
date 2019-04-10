import { AppConsts } from '@shared/AppConsts';
import { ListResultDtoOfDocumentDto, DocumentDto } from './../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Dto_ProjectInfo, ProjectInformationServiceProxy, ProjectInformationInitals, Dto_ProgramType, Dto_ProjectStatus, Dto_ProgramInformation, DocumentServiceProxy } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DocumentUploadComponent } from 'gmis/document-upload/document-upload.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  animations: [appModuleAnimation()],  
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit {
  projectName:string="";
  projectId:string="";
  projecttType:string="";
  projectInformation:Dto_ProjectInfo= new Dto_ProjectInfo();
  saving = false;
  RadioBtnTest:number=0;
  
  
  constructor(
    private _dialog: MatDialog,
    private _documentServiceProxy: DocumentServiceProxy,
    private _projectInformationServiceProxy : ProjectInformationServiceProxy,
  ) {
    // console.log("Hi from constructor");

    // let projectId = sessionStorage.getItem("projectId");
    // let projectName = sessionStorage.getItem("projectName");
    // if(projectId == null || projectId === undefined){
    //   this._router.navigate(['/app/dashboard']);
    // }
    // console.log("Hi");
    
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    
    this._projectInformationServiceProxy.getAllProjectInfosInitials()
    .subscribe((result: ProjectInformationInitals) =>{
      this.programTypes = result.programTypeList;
      this.projectStatus = result.projectStatusList;
      this.programInformation = result.programInformationList;
    });
   }

  ngOnInit() {
    this.projectInformationlist();
    this.refresh();
  }

  UploadProjectInfoDocument(){
    let projectHelperDialog;
      projectHelperDialog = this._dialog.open(DocumentUploadComponent, {
            data: "1"
        });

    projectHelperDialog.afterClosed().subscribe(result => {
        if (result) {
            this.refresh();
        }
    });
  }

  DocumentsList:DocumentDto[]=[];
  refresh(){
    this._documentServiceProxy.getDocumentListByProjectidAndDocType(this.projectId,1)
          .subscribe((result: ListResultDtoOfDocumentDto) => {
        // this.projects = result.items;
        this.DocumentsList = result.items;
        console.log(this.DocumentsList)
      });
  }
  // selectedRadio:number=1;

//   radioChange($event: MatRadioChange) {
//     console.log($event.source.name, $event.value);

//     if ($event.source.name === 'radioOpt1') {
//         // Do whatever you want here
//     }
// }

  projectInformationlist(): void {
    this._projectInformationServiceProxy.getProjectInformationByProjectId(this.projectId)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe((result: Dto_ProjectInfo) => {
      // console.log("hi");
      console.log(result);
      if(result.id == 0){
        this.projectInformation.projectId = this.projectId;
        console.log("Data NOT Found");
      }else{
        console.log("Data Found");
        this.projectInformation = new Dto_ProjectInfo();
        this.projectInformation = result;
        // this.approvedDate =  new Date("13 FEB 1990");
        this.approvedDate = this.projectInformation.approved_date == null ? null : (this.projectInformation.approved_date).toDate();
        this.end_date = this.projectInformation.end_date == null ? null : (this.projectInformation.end_date).toDate();
        this.start_date = this.projectInformation.start_date == null ? null : (this.projectInformation.start_date).toDate();
      }

    });
}

  programTypes: Dto_ProgramType[]=[];
  projectStatus: Dto_ProjectStatus[]=[];
  programInformation: Dto_ProgramInformation[]=[];

  approvedDate:Date = new Date();
  end_date:Date = new Date();
  start_date:Date = new Date();
  today_date:Date = new Date();
  
  save(Dto_projectInfo: Dto_ProjectInfo): void {
    this.saving = true;
   

    if(Dto_projectInfo.isPhaseCompleted){
      try {
        Dto_projectInfo.approved_date = moment(this.approvedDate);
        Dto_projectInfo.start_date = moment(this.start_date);
        Dto_projectInfo.end_date = moment(this.end_date);
        
      } catch (error) {
        abp.notify.error('Date Conversion Error');
      }
    }
    // this.appointment.date = moment(new Date(addedDate))

    console.log("this.projectInformation");
    console.log(Dto_projectInfo);
     if(Dto_projectInfo.id > 0 && Dto_projectInfo.projectId != "")
    {
      console.log("Update");

      this._projectInformationServiceProxy
      .update(Dto_projectInfo)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result) => {
        console.log("update resoponse");
        console.log(result);
        abp.notify.info('Project Updated Successfully');
      });
    }else{
        console.log("Create");
  
      this._projectInformationServiceProxy
        .create(Dto_projectInfo)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((result) => {
          console.log("Create");
          console.log(result);
          this.projectInformation.end_date
          abp.notify.info('Project Added Successfully');
        });
    }
      // else
      // abp.notify.info('Internal Error Please Report');
    // }
  }

}