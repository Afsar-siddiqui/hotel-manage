import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UserComponent } from './user/user.component';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactsComponent},
  {path: 'user', component: UserComponent},
  {path: 'view', component: HotelViewComponent},
  {path: 'hotel-list', component: HotelListComponent},
  {path: 'booking', component: BookingDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
