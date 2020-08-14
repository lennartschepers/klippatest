import { Component } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { DocPostComponent } from './doc-post/doc-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
}
