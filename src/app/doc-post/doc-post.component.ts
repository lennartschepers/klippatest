import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ThrowStmt } from '@angular/compiler';

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
  url; 

  postMethod(files: FileList) {
    this.fileToUpload = files.item(0); 
    
    let formData = new FormData(); 
    formData.append('document', this.fileToUpload, this.fileToUpload.name); 
    this.http.post("https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=xwGuqWSo1IwfnfcZ4JBS8Cno8upFCSJW", formData).subscribe((val:any) => {
    console.log(val.data)
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    console.log('adfad' + this.url)
    return this.response = val.data;
    });
    }

  imagePreview() {
    console.log('adf');
  }



  // tableMaker(response) {
//    let reponseArray =  response.entries()
    
  //}

  constructor(private http:HttpClient) { }
  ngOnInit() {
   // this.http.post(this.end,this.postData).toPromise().then((data: any) => {
      // console.log(data);
     // this.json = JSON.stringify(data.data);
    //});
    
    
  }}