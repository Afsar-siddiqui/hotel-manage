import { Component } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';
import { ScriptsMethodService } from 'src/app/service/scripts-method.service';

import * as moment from 'moment';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/service/wishlist.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /* bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date(); */

  hotelId: string|null|undefined;
  cityId: number|null|undefined;
  bookDate: any|null|undefined;
  checkIn: string|null|undefined;
  checkOut: string|null|undefined;
  adults: number = 1;
  children: number = 0;
  rooms: number = 1;

  //wish List
  wishList:any=[];

  //
  minDate: Date;
  maxDate: Date;

  //
  hideDummyContent:boolean=false;


  constructor(private _scripts: ScriptsMethodService, private _frontend: FrontendService, private router: Router, private _whishList: WishlistService){
    this.minDate = new Date();
    this.maxDate = new Date();
    /* this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate]; */
  }

  recentHotel:any; popularHotel:any; searchDetails:any;
  ngOnInit(){

    //get the bookin details from local storage if exist
    if(localStorage.getItem('search')){
      this.searchDetails = JSON.parse(localStorage.getItem('search') as string);
      //set value if previous value exist
      if(this.searchDetails.city){
        this.place = this.searchDetails.cityName;
        this.cityId = this.searchDetails.city;
        //console.log("city ", this.searchDetails.cityName)
      }
      if(this.searchDetails.code){
        this.place = this.searchDetails.hotelName;
        this.hotelId = this.searchDetails.code;
      }
      //assign child room and
      this.adultsQuantity = this.searchDetails.adults
      this.childrenQuantity = this.searchDetails.child
      this.roomsQuantity = this.searchDetails.num_rooms;
      //for search purpose
      this.adults = this.adultsQuantity;
      this.children =this.childrenQuantity;
      this.rooms = this.roomsQuantity;
      //assigned date checkin:this.checkIn, checkout:this.checkOut,
      this.bookDate = this.searchDetails.checkin +" - "+this.searchDetails.checkout;
      
      //console.log("Date ", this.bookDate)
      this.checkIn = this.searchDetails.checkin;
      this.checkOut = this.searchDetails.checkout;
    }

    //Recently added hotel
    this._frontend.getRecentHotel().subscribe((res:any)=>{
      this.recentHotel = res.result;
      //console.log("recent ", this.recentHotel);
    })

    //Popupal Hotel
    this._frontend.getPopularHotel().subscribe((res:any)=>{
      let listValue = res;
      this.popularHotel = listValue.result;
      //console.log("popular ", this.popularHotel)
    })

  }

  /*  */
  slides:any = [
    {img: "assets/images/gal/3.jpg"},
    {img: "assets/images/gal/1.jpg"},
    {img: "assets/images/gal/6.jpg"},
    {img: "assets/images/gal/8.jpg"},
    {img: "assets/images/gal/4.jpg"},
    {img: "assets/images/gal/2.jpg"},
  ];
  slideConfig = {
    enabled: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 3000,
    accessibility: true,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "infinite": false,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  slideConfigPopular = {
    enabled: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 3000,
    accessibility: true,
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "infinite": false,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  
  /*  */
  place:string='';
  onPlace(){
    //console.log("plcae ", this.place);
    if(this.place){
      this.getCityList(this.place);
      this.getHotelList(this.place);
    }
  }

  
  hotelList:any;
  getHotelList(place:string){
    let q = place;
    this._frontend.getHotelName(q).subscribe((res:any)=>{
      let listValue = res.result;
      this.hotelList = listValue;
      console.log("hotel list ", this.hotelList);
    })
  }

  cityList:any;
  getCityList(place:string){
    let q = place;
    this._frontend.getCityName(q).subscribe((res:any)=>{
      let listValue = res;
      this.cityList = listValue.result;
      console.log("City list ", this.cityList);
    })
  }

  /* Sellect all fill details */
  cityName: string=''; hotelName:string='';
  onSelectPlace(list:any){
    this.cityId = null;
    this.hotelId = null;
    //console.log("select plcae ", list);
    this.place= list.name;
    //
    if(list.id){
      this.cityId = list.id;
      this.cityName = list.name;
    }

    if(list.be_hotel_code){
      this.hotelId = list.be_hotel_code;
      this.hotelName = list.name;
    }
    //console.log("plcae id ", this.hotelId);
  }

  
  onBookDate(){
    console.log("BookDate", this.bookDate)
    let arrDate = [];
    for(let i=0; i<=this.bookDate.length-1; i++){
      arrDate[i] = this.bookDate[i].toString();
    }
    this.checkIn = moment(arrDate[0]).format('YYYY-MM-DD');
    this.checkOut = moment(arrDate[1]).format('YYYY-MM-DD');

    //if date already exist and then change date it should to change loacl storage also
    if(this.searchDetails){
      if(this.searchDetails.city){
        localStorage.setItem('search', JSON.stringify({city: this.cityId, cityName: this.cityName, checkin:this.checkIn, checkout:this.checkOut, adults:this.adults, child:this.children, num_rooms:this.rooms}));
      }
      if(this.searchDetails.code){
        localStorage.setItem('search', JSON.stringify({code:this.hotelId, hotelName: this.hotelName, checkin:this.checkIn, checkout:this.checkOut, adults:this.adults, child:this.children, num_rooms:this.rooms}));
      }
    }
  }


/* ============================
      Wish List
===============================*/
addToWishlist(list: any) {
  this._whishList.addToWishlist(list);
}


  //handel quantity
  adultsQuantity: number = 1; childrenQuantity: number = 0; roomsQuantity: number = 1;
  handelQuantity(val: string, type:string){
    //for adults
    switch (type) {
      case 'adults':
        if(this.adultsQuantity<20 && val==='plus'){
          this.adultsQuantity += 1;
        }else if(this.adultsQuantity>1 && val==='min'){
          this.adultsQuantity -= 1;
        }else{}
        this.adults = this.adultsQuantity;
        break;
      case 'children':
        if(this.childrenQuantity<10 && val==='plus'){
          this.childrenQuantity += 1;
        }else if(this.childrenQuantity>0 && val==='min'){
          this.childrenQuantity -= 1;
        }else{}
        this.children = this.childrenQuantity;
        break;
      case 'rooms':
        if(this.roomsQuantity<20 && val==='plus'){
          this.roomsQuantity += 1;
        }else if(this.roomsQuantity>1 && val==='min'){
          this.roomsQuantity -= 1;
        }else{}
        this.rooms = this.roomsQuantity;
        break;
      default: ;
    }
  }


  //search hotel list
  onSearch(){
    //get current date
    let currentdate = moment(this.minDate).format('YYYY-MM-DD');
    //console.log("date check ", this.searchDetails.checkin +"<="+ currentdate)
    if(this.searchDetails){
      this.searchDetails = JSON.parse(localStorage.getItem('search') as string);
      if(this.searchDetails.checkin >= currentdate){}else{
        Swal.fire({
          position: 'top',
          text: 'Please check your booking date old',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
        return ;
      }
    }
   
    //hotel:string, checkin:string, checkout:string, adults:number, child:number, num_rooms:number, city:number
    const queryParams = {code:this.hotelId, checkin:this.checkIn, checkout:this.checkOut, adults:this.adults, child:this.children, num_rooms:this.rooms, city: this.cityId}
    //redirect on details page when choose hotel
    if(this.bookDate && (this.place)){
      if(this.hotelId){
        this.router.navigate(['/view'], { queryParams });
        localStorage.setItem('search', JSON.stringify({code:this.hotelId, hotelName: this.hotelName, checkin:this.checkIn, checkout:this.checkOut, adults:this.adults, child:this.children, num_rooms:this.rooms}))
      }
  
      //redirect on hotel list page when choose city
      if(this.cityId){
        this.router.navigate(['/hotel-list'], { queryParams });
        localStorage.setItem('search', JSON.stringify({city: this.cityId, cityName: this.cityName, checkin:this.checkIn, checkout:this.checkOut, adults:this.adults, child:this.children, num_rooms:this.rooms}))
      }
    }else{
      //when booking date null
      if(!this.bookDate){
        Swal.fire({
          position: 'top',
          text: 'Please select booking date',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
      //when place null
      if(!this.place){
        Swal.fire({
          position: 'top',
          text: 'Please select city or hotel',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }

    }
  }


   /* route on view page when click on hotel */
   onRouteDetails(list:any){
    let date = new Date();
    //next date
    let nextDate = new Date();
    nextDate.setDate(date.getDate() + 1);
    //
    let checkin = moment(date).format('YYYY-MM-DD');  let checkout = moment(nextDate).format('YYYY-MM-DD');
    console.log("checkin ", checkin)
    let adults = 1; let num_rooms = 1; let child = 0;
    if(list.be_hotel_code){
      const queryParams = {code: list.be_hotel_code,checkin: checkin, checkout: checkout, "adults":adults, "child":child, "num_rooms":num_rooms}
      this.router.navigate(['/view'], { queryParams });
    }
  }


  onDropDown(selector:string, addClass:string){
    this._scripts.dropDown(selector, addClass);
  }

  onDropDownAttributes(selector:string){
    this._scripts.dropDownAttributes(selector);
  }


}
