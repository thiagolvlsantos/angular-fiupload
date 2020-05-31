import { Component, VERSION,OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Image file upload in Angular ' + VERSION.full;
  filesToUpload: FileList = null;
  files: File[] = [];
  data: any[];

  constructor(){
  }

  ngOnInit() {
  }

  handleFileInput(event: any) {
    let target = event.target as HTMLInputElement;
    this.filesToUpload = target.files;
    this.files = [];
    this.data = [];
    for(let i = 0; i < this.filesToUpload.length;i++) {
      let f = this.filesToUpload.item(i);
      this.files.push(f);
      this.data.push(f);
      let fileReader = new FileReader();
      let image = f.type.match(/image/);
      fileReader.onload = (e) => {
        this.data[i].file = f;
        this.data[i].content = fileReader.result;
        this.data[i].image = image; 
      };
      if(image){
        fileReader.readAsDataURL(this.files[i]);
      } else {
        fileReader.readAsText(this.files[i]);
      }
    }
  }
}
