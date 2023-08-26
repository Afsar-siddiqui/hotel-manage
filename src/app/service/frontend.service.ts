import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  baseUrl = "https://revchm.com/tests";
  constructor(private http: HttpClient) { }

  getLogin(data:any){
    return this.http.post(this.baseUrl+'/web_login', data);
  }

  getSignUp(data:any){
    return this.http.post(this.baseUrl+'/web_signup', data);
  }

  getMobileNo(mobile:any){
    return this.http.get(this.baseUrl+'/validate_mobile?mobile='+mobile);
  }

  validateOTP(data:any){
    return this.http.post(this.baseUrl+'/validate_otp', data);
  }

  getUserById(data:any){
    return this.http.post(this.baseUrl+'/get_user', data);
  }

  getHotelName(q:string){
    return this.http.get(this.baseUrl+`/get_hotels?q=${q}`);
  }

  getCityName(q:string){
    return this.http.get(this.baseUrl+`/get_cities?q=${q}`);
  }

  getPopularHotel(){
    return this.http.get(this.baseUrl+'/get_popular_hotels')
  }

  getRecentHotel(){
    return this.http.get(this.baseUrl+'/get_recent_hotels')
  }

  getSimilarHotel(id:any){
    return this.http.get(this.baseUrl+'/get_similar_hotels?id='+id);
  }

  searchHotel(data:any){
    //hotel:string, checkin:string, checkout:string, adults:number, child:number, num_rooms:number, city:number
    //https://revchm.com/tests/get_hotel_listing?code=Sk23QFSFlD&checkin=2023-08-28&checkout=2023-08-30&adults=2&child=1&num_rooms=5&city=392
    return this.http.get(this.baseUrl+`/get_hotel_detail?code=${data.code}&checkin=${data.checkin}&checkout=${data.checkout}&adults=${data.adults}&child=${data.child}&num_rooms=${data.num_rooms}`);
    
  }

  searchCity(data:any){
    return this.http.get(this.baseUrl+`/get_hotel_listing?checkin=${data.checkin}&checkout=${data.checkout}&adults=${data.adults}&child=${data.child}&num_rooms=${data.num_rooms}&city=${data.city}`);
  }

  getHotelDetails(){
    return this.http.get(this.baseUrl+'/get_hotel_detail?code=XhZ06W32ne&checkin=2023-07-24&checkout=2023-07-26&adults=2&child=1&num_rooms=2')
  }

  getBookings(data:any){
    return this.http.get(this.baseUrl+`/get_room_rate_plans_rates?checkin=${data.checkin}&checkout=${data.checkout}&room_rate_plan_id=${data.room_rate_plan_id}`);
  }


  payAtHotel(data:any){
    return this.http.post(this.baseUrl+'/portal_push_booking', data);
  }

  getUserBookings(id:any){
    return this.http.get(this.baseUrl+'/get_user_bookings?user_id='+id)
  }

}
