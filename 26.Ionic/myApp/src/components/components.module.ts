import { NgModule } from '@angular/core';
import { PreviewComponent } from './preview/preview';
//引入BrowserModule  解决 ngFor报错的问题
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
	declarations: [PreviewComponent],
	imports: [BrowserModule],
	exports: [PreviewComponent]
})
export class ComponentsModule {}
