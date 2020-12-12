import { Injectable } from '@angular/core';
import { ColorPalette } from './color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  ColorPalette: ColorPalette
  constructor () {
    this.ColorPalette = {
      primary: '#3D5AFE',
      acent: '#FFF436',
      dark: '#292F4D',
      danger: '#EE3333',
      bg1: '#EFF1FE',
      bg2: '#FFFFFF',
      bg3: '#FFB769',
      complement1: '#935CFF',
      complement2: '#42CBFF',
      complement3: '#FFB769',
      complement4: '#99F724'
    }
  }
  
  generateRandomColor() {
    var randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
    return randomColor;
  }

  generateHSLcolor(saturation: number, light: number) {
    return `hsl(${Math.ceil(360 * Math.random())},${saturation}%,${light}%)`;
  }

  generateBrightColor() {
    return "hsl(" + Math.ceil(360 * Math.random()) + ",60%,90%)";
  }
}
