import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
import { CropperPage } from '../components/cropper/cropper.page';

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {

  constructor(
    private imageCompress: NgxImageCompressService,
  ) { }


  async returnImageCompress(){
    return await this.imageCompress.uploadFile().then(
      async ({image, orientation}) => {
        return await this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
           async (compressedImage) => {
          return await compressedImage
            });
      }
    );
  }

  async returnImageCompressMultiple(){
    const array:any = []
     await this.imageCompress.uploadMultipleFiles().then(
      async (images:UploadResponse[]) => {
  
      for(let img of images){
        await this.imageCompress
        .compressFile(img.image, img.orientation, 50, 50) // 50% ratio, 50% quality
        .then(
         async (compressedImage) => {
          array.push(compressedImage)
          });
      }

    }
    );
    return array;
  }

  dataURItoBlob(dataURI:any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this

    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString})

  }
}
