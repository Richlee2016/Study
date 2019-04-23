import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";

import { PreviewPage } from "../preview/preview"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public List:object = []

  constructor(public navCtrl: NavController, private http: Http) {
    this.http.get('/api/fetchList/hot')
    .subscribe(data => {
      const body:object =  JSON.parse(data['_body'])
      this.List = body
    },err => {
      console.log(err);
    })
  }

  GoVod(item){
    this.navCtrl.push(PreviewPage,{
      id:item.id
    })
  }


}
