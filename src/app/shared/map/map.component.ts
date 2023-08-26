import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() lat: number=0;
  @Input() lng: number=0;

  constructor(){}

  ngOnInit() {
    
  }

  

}
