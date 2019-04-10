import { Dto_AgricultreInfo, AgricultreInfoServiceProxy, Dto_CropName, Dto_AgricultreInfoDetailModel } from './../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgricultureInfoDialogComponent } from './data-component/agriculture-info-dialog.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';

export interface DialogData {
  isEdit: boolean;
  CropList: Dto_CropName[];
  isCropPatternExisting: boolean;
  id: number;
  projectId: string;
}

@Component({
  selector: 'app-agriculture-info',
  templateUrl: './agriculture-info.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./agriculture-info.component.css']
})
export class AgricultureInfoComponent implements OnInit {
  dto_AgricultreInfo: Dto_AgricultreInfo = new Dto_AgricultreInfo();

  ExistingCrop_AgricultreInfos: Dto_AgricultreInfoDetailModel[] = [];
  NewCrop_AgricultreInfos: Dto_AgricultreInfoDetailModel[] = [];

  constructor(
    public _dialog: MatDialog,
    private _agricultureServiceProxy: AgricultreInfoServiceProxy
  ) { }

  projectName: string = "";
  projectId: string = "";

  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    this.getCropList();
    this.getAgricultureList();
  }

  isTableLoading: boolean = false;
  getAgricultureList() {
    this.NewCrop_AgricultreInfos = [];
    this.ExistingCrop_AgricultreInfos = [];
    this.isTableLoading = true;
    this._agricultureServiceProxy.getAgricultureInfoByProjectId(this.projectId)
      .pipe(
        finalize(() => {
          this.isTableLoading = false;
        })
      )
      .subscribe((result: Dto_AgricultreInfoDetailModel[]) => {
        if (result.length > 0) {
          this.NewCrop_AgricultreInfos = result.filter(x => x.isCropPatternExisting == false);
          console.log("New Crop", this.NewCrop_AgricultreInfos)
          this.ExistingCrop_AgricultreInfos = result.filter(x => x.isCropPatternExisting == true);
          console.log("Existing Crop", this.ExistingCrop_AgricultreInfos)

        }
      });
  }

  cropLists: Dto_CropName[] = [];
  getCropList() {
    this._agricultureServiceProxy.getCropNameList()
      .subscribe((result: Dto_CropName[]) => {
        this.cropLists = result;
      },
        (err) => {
          abp.notify.error("Error Please report us");
          console.log("getCropList ", err);
        });
  }

  addNewCropPatternData() {
    let CroplistToInject: Dto_CropName[] = [];
    if (this.NewCrop_AgricultreInfos.length > 0) {
      for (let crop of this.cropLists) {

        let Result = this.NewCrop_AgricultreInfos.findIndex(x => x.cropId == crop.id);
        if (Result == -1) {
          CroplistToInject.push(crop);
        }
      }
    } else {
      CroplistToInject = this.cropLists;
    }

    if (CroplistToInject.length > 0) {

    } else {
      abp.notify.info("Please Add Crop Name to add in New Crop Pattern");
      return;
    }
    const dialogRef = this._dialog.open(AgricultureInfoDialogComponent, {
      data: { isEdit: false, CropList: CroplistToInject, isCropPatternExisting: false, id: 0, projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result ", result)
      if (result) {
        this.refresh();
      }
    });
  }

  addExistingCropPatternData() {
    let CroplistToInject: Dto_CropName[] = [];
    if (this.ExistingCrop_AgricultreInfos.length > 0) {
      for (let crop of this.cropLists) {

        let Result = this.ExistingCrop_AgricultreInfos.findIndex(x => x.cropId == crop.id);
        if (Result == -1) {
          CroplistToInject.push(crop);
        }
      }
    } else {
      CroplistToInject = this.cropLists;
    }

    if (CroplistToInject.length > 0) {

    } else {
      abp.notify.info("Please add crop name to add in Existing Crop Pattern");
      return;
    }

    const dialogRef = this._dialog.open(AgricultureInfoDialogComponent, {
      data: { isEdit: false, CropList: CroplistToInject, isCropPatternExisting: true, id: 0, projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("Result ",result)
      if (result) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.getAgricultureList();
  }

  editExistingCropPattern(Dto_AgricultureInfos: Dto_AgricultreInfoDetailModel) {
    let CroplistToInject: Dto_CropName[] = [];

      for (let crop of this.cropLists) {
        let Result = this.ExistingCrop_AgricultreInfos.findIndex(x => x.cropId == crop.id);
        if (Result == -1) {
          CroplistToInject.push(crop);
        }
      }

      let Result = this.cropLists.findIndex(x=>x.id == Dto_AgricultureInfos.cropId);
      if(Result == -1){
          abp.notify.error("Internal Error.. Please Report Us");
      }
      CroplistToInject.push(this.cropLists[Result]);

    if (CroplistToInject.length > 0) {

    } else {
      abp.notify.info("Please add crop name to add in Existing Crop Pattern");
      return;
    }

    const dialogRef = this._dialog.open(AgricultureInfoDialogComponent, {
      data: { isEdit: true, CropList: CroplistToInject, isCropPatternExisting: true, id: Dto_AgricultureInfos.id, projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("Result ",result)
      if (result) {
        this.refresh();
      }
    });
  }

  
  editNewCropPattern(Dto_AgricultureInfos: Dto_AgricultreInfoDetailModel) {
    let CroplistToInject: Dto_CropName[] = [];

      for (let crop of this.cropLists) {
        let Result = this.NewCrop_AgricultreInfos.findIndex(x => x.cropId == crop.id);
        if (Result == -1) {
          CroplistToInject.push(crop);
        }
      }

      let Result = this.cropLists.findIndex(x=>x.id == Dto_AgricultureInfos.cropId);
      if(Result == -1){
          abp.notify.error("Internal Error.. Please Report Us");
      }
      CroplistToInject.push(this.cropLists[Result]);

    if (CroplistToInject.length > 0) {

    } else {
      abp.notify.info("Please add crop name to add in Existing Crop Pattern");
      return;
    }

    const dialogRef = this._dialog.open(AgricultureInfoDialogComponent, {
      data: { isEdit: true, CropList: CroplistToInject, isCropPatternExisting: true, id: Dto_AgricultureInfos.id, projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("Result ",result)
      if (result) {
        this.refresh();
      }
    });
  }
}