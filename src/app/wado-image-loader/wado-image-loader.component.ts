import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as cornerstone from 'cornerstone-core';

import { DICOM_PATH } from '../mock-data';
import { DicomDecoded } from '../model/dicom.model';

declare const cornerstoneWADOImageLoader;

@Component({
  selector: 'app-wado-image-loader',
  templateUrl: './wado-image-loader.component.html',
  styleUrls: ['./wado-image-loader.component.scss'],
})
export class WadoImageLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('dicomImage') dicomImage: ElementRef;
  dicomsUrl = DICOM_PATH.map(
    (url: string) => `wadouri:${window.location.origin}${url}`
  );
  element: any;
  dicomInfo: any;
  imageUrl =
    'https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.element = this.dicomImage.nativeElement;
    cornerstone.enable(this.element);
    this.loadImage(this.dicomsUrl[0]).subscribe();
  }

  downloadAndView(url: string): void {
    const imageId = `wadouri:${url}`;
    this.loadImage(imageId).subscribe();
  }

  uploadImage(files: FileList): void {
    if (files && files.length > 0) {
      cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
        files[0]
      );
      this.loadImage(imageId).subscribe();
    }
  }

  private loadImage(imageId: string): Observable<any> {
    return from(cornerstone.loadAndCacheImage(imageId)).pipe(
      tap((image) => {
        const viewport = cornerstone.getDefaultViewportForImage(
          this.element,
          image
        );
        cornerstone.displayImage(this.element, image, viewport);
        this.dicomInfo = this.dicomHexDecoded(image);
      })
    );
  }

  private dicomHexDecoded(image: any): any {
    const imageData = image.data;
    console.log(image);
    console.log(imageData);
    return {
      patient: {
        patientId: imageData.string(DicomDecoded.patientId),
        patientName: imageData.string(DicomDecoded.patientName),
        patientBirthDate: imageData.string(DicomDecoded.patientBirthDate),
        patientSex: imageData.string(DicomDecoded.patientSex),
      },
      study: {
        studyId: imageData.string(DicomDecoded.studyId),
        studyDate: imageData.string(DicomDecoded.studyDate),
        studyTime: imageData.string(DicomDecoded.studyTime),
        studyDescription: imageData.string(DicomDecoded.studyDescription),
        protocolName: imageData.string(DicomDecoded.protocolName),
        accessionNumber: imageData.string(DicomDecoded.accessionNumber),
      },
      series: {
        seriesNumber: imageData.string(DicomDecoded.seriesNumber),
        seriesDate: imageData.string(DicomDecoded.seriesDate),
        seriesTime: imageData.string(DicomDecoded.seriesTime),
        seriesDescription: imageData.string(DicomDecoded.seriesDescription),
        modality: imageData.string(DicomDecoded.modality),
        bodyPartExamined: imageData.string(DicomDecoded.bodyPartExamined),
      },
      instance: {
        instanceNumber: imageData.string(DicomDecoded.instanceNumber),
        acquisitionNumber: imageData.string(DicomDecoded.acquisitionNumber),
        acquisitionDate: imageData.string(DicomDecoded.acquisitionDate),
        acquisitionTime: imageData.string(DicomDecoded.acquisitionTime),
        contentDate: imageData.string(DicomDecoded.contentDate),
        contentTime: imageData.string(DicomDecoded.contentTime),
      },
      equipment: {
        manufacturer: imageData.string(DicomDecoded.manufacturer),
        modelName: imageData.string(DicomDecoded.modelName),
        stationName: imageData.string(DicomDecoded.stationName),
        applicationEntityTitle: imageData.string(
          DicomDecoded.applicationEntityTitle
        ),
        institutionName: imageData.string(DicomDecoded.institutionName),
        softwareVersion: imageData.string(DicomDecoded.softwareVersion),
        implementationVersionName: imageData.string(
          DicomDecoded.implementationVersionName
        ),
      },
    };
  }
}
