import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges {

  img: string = "";
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') 
  set changeImg(newImg: string | undefined)
  {
    if(newImg){
      this.img = newImg;
      console.log('Change just img =>', this.img);
    }
  }
  @Input() alt: string = "";
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = "";

  constructor() { }

  ngOnInit(): void {
    this.imgDefault = './assets/images/default.png';
  }

  imgError(){
    this.img = this.imgDefault;
  }

  onLoaded(){
    console.log('notificacion al hijo');
    this.loaded.emit(this.img);
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngChanges', 'imgValue => ', this.img);
    console.log(changes);
  }
}
