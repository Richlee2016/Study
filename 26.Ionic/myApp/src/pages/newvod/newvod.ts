import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
/**
 * Generated class for the NewvodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newvod',
  templateUrl: 'newvod.html',
})
export class NewvodPage {
  public box = ""
  public times = 0
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http
  ) {
    this.http.get(`/api/Movie/GetMovieVod/2`)
    .subscribe(data => {
      console.log(data);
    },err => {
      console.log(err);
      console.log('失败');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewvodPage');
    this.box = this.navParams.get('item');
    

  }

}
