import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsNumber'
})
export class VowelsNumberPipe implements PipeTransform {

  transform(value: string): string {
    let array = value.split('');
    let result = '';
    array.forEach(letter => {
      let temp = letter.toUpperCase();
      if(temp == 'A'){
        letter = '4';
      }else if(temp == 'E'){
        letter = '3';
      }else if(temp == 'I'){
        letter = '1';
      }else if(temp == 'O'){
        letter = '0';
      }else if(temp == 'U'){
        letter = '-';
      }
      result += letter;
    });
    return result;
  }

}
