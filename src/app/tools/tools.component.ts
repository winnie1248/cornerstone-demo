import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { IMAGE_PATH, DICOM_PATH } from '../mock-data';
import { from } from 'rxjs';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit, AfterViewInit {
  @ViewChild('imageLoader') imageLoader: ElementRef;
  imagesUrl = IMAGE_PATH.map(
    (url: string) => `${window.location.origin}${url}`
  );
  dicomsUrl = DICOM_PATH.map(
    (url: string) => `wadouri:${window.location.origin}${url}`
  );
  scrollToIndex = cornerstoneTools.import('util/scrollToIndex');
  element: any;
  imageIds: string[] = [];

  constructor() {}

  ngOnInit(): void {
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init();
    cornerstoneTools.toolStyle.setToolWidth(2);
    cornerstoneTools.toolColors.setToolColor('rgb(255, 255, 0)');
    cornerstoneTools.toolColors.setActiveColor('rgb(0, 255, 0)');
  }

  ngAfterViewInit(): void {
    this.element = this.imageLoader.nativeElement;
    cornerstone.enable(this.element);
  }

  loadImages(imageIds: string[]): void {
    this.imageIds = imageIds;
    from(cornerstone.loadAndCacheImage(imageIds[0])).subscribe((image) => {
      const viewport = cornerstone.getDefaultViewportForImage(
        this.element,
        image
      );
      cornerstone.displayImage(this.element, image, viewport);
      cornerstoneTools.addStackStateManager(this.element, ['stack']);
      cornerstoneTools.addToolState(this.element, 'stack', {
        currentImageIdIndex: 0,
        imageIds,
      });
    });
  }

  enableWindowing(): void {
    const WwwcTool = cornerstoneTools.WwwcTool;
    cornerstoneTools.addTool(WwwcTool);
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
  }

  invertImage(): void {
    const viewport = cornerstone.getViewport(this.element);
    viewport.invert = !viewport.invert;
    cornerstone.setViewport(this.element, viewport);
  }

  enableScroll(): void {
    const StackScrollTool = cornerstoneTools.StackScrollTool;
    cornerstoneTools.addTool(StackScrollTool);
    cornerstoneTools.setToolActive('StackScrollTool', { mouseButtonMask: 1 });
    // const StackScrollMouseWheelTool =
    //   cornerstoneTools.StackScrollMouseWheelTool;
    // cornerstoneTools.addTool(StackScrollMouseWheelTool);
    // cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
  }

  enableLength(): void {
    const LengthTool = cornerstoneTools.LengthTool;
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
  }

  enableAngle(): void {
    const AngleTool = cornerstoneTools.AngleTool;
    cornerstoneTools.addTool(AngleTool);
    cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
  }

  enableArrowAnnotate(): void {
    const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
    cornerstoneTools.addTool(ArrowAnnotateTool);
    cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
  }

  enableProbe(): void {
    const ProbeTool = cornerstoneTools.ProbeTool;
    cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 });
  }

  enableElliptical(): void {
    const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
    cornerstoneTools.addTool(EllipticalRoiTool);
    cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 });
  }

  enableRectangle(): void {
    const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
    cornerstoneTools.addTool(RectangleRoiTool);
    cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 });
  }

  resetImage(): void {
    cornerstone.reset(this.element);
  }

  clearAnnotation(): void {
    cornerstoneTools.clearToolState(this.element, 'Length');
    cornerstoneTools.clearToolState(this.element, 'Angle');
    cornerstoneTools.clearToolState(this.element, 'ArrowAnnotate');
    cornerstoneTools.clearToolState(this.element, 'Probe');
    cornerstoneTools.clearToolState(this.element, 'EllipticalRoi');
    cornerstoneTools.clearToolState(this.element, 'RectangleRoi');
    cornerstone.updateImage(this.element);
  }

  enableZoom(): void {
    const ZoomTool = cornerstoneTools.ZoomTool;
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
  }

  enablePan(): void {
    const PanTool = cornerstoneTools.PanTool;
    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  }

  saveAs(fileName: string = 'demo.png'): void {
    cornerstoneTools.SaveAs(this.element, fileName);
  }

  playClip(): void {
    cornerstoneTools.playClip(this.element, 10);
  }

  stopClip(): void {
    cornerstoneTools.stopClip(this.element);
  }

  previousImage(): void {
    const stackData = cornerstoneTools.getToolState(this.element, 'stack');
    const { currentImageIdIndex } = stackData.data[0];
    if (currentImageIdIndex > 0) {
      this.scrollToIndex(this.element, currentImageIdIndex - 1);
    }
  }

  nextImage(): void {
    const stackData = cornerstoneTools.getToolState(this.element, 'stack');
    const { currentImageIdIndex } = stackData.data[0];
    if (currentImageIdIndex < this.imageIds.length - 1) {
      this.scrollToIndex(this.element, currentImageIdIndex + 1);
    }
  }

  skipToFirstImage(): void {
    this.scrollToIndex(this.element, 0);
  }

  skipToLastImage(): void {
    this.scrollToIndex(this.element, this.imageIds.length - 1);
  }
}
