import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonDatetime, IonicModule, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private toastController: ToastController,private navCtrl: NavController,private clienteService: ClienteService) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: '¡Se ha agendado un nuevo cliente!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    celular: '',
    hora:'',
    tipo: '',
    fecha: '',
    nivelAgua: 0,
    mesaRegalos: false,
    colorSobremantel: '',
    capacidadPersonas: 0,
    brincolin: false,
    precio: 0,
    anticipo: 0,
    tipoPago: '',
    totalPagar: 0,
    restoPagar: 0,
    descripcion: ''
  };

  submitForm() {
    this.cliente.totalPagar = this.cliente.precio + this.cliente.anticipo;
    this.cliente.restoPagar = this.cliente.precio - this.cliente.anticipo;

    this.clienteService.addEvento(this.cliente).then(() => {
      this.resetForm();
      this.presentToast();
    }).catch((error) => {
      console.error('Error al agregar evento:', error);
    });
  }
  calculateTotal() {
    const precio = Number(this.cliente.precio);
    const anticipo = Number(this.cliente.anticipo);
    this.cliente.totalPagar = precio + anticipo;
  }
  
  calculateRest() {
    const precio = Number(this.cliente.precio);
    const anticipo = Number(this.cliente.anticipo);
    this.cliente.restoPagar = precio - anticipo;
  }  
  
  
  formIsValid() {
    return (
      this.cliente.nombre &&
      this.cliente.celular &&
      this.cliente.tipo &&
      this.cliente.fecha &&
      this.cliente.capacidadPersonas !== 0 &&
      this.cliente.precio !== 0 &&
      this.cliente.anticipo !== 0 
    );
  }
  
  resetForm() {
    this.cliente = {
      nombre: '-',
      celular: '-',
      hora:'-',
      tipo: '-',
      fecha: '-',
      nivelAgua: 0,
      mesaRegalos: false,
      colorSobremantel: '',
      capacidadPersonas: 0,
      brincolin: false,
      precio: 0,
      anticipo: 0,
      tipoPago: '-',
      totalPagar: 0,
      restoPagar: 0,
      descripcion: ''
    };
  }
}
