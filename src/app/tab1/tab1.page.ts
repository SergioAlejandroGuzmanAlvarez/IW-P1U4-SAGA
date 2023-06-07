import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonDatetime, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('calendar', { static: false }) calendar!: IonDatetime;
  private higlightColors = {
    Cumpleaños: { backgroundColor: '#9DD3A1', textColor: '#000' },
    Quinceañera: { backgroundColor: '#DE47AC', textColor: '#fff' },
    Boda: { backgroundColor: '#77DBE8', textColor: '#000' },
    'Baby Shower' :{ backgroundColor: '#CB3616', textColor: '#000' }
  };
  event?: Cliente;
  highlightedDates: ColorDate[] = [];
  events$: Subscription;
  event$?: Subscription;

  constructor(private eventoService: ClienteService, title: Title) {
    title.setTitle('Calendario');
    this.events$ = eventoService.getEventos().subscribe((eventos) => {
      this.highlightedDates = [];
      eventos.forEach((evento) => this.marcarFecha(evento.fecha, evento.tipo));
      this.calendar.reset();
    });
  }

  onDateChange(event: any) {
    const date = event.detail.value[0];
    this.event$?.unsubscribe();
    this.event$ = this.eventoService.getEvento(date).subscribe((event) => {
      this.event = event[0];
      this.calendar.reset();
    });
  }

  getColor(tipo: string) {
    if (tipo === 'Cumpleaños') {
      return 'warning';
    } else if (tipo === 'Boda') {
      return 'success';
    } else if (tipo === 'XV Años') {
      return 'primary';
    } else if (tipo === 'Baby Shower') {
      return 'secondary';
    } else {
      return 'tertiary';
    }
  }
  

  private marcarFecha(fecha: string, tipo: string) {
    const color =
      tipo === 'Quinceañera'
        ? this.higlightColors['Quinceañera']
        : tipo === 'Boda'
        ? this.higlightColors['Boda']
        : this.higlightColors['Cumpleaños'];
    this.highlightedDates.push({ date: fecha, ...color });
  }

  ngOnDestroy() {
    this.event$?.unsubscribe();
    this.events$.unsubscribe();
  }
}

interface ColorDate {
  date: string;
  backgroundColor: string;
  textColor: string;
}
