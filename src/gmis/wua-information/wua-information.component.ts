import { WUAInfoServiceProxy, WUATrainingsServiceProxy, Dto_WUAInfo, Dto_WUATraining } from './../../shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';

@Component({
  selector: 'app-wua-information',
  templateUrl: './wua-information.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./wua-information.component.css']
})
export class WuaInformationComponent extends AppComponentBase implements OnInit {
  dto_WUAInfo: Dto_WUAInfo = new Dto_WUAInfo();
  dto_WUATraining: Dto_WUATraining = new Dto_WUATraining();
  dto_WUATrainings : Dto_WUATraining[] = [];

  constructor(
    injector: Injector,
    private _WUAInfoService: WUAInfoServiceProxy,
    private _WUATrainingService: WUATrainingsServiceProxy,
  ) {
    super(injector);
  }

  projectName: string = "";
  projectId: string = "";
  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    this.getWUAInfo();
    this.getWUATrainingList();
    this.getNewTrainingInstance();
  }

  registrationDate:Date= new Date();
  today_date:Date= new Date();
  saving:boolean=false;

  getWUAInfo() {
    this._WUAInfoService.getWUAInfoDetailByProjectId(this.projectId)
      .subscribe((result: Dto_WUAInfo) => {
        console.log(result);
        this.registrationDate = null;

        if (result.id > 0) {
          this.dto_WUAInfo = new Dto_WUAInfo();
          this.dto_WUAInfo = result;
          this.registrationDate = this.dto_WUAInfo.wuaRegistrationProgressDate == null ? null : (this.dto_WUAInfo.wuaRegistrationProgressDate).toDate();
          //this.physicalProgressDate = this.dto_ContractManagement.physicalProgressDate == null ? null : (this.dto_ContractManagement.physicalProgressDate).toDate();
          //this.financialProgressDate = this.dto_ContractManagement.financialProgressDate == null ? null : (this.dto_ContractManagement.financialProgressDate).toDate();
        }
      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getWUAInfo ", err);
        });
  }

  saveWUAInfo(){
    this.saving = true;
    this.dto_WUAInfo.wuaRegistrationProgressDate =moment(this.registrationDate);
    this.registrationDateSavedToDB = this.registrationDate;
    
    if(this.dto_WUAInfo.id > 0){
      this._WUAInfoService.update(this.dto_WUAInfo)
      .subscribe( (result : Dto_WUAInfo) =>{
        abp.notify.info("Saved Successfully");
        this.saving = false;
      },
        (err) => {
          abp.notify.error("Updated Error. Please report us");
          console.log("getWUAInfo ", err);
        });
    }else{
      this.dto_WUAInfo.projectId = this.projectId;
      this._WUAInfoService.create(this.dto_WUAInfo)
      .subscribe( (result : Dto_WUAInfo) =>{
        this.dto_WUAInfo.id = result.id;
        abp.notify.info("Saved Successfully");
        this.saving = false;
      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getWUAInfo ", err);
        });
    }
    this.getNewTrainingInstance();
  }

  saving1:boolean = false;

  registrationDateSavedToDB:Date = new Date();
  TrainingDate:Date = new Date();
  saveTrainings(){
    this.saving1 = true; 
    this.dto_WUATraining.noOfParticipants
    this.dto_WUATraining.trainingDate =moment(this.TrainingDate);

    if(this.dto_WUATraining.id > 0){
      this._WUATrainingService
      .update(this.dto_WUATraining)
      .subscribe( (result : Dto_WUATraining) =>{
        abp.notify.info("Update Successfully");
        this.saving1 = false;
      },
        (err) => {
          abp.notify.error("Updated Error. Please report us");
          console.log("getWUAInfo ", err);
        });
    }else{
      this.dto_WUATraining.projectId = this.projectId;
      this._WUATrainingService.create(this.dto_WUATraining)
      .subscribe( (result : Dto_WUATraining) =>{
        this.dto_WUATraining.id = result.id;
        abp.notify.info("Saved Successfully");
        this.saving1 = false;
        this.dto_WUATrainings.push(this.dto_WUATraining);
        this.getNewTrainingInstance();
      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getWUATrainings ", err);
        });
    }
  }

  getNewTrainingInstance(){
    this.dto_WUATraining = new Dto_WUATraining();
    this.TrainingDate = null;
    this.saving1 = false;
  }

  isTableLoading:boolean= false;
  getWUATrainingList() {
    this.isTableLoading= true;
    this._WUATrainingService
      .getWUATrainingsListByProjectId(this.projectId)
      .subscribe((result: Dto_WUATraining[]) => {
        console.log(result);
        this.dto_WUATrainings = [];
        this.dto_WUATrainings = result;
        this.isTableLoading= false;
      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getWUATrainingList ", err);
        });
  }

}