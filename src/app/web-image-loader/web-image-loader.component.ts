import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { from } from 'rxjs';
import * as cornerstone from 'cornerstone-core';

@Component({
  selector: 'app-web-image-loader',
  templateUrl: './web-image-loader.component.html',
  styleUrls: ['./web-image-loader.component.scss'],
})
export class WebImageLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('webImage') webImage: ElementRef;
  element: any;
  imageUrl =
    'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.element = this.webImage.nativeElement;
    cornerstone.enable(this.element);
    this.downloadAndView(
      `${window.location.origin}/assets/image_case/patient00001_study1_view1_frontal.jpg`
    );
  }

  downloadAndView(url: string): void {
    this.loadImage(url);
  }

  private loadImage(imageId: string): void {
    from(cornerstone.loadAndCacheImage(imageId)).subscribe((image) => {
      const viewport = cornerstone.getDefaultViewportForImage(
        this.element,
        image
      );
      cornerstone.displayImage(this.element, image, viewport);
    });
  }
}
