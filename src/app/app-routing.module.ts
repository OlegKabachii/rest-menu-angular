import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientMenuComponent} from "./modules/client-menu/client-menu.component";
import {ManagerMenuComponent} from "./modules/manager-menu/manager-menu.component";


export const router: Routes = [
  {
   // path: "", loadChildren: () => import("./modules/client-menu/client-menu.module").then(m => m.ClientMenuModule)
    path:"", component: ClientMenuComponent
  },
  {
    //path: "admin", loadChildren: () => import("./modules/manager-menu/manager-menu.module").then(m => m.ManagerMenuModule)
    path:"admin", component: ManagerMenuComponent
  }
]

@NgModule({
  imports:[RouterModule.forRoot(router)],
  exports:[RouterModule]
})
export class AppRoutingModule{}

