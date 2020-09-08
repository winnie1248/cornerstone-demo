import { Component, OnInit } from '@angular/core';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

declare const cornerstoneWADOImageLoader;

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
    // initializes WADO Image loader
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    // configure codecs and web workers
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      maxWebWorkers: 4,
      startWebWorkersOnDemand: true,
      webWorkerTaskPaths: [],
      taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: false,
          usePDFJS: false,
          strict: true,
        },
      },
    });
  }
}
