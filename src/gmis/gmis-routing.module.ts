import { LocationComponent } from './location/location.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GmisComponent } from './gmis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { ProjectDataGuardService } from './project-data-gurad.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { WuaInformationComponent } from './wua-information/wua-information.component';
import { ContractManagementComponent } from './contract-management/contract-management.component';
import { EconomicInfoComponent } from './economic-info/economic-info.component';
import { AgricultureInfoComponent } from './agriculture-info/agriculture-info.component';
import { GroundwaterInfoComponent } from './groundwater-info/groundwater-info.component';

const routes: Routes = [
  {
    path: '',
    component: GmisComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AppRouteGuard] },
      { path: 'information', component: InformationComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'location', component: LocationComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'wua-info', component: WuaInformationComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'contract-mgmt', component: ContractManagementComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'economic-info', component: EconomicInfoComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'agriculture-info', component: AgricultureInfoComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      { path: 'groundwater-info', component: GroundwaterInfoComponent, data: {  }, canActivate: [ProjectDataGuardService] },
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmisRoutingModule { }
