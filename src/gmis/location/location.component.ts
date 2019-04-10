import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AddLocationToProjectDialogComponent } from './add-location/add-location-inProject-dialog.component';
import { MatDialog } from '@angular/material';
import { DocumentServiceProxy, ProjectInformationServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./location.component.css']
})

// AddLocationToProjectDialogComponent
export class LocationComponent implements OnInit {
  projectName :string="";
  projectId :string="";

  constructor(
    private _dialog: MatDialog,
  ) {
    this.projectName = sessionStorage.getItem("projectName");
    this.projectId = sessionStorage.getItem("projectId");

  }
  ngOnInit() {
  this.isTableLoading = false;

  }

  AddLocation(){
    console.log("i am clicked");
    let projectHelperDialog;
    projectHelperDialog = this._dialog.open(AddLocationToProjectDialogComponent, {
          data: "1"
      });

      projectHelperDialog.afterClosed().subscribe(result => {
        if (result) {
            this.refresh();
        }
    });
  }

  isTableLoading:boolean = false;
  refresh(){
  this.isTableLoading = true;
  }
}
