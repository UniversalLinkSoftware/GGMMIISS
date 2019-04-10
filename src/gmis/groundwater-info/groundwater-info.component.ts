import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Dto_GroundWaterInformation, GroundWaterServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { GroundWaterInfoDialogComponent } from './data-component/groundwater-info-dialog.component';

@Component({
  selector: 'app-groundwater-info',
  templateUrl: './groundwater-info.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./groundwater-info.component.css']
})
export class GroundwaterInfoComponent implements OnInit {
  dto_groundwaterInfo : Dto_GroundWaterInformation = new Dto_GroundWaterInformation();
  GroundwaterInfos:Dto_GroundWaterInformation[]=[];

  constructor(
    public _dialog: MatDialog,
    private _groundWaterServiceProxy: GroundWaterServiceProxy
  ) { }

  projectName: string = "";
  projectId: string = "";

  ngOnInit() {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");
    // this.getCropList();
    this.getGroundWaterList();
  }

  isTableLoading: boolean = false;
  getGroundWaterList() {
    this.GroundwaterInfos = [];
    this.isTableLoading = true;
    this._groundWaterServiceProxy.getGroundWaterInfoListByProjectId(this.projectId)
      .pipe(
        finalize(() => {
          this.isTableLoading = false;
        })
      )
      .subscribe((result: Dto_GroundWaterInformation[]) => {
        this.GroundwaterInfos = result;
        if (result.length > 0) {
          console.log("GroundwaterInfos", result);

        }
      });
  }

  addNewData() {
    const dialogRef = this._dialog.open(GroundWaterInfoDialogComponent,{
     data: this.dto_groundwaterInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result ", result)
      if (result) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.getGroundWaterList();
  }

  editGroundWaterData(GroundWaterInformation: Dto_GroundWaterInformation) {
    const dialogRef = this._dialog.open(GroundWaterInfoDialogComponent, {
      data: GroundWaterInformation
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("Result ",result)
      if (result) {
        this.refresh();
      }
    });
  }
}
