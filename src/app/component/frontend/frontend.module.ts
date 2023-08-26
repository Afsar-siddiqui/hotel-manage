import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { SimilarHotelComponent } from './similar-hotel/similar-hotel.component';
import { SuggestedHotelsComponent } from './suggested-hotels/suggested-hotels.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Bootstrap module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from 'ngx-bootstrap/tabs';

//
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RatingModule } from 'ngx-bootstrap/rating';


@NgModule({
  declarations: [
    HomeComponent,
    ContactsComponent,
    AboutComponent,
    HotelViewComponent,
    SimilarHotelComponent,
    SuggestedHotelsComponent,
    BookingDetailsComponent,
    UserComponent,
    HotelListComponent,
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    HttpClientModule,
    

    ReactiveFormsModule,
    FormsModule,

    //bootstrap module
    BsDatepickerModule,
    CarouselModule,
    ProgressbarModule,
    TypeaheadModule,
    TabsModule,

    //
    SlickCarouselModule,
    RatingModule,

    //
    

  ]
})
export class FrontendModule { }


