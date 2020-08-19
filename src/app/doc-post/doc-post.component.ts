import { Component, OnInit, Sanitizer } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ThrowStmt, NONE_TYPE } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-doc-post',
  templateUrl: './doc-post.component.html',
  styleUrls: ['./doc-post.component.css']
})
export class DocPostComponent implements OnInit {

  postData = {
    url: 'https://paperreceipts.org/wp-content/uploads/2019/11/receipt-2.png',
}
  end= `https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=xwGuqWSo1IwfnfcZ4JBS8Cno8upFCSJW`;
  response;
  fileToUpload;
  fileData;
  url; 
  display = 'none';
  dlhref = '';

  postMethod(files: FileList) {
    this.display = 'block';

    this.fileToUpload = files.item(0); 
    
    let formData = new FormData(); 
    this.fileData = formData;

    formData.append('document', this.fileToUpload, this.fileToUpload.name); 
    this.http.post("https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=xwGuqWSo1IwfnfcZ4JBS8Cno8upFCSJW", formData).subscribe((val:any) => {
    console.log(val.data)
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    console.log('adfad' + this.url)
    this.display = 'none';

    const blob = new Blob([val.data], { type: 'text/json' });
    const fileurl = window.URL.createObjectURL(blob);
    window.open(fileurl);

    return this.response = val.data;
    });
    }

    downloadVariable = function() {
            var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.response));
            var downloader = document.createElement('a');

            downloader.setAttribute('href', data);
            downloader.setAttribute('download', 'file.json');
            downloader.click()
    }

  refresh() {
    this.display = 'block';
    
    this.http.post("https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=xwGuqWSo1IwfnfcZ4JBS8Cno8upFCSJW", this.fileData).subscribe((val:any) => {
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    console.log('adfad' + this.url)
    this.display = 'none';

    const blob = new Blob([val.data], { type: 'text/json' });
    const fileurl = window.URL.createObjectURL(blob);

    return this.response = val.data;
    });
    }

  constructor(private http:HttpClient, sanitizer:DomSanitizer) { }

  ngOnInit() {
    
   // this.http.post(this.end,this.postData).toPromise().then((data: any) => {
      // console.log(data);
     // this.json = JSON.stringify(data.data);
    //});
    
    
  }
}
  