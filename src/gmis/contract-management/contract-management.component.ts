import { Component, OnInit } from '@angular/core';
import { ContractManagementServiceProxy, Dto_ContractManagement } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';

@Component({
  selector: 'app-contract-management',
  templateUrl: './contract-management.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./contract-management.component.css']
})
export class ContractManagementComponent implements OnInit {
  dto_ContractManagement: Dto_ContractManagement = new Dto_ContractManagement();

  constructor(
    private _contractMgmtServiceProxy: ContractManagementServiceProxy,
  ) { }

  projectName: string = "";
  projectId: string = "";
  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    this.getContractMgmtData();
  }

  save() {
    console.log("hi");

    try {
      this.dto_ContractManagement.physicalProgressDate = moment(this.physicalProgressDate);
      this.dto_ContractManagement.financialProgressDate = moment(this.financialProgressDate);
    } catch (error) {
      abp.notify.error('Date Conversion Error');
    }

    if (this.dto_ContractManagement.id > 0) {
      this._contractMgmtServiceProxy.update(this.dto_ContractManagement)
        .subscribe((result: Dto_ContractManagement) => {
          abp.notify.info("Updated Successfully");
        },
          (err) => {
            abp.notify.error("Error in Update Please report us");
            console.log("getContractMgmtData ", err);
          });
    } else {
      this.dto_ContractManagement.projectId = this.projectId;

      this._contractMgmtServiceProxy.create(this.dto_ContractManagement)
        .subscribe((result: Dto_ContractManagement) => {
          this.dto_ContractManagement.id = result.id;
          abp.notify.info("Saved Successfully");
        },
          (err) => {
            abp.notify.error("Error in Create Please report us");
            console.log("getContractMgmtData ", err);
          });
    }
    console.log(this.dto_ContractManagement);

  }

  physicalProgressDate: Date = new Date();
  financialProgressDate: Date = new Date();
  today_date: Date = new Date();

  getContractMgmtData() {
    this._contractMgmtServiceProxy.getContractManagementDetailByProjectId(this.projectId)
      .subscribe((result: Dto_ContractManagement) => {
        console.log(result);
        this.dto_ContractManagement = new Dto_ContractManagement();
        this.dto_ContractManagement = result; this.dto_ContractManagement.contracterAddress

        if (this.dto_ContractManagement.id > 0) {
          this.physicalProgressDate = this.dto_ContractManagement.physicalProgressDate == null ? null : (this.dto_ContractManagement.physicalProgressDate).toDate();
          this.financialProgressDate = this.dto_ContractManagement.financialProgressDate == null ? null : (this.dto_ContractManagement.financialProgressDate).toDate();
        }else{
          this.physicalProgressDate = null;
          this.financialProgressDate = null;
        }

      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getContractMgmtData ", err);
        });
  }

}