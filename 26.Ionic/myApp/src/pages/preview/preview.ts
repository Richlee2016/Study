import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  public Vod:object = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  ionViewDidLoad() {
    const id:string = this.navParams.get('id');
    this.http.get(`/api//fetchDetail/${id}`)
    .subscribe(data => {
      const body:object =  JSON.parse(data['_body']);
      this.Vod = body;
    },err => {
      console.log(err);
    })
  }

}
