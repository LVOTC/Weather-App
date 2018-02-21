import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  searchValue:string;
  temp = new Object;
  weather = [];
  show = false;
  str:string = "bf108632a392e7ed334212a135d21f38";
  constructor(private http: HttpClient) { }

  clock = Observable
          .interval(1000)
          .map(()=> new Date());

  ngOnInit() {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q=Vilnius&units=metric&APPID=bf108632a392e7ed334212a135d21f38').subscribe(temp => {
        this.temp = temp;
      });
  }
  onSearch(){
    let searchValue = document.querySelector('.search')["value"];
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+searchValue+'&units=metric&APPID='+this.str).subscribe(temp => {
    this.temp = temp;
    this.weather.push(this.temp);
    document.querySelector('#myTab').innerHTML = '';
    document.querySelector("#myTabContent").innerHTML = '';
    for(let i = 0; i < this.weather.length; i++){
      document.querySelector('#myTab').innerHTML += '<li class="nav-item"><a class="nav-link" id="'+this.weather[i].name+'-tab" data-toggle="tab" href="#'+this.weather[i].name+'" role="tab" aria-controls="'+this.weather[i].name+'" aria-selected="false">'+this.weather[i].name+'</a></li>';
      document.querySelector("#myTabContent").innerHTML +=
      `<div class="tab-pane fade" id="`+this.weather[i].name+`" role="tabpanel" aria-labelledby="`+this.weather[i].name+`-tab">
        <div class="row">
          <div class="col-md-12">
            <div class="row weather">
              <div class="col-md-6">
              <span class="info-text"><i class="fas fa-sun sun"></i>Weather</span>
                <p class="text-city">`+this.weather[i].weather[0].main+`</p>
                <p class="text-wind">Wind speed `+this.weather[i].wind.speed+`m/s</p>
              </div>
              <div class="col-md-6 temp-box">
                <span class="temp">`+this.weather[i].main.temp+` &#8451;</span>
                <img src="http://openweathermap.org/img/w/`+this.weather[i].weather[0].icon+`.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
    document.querySelectorAll('.nav-link')[this.weather.length-1].classList.toggle('active');
    document.querySelectorAll('.nav-link')[this.weather.length-1].classList.toggle('show');
    document.querySelectorAll('.tab-pane')[this.weather.length-1].classList.toggle('active');
    document.querySelectorAll('.tab-pane')[this.weather.length-1].classList.toggle('show');
    });
    document.querySelector('.jumbotron')["style"].background = "url('/assets/images/"+this.temp["weather"][0].main+".png')";
      }
}
