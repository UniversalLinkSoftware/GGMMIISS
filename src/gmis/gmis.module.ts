import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GmisRoutingModule } from './gmis-routing.module';
import { GmisComponent } from './gmis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { SideBarUserAreaComponent } from './layout/sidebar-user-area.component';
import { SideBarNavComponent } from './layout/sidebar-nav.component';
import { SideBarFooterComponent } from './layout/sidebar-footer.component';
import { ProjectDataGuardService } from './project-data-gurad.service';
import { TopBarComponent } from './layout/topbar.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { LocationComponent } from './location/location.component';
import { AddLocationToProjectDialogComponent } from './location/add-location/add-location-inProject-dialog.component';
import { ContractManagementComponent } from './contract-management/contract-management.component';
import { WuaInformationComponent } from './wua-information/wua-information.component';
import { EconomicInfoComponent } from './economic-info/economic-info.component';
import { AgricultureInfoComponent } from './agriculture-info/agriculture-info.component';
import { AgricultureInfoDialogComponent } from './agriculture-info/data-component/agriculture-info-dialog.component';
import { GroundwaterInfoComponent } from './groundwater-info/groundwater-info.component';
import { GroundWaterInfoDialogComponent } from './groundwater-info/data-component/groundwater-info-dialog.component';

@NgModule({
  declarations: [
    GmisComponent,
    TopBarComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,

    DashboardComponent,

    InformationComponent,

    DocumentUploadComponent,
    AgricultureInfoDialogComponent,
    
    LocationComponent,
    AddLocationToProjectDialogComponent,
    
    ContractManagementComponent,
    WuaInformationComponent,

    EconomicInfoComponent,

    AgricultureInfoComponent,

    GroundwaterInfoComponent,
    GroundWaterInfoDialogComponent
  ],
  imports: [
    CommonModule,
    GmisRoutingModule,
    NgxPaginationModule,
    
    // MatMenuModule,
    // MatButtonModule,
    // MatIconModule, 
    // MatFormFieldModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    AbpModule,
    SharedModule,
    ServiceProxyModule,
    ModalModule.forRoot(),

  ],
  providers:[
    ProjectDataGuardService
  ],
  entryComponents:[
    DocumentUploadComponent,

    AddLocationToProjectDialogComponent,
    AgricultureInfoDialogComponent,
    GroundWaterInfoDialogComponent
  ]
})
export class GmisModule { }
