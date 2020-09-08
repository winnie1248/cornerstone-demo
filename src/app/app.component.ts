import { Component, OnInit } from '@angular/core';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // initializes Web Image loader
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
  }
}
