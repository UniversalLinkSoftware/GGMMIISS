import { finalize } from 'rxjs/operators';
import { EconomicInformationServiceProxy, Dto_EconomicInfo } from './../../shared/service-proxies/service-proxies';
import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-economic-info',
  templateUrl: './economic-info.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./economic-info.component.css']
})

export class EconomicInfoComponent extends AppComponentBase implements OnInit {
  EconomicInfoList: Dto_EconomicInfo[] = [];
  CreateEconomicDto: Dto_EconomicInfo = new Dto_EconomicInfo();
  Years: number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2022,2023,2024,2025];
  CostingYear:number[]=[];

  constructor(
    injector: Injector,
    private _economicServiceProxy: EconomicInformationServiceProxy,
  ) {
    super(injector);
  }

  projectName: string = "";
  projectId: string = "";
  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    this.getEconomicInfoList();
  }


  isTableLoading: boolean = false;
  getEconomicInfoList() {
    this.isTableLoading = true;
    this._economicServiceProxy.getEconomicInfoListByProjectId(this.projectId)
      .subscribe((result: Dto_EconomicInfo[]) => {
        this.isTableLoading = false;
        this.EconomicInfoList = result;
        this.createnewInstance();
      }, (err) => {
        abp.notify.error("Error Please report us");
        // console.log("getEconomicInfoList ", err);
      });
  }

  saving: boolean = false;

  save() {
    this.saving = true;
    this.isTableLoading = true;
    this.CreateEconomicDto.projectId = this.projectId;

    // console.log(this.CreateEconomicDto);

    if (this.CreateEconomicDto.id > 0) {
      this._economicServiceProxy.update(this.CreateEconomicDto)
      .pipe(
        finalize(() => {
          this.isTableLoading = false;
          this.saving = false;
        })).subscribe((result: Dto_EconomicInfo) => {
          let indexx = this.EconomicInfoList.findIndex(x => x.id == this.CreateEconomicDto.id);
          this.EconomicInfoList[indexx] = this.CreateEconomicDto;
          abp.notify.info("Saved Successfully");
          this.createnewInstance();
        }, (err) => {
          abp.notify.error("Error Please report us");
          console.log("update ", err);
        });
    } else {
      this._economicServiceProxy.create(this.CreateEconomicDto)
      .pipe(
        finalize(() => {
          this.isTableLoading = false;
          this.saving = false;
        })).subscribe((result: Dto_EconomicInfo) => {
          this.EconomicInfoList.push(result);
          abp.notify.info("Saved Successfully");
          this.createnewInstance();
        }, (err) => {
          abp.notify.error("Error Please report us");
          console.log("create ", err);
        });
    }
  }

  editInfo(DtoObject: Dto_EconomicInfo) {
    this.CreateEconomicDto = new Dto_EconomicInfo();
    this.CreateEconomicDto = DtoObject;

    this.CostingYear=[];
      for(let yr of this.Years){
        let Result = this.EconomicInfoList.findIndex(x=>x.costingYear == yr);
        if(Result == -1){
          this.CostingYear.push(yr);
        }
      }
      this.CostingYear.push(DtoObject.costingYear);
  }

  createnewInstance(){
    this.CostingYear=[];
    this.CreateEconomicDto = new Dto_EconomicInfo();

    if(this.EconomicInfoList.length > 0){
      for(let yr of this.Years){
        let Result = this.EconomicInfoList.findIndex(x=>x.costingYear == yr);
        if(Result == -1){
          this.CostingYear.push(yr);
        }
      }
    }else{
      this.CostingYear = this.Years;
    }
  }

}