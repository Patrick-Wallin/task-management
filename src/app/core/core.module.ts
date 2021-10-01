import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class CoreModule { }
