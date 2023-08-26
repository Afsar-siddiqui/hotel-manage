import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FrontendService } from 'src/app/service/frontend.service';
import { ScriptsMethodService } from 'src/app/service/scripts-method.service';
import Swal from 'sweetalert2';

//import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent {

  hotelList:any=[];

  //
  city: string|undefined;
  checkin: string|undefined;
  checkout: string|undefined;
  adults: number|undefined;
  child: number|undefined;
  num_rooms: number|undefined;

  //
  minDate: Date;
  maxDate: Date;

  //
  searchDetails:any;

  display_date: any;

  constructor(private _scripts: ScriptsMethodService, private _frontend: FrontendService, private route: ActivatedRoute, private router: Router){
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit(){
    //get current date
    let currentdate = moment(this.minDate).format('YYYY-MM-DD');
    
    //get url query params value
    this.route.queryParams.subscribe((params) => {
      this.checkin = params['checkin'];
      this.checkout = params['checkout'];
      this.adults = +params['adults']; // "+" is used to convert the string to a number
      this.child = +params['child'];
      this.num_rooms = +params['num_rooms'];
      this.city = params['city'];

      this.adultsQuantity = this.adults;
      this.childrenQuantity = this.child;
      this.roomsQuantity = this.num_rooms;
      //
      //console.log("params ", params);
      this.getHotelListByCity();
    });

     //get the bookin details from local storage if exist
     if(localStorage.getItem('search')){
      this.searchDetails = JSON.parse(localStorage.getItem('search') as string);
      //set value if previous value exist
      if(this.searchDetails.city){
        this.cityName = this.searchDetails.cityName;
        this.city = this.searchDetails.city;
        console.log("city ", this.searchDetails.cityName)
      }
      
      //assign child room and
      this.adultsQuantity = this.searchDetails.adults
      this.childrenQuantity = this.searchDetails.child
      this.roomsQuantity = this.searchDetails.num_rooms;
      //for search purpose
      this.adults = this.adultsQuantity;
      this.child =this.childrenQuantity;
      this.num_rooms = this.roomsQuantity;
      //assigned date checkin:this.checkIn, checkout:this.checkOut,
      if(this.searchDetails.checkin >= currentdate){
        this.bookDate = this.searchDetails.checkin +" - "+this.searchDetails.checkout;
      }else{
        Swal.fire({
          position: 'top',
          text: 'Please check your date is old',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
      //console.log("Date ", this.bookDate)
      this.checkin = this.searchDetails.checkin;
      this.checkout = this.searchDetails.checkout;
    }

  }

  hotelListNull:boolean=false;
  getHotelListByCity(){
    const queryData = {checkin: this.checkin, checkout:this.checkout , adults:this.adults, child:this.child, num_rooms:this.num_rooms, city: this.city}
    console.log("params ", queryData);
    //
    this._frontend.searchCity(queryData).subscribe({
        next: (res:any)=>{
          this.hotelList = res.result;
          //console.log("hotel list based on city ",this.hotelList);
          if(!this.hotelList){
            this.hotelListNull = true;
          }
        },
        error: err=>{
          console.log("error ", err)
        }
      })
  }


  /* Change gride size */
  onGridChange(type:string){
    //
    document.querySelector('.one-col-grid')?.classList.remove('act-grid-opt');
    document.querySelector('.two-col-grid')?.classList.add('act-grid-opt');
    //
    if(type == 'double'){
      document.querySelectorAll('.listing-item-container .listing-item')?.forEach((res:any)=>{
        res.classList.remove('has_one_column');
      });
      document.querySelectorAll('.listing-item-container .listing-item')?.forEach((res:any)=>{
        res.setAttribute('style', 'height: 517.167px;')
      });
    }

    if(type == 'single'){
      //
      document.querySelector('.one-col-grid')?.classList.add('act-grid-opt');
      document.querySelector('.two-col-grid')?.classList.remove('act-grid-opt');
      //
      document.querySelectorAll('.listing-item-container .listing-item')?.forEach((res:any)=>{
        res.classList.add('has_one_column');
      });
      document.querySelectorAll('.listing-item-container .listing-item')?.forEach((res:any)=>{
        res.removeAttribute('style');
      });
    }
  }


  // Price Range
  


  /* route on view page when click on hotel */
  onRouteDetails(list:any){
    if(list.be_hotel_code){
      const queryParams = {code: list.be_hotel_code,checkin: this.checkin, checkout: this.checkout, adults: this.adults, child:this.child, num_rooms: this.num_rooms}
      this.router.navigate(['/view'], { queryParams });
    }
  }



  /* ==============================================================================
                                    Filetr Section
  =================================================================================*/
  //============================= Booking Date =========================
  




  /* ============================
    handel Qunatity
  ==============================*/
  f_adults:number=1;  f_children:number=0; f_rooms:number=0;
  adultsQuantity: number = 1; childrenQuantity: number = 0; roomsQuantity: number = 1;
  handelQuantity(val: string, type:string){
    //get query params
    const queryParams = { ...this.route.snapshot.queryParams };
    
    
    //for adults
    switch (type) {
      case 'adults':
        if(this.adultsQuantity<20 && val==='plus'){
          this.adultsQuantity += 1;
        }else if(this.adultsQuantity>1 && val==='min'){
          this.adultsQuantity -= 1;
        }else{}
        //this.f_adults = this.adultsQuantity;
        queryParams['adults'] = this.adultsQuantity;
        break;
      case 'children':
        if(this.childrenQuantity<10 && val==='plus'){
          this.childrenQuantity += 1;
        }else if(this.childrenQuantity>0 && val==='min'){
          this.childrenQuantity -= 1;
        }else{}
        queryParams['child'] = this.childrenQuantity;
        break;
      case 'rooms':
        if(this.roomsQuantity<20 && val==='plus'){
          this.roomsQuantity += 1;
        }else if(this.roomsQuantity>1 && val==='min'){
          this.roomsQuantity -= 1;
        }else{}
        queryParams['num_rooms'] = this.roomsQuantity;
        break;
      default: ;
    }

    //change the value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', // This ensures other existing query parameters are preserved
    });
  }

  /* get Rating values for filter */
  ratingList:any=[{id:1, name: "5 Stars", rating: 5, status: false}, {id:2, name: "4 Stars", rating: 4, status: false}, {id:3, name: "3 Stars", rating: 3, status: false}];
  ratingValue: number=0;
  onRating(list:any){
    console.log("list rating ", list);
    if(list.status == true){
      this.ratingValue = list.rating;
    }
  }


  /* Filter value on fasility */
  facilityList:any=[{id:1, name: "Free WiFi", status: false}, {id:2, name: "PARKING", status: false}, {id:3, name: "FITNESS CENTER", status: false}, {id:3, name: "AIRPORT SHUTTLE", status: false},
  {id:5, name: "NON-SMOKING ROOMS", status: false}, {id:6, name: "AIR CONDITIONING", status: false}];
  facilityValue: any;
  onFacility(list:any){
    console.log("facilityList ", list)
    if(list.status == true){
      this.facilityValue = list.name;
    }
  }


  priceChange:string='';
  sortOnprice(){
    //console.log("price change ", this.priceChange)
    if(this.priceChange == 'asc'){
      this.hotelList.sort((a:any, b:any) => a.single_rate - b.single_rate);
    }
    console.log("list asc", this.hotelList)
    if(this.priceChange == 'dsc'){
      this.hotelList.sort((a:any, b:any) => b.single_rate - a.single_rate);
    }
  }


  /* =============================
    Address Filter 
    ==============================*/
  address:string=''; show_address:boolean=false; addressList:any;
  onAddress(){
    if(this.address){
      this.show_address = true;
      this.addressList = this.hotelList.filter((res:any)=>{
        return res.address.toLowerCase().includes(this.address.toLowerCase());
      })
    }else{
      this.show_address = false;
      this.getHotelListByCity();
    }
  }

  onSelectAddress(list:any){
    //console.log("select address ", list.address);
    this.address = list.address;
    this.show_address = false;

    //after select the address show the filter list
    this.hotelList = this.hotelList.filter((res:any)=>{
      return res.address.toLowerCase().includes(this.address.toLowerCase());
    });
  }


  /* ====================================
      Min price 
  =======================================*/

  minPrice:number=500;
  maxPrice:number=50000;
  onMinimum(){
    //when ever change the price it will all time list api
    

    console.log("mimimum price ", this.minPrice +'<'+ this.maxPrice);
    //filter the city
    if(this.minPrice || this.maxPrice){
      //jb list null ayi hogi pichle filter mai tu is bar pahle 1) api call hogi fir 2) filter hoga
      const queryData = {checkin: this.checkin, checkout:this.checkout , adults:this.adults, child:this.child, num_rooms:this.num_rooms, city: this.city}
      console.log("params ", queryData);
      //
      this._frontend.searchCity(queryData).subscribe((res:any)=>{
        this.hotelList = res.result;
        //console.log("City list ", this.f_cityList);
        this.hotelList = this.hotelList.filter((res:any)=>{
          return res.single_rate > this.minPrice && res.single_rate < this.maxPrice;
        })
        //
        if(this.hotelList.length>0){
          this.hotelListNull = false;
        }else{
          this.hotelListNull = true;
        }
      })
    }
    console.log("filter list ", this.hotelList.length)
    //if list null the show not found
    /* if(this.hotelList != null){
      this.hotelListNull = true;
    } */
  }




  /* =============================
      Filetr city
  ================================*/
  f_cityList:any=[]; cityName:string=''; show_cityhHotel:boolean=false;
  onCityList(){
    this.show_cityhHotel = true;
    //
    if(this.cityName && this.show_cityhHotel == true){
      this.show_cityhHotel = true;
      this._frontend.getCityName(this.cityName).subscribe((res:any)=>{
        let listValue = res;
        this.f_cityList = listValue.result;
        console.log("City list ", this.f_cityList);
      })
    }else{
      this.show_cityhHotel = false;
      console.log("city list ", this.cityName);
    }
  }

  onSelectCity(list:any){
    //
    this.cityName = list.name;
    this.show_cityhHotel = false;
    console.log("select City ", this.cityName);

    //get query params
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams['city'] = list.id;


    
    //change the value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', // This ensures other existing query parameters are preserved
    });

    //change place in local storage
    localStorage.setItem('search', JSON.stringify({city: list.id, cityName: this.cityName, checkin:this.checkin, checkout:this.checkout, adults:this.adults, child:this.child, num_rooms:this.num_rooms}));


  }



  bookDate:any;
  onChangeDate(){

    let arrDate = [];
    for(let i=0; i<=this.bookDate.length-1; i++){
      //moment(val).format('YYYY-MM-DD');
      arrDate[i] = this.bookDate[i].toString();
    }
    const checkIn = moment(arrDate[0]).format('YYYY-MM-DD');
    const checkOut = moment(arrDate[1]).format('YYYY-MM-DD');

    //get query params
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams['checkin'] = checkIn;
    queryParams['checkout'] = checkOut;
    
    //change the value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', // This ensures other existing query parameters are preserved
    });

  }


  

  

}
