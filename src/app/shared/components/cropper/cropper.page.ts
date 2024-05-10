import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularCropperjsModule, CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.page.html',
  styleUrls: ['./cropper.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
    AngularCropperjsModule
  ]
})
export class CropperPage implements OnInit {
  @ViewChild('angularCropper') public angularCropper!: CropperComponent;
  @Input() imageUrl:any;
  config = {
    dragMode : 'move',
    background : true,
    movable: true,
    rotatable : true,
    scalable: true,
    zoomable: true,
    viewMode: 1,
    checkImageOrigin : true,
    checkCrossOrigin: true
  };

  constructor(
    private modal:ModalController
  ) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss()
  }
  save(){
    this.imageUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
 
    this.modal.dismiss(this.imageUrl);
  }

}
