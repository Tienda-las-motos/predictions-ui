import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ColorDirective } from './color.directive';
import { DirectivesDirective } from './directives/random-background.directive';



@NgModule({
  declarations: [
    ColorDirective,
    DirectivesDirective
  ],
  imports: [
    // CommonModule
  ],
  exports: [
    ColorDirective,
    DirectivesDirective
  ]
})
export class ColorThemeModule { }
