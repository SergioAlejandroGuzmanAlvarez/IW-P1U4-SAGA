import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, merge, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private collection!: CollectionReference<DocumentData>;
  private clientes: Cliente[] = [];
  constructor(readonly firestore: Firestore, private clienteService: ClienteService) { 
    this.collection = collection(firestore, 'cliente');
    this.clientes=[
      {
        nombre: 'Karla Perez',
        celular: '3119098989',
        hora:'07:00am',
        tipo: 'Cumpleaños',
        descripcion: 'Cumpleaños con alberca',
        nivelAgua: 100,
        fecha: '2023-05-07',
        mesaRegalos: true,
        colorSobremantel: '',
        capacidadPersonas: 300,
        brincolin: true,
        precio: 5000,
        anticipo: 1000,
        tipoPago: 'Efectivo',
        totalPagar: 5000,
        restoPagar: 4000,
      }
    ];
  }
  getEventos() {
    return merge(of(this.clientes), // Datos iniciales de clientes
      collectionData(this.collection, { idField: 'id' }) // Datos reales de Firebase
    ) as Observable<Cliente[]>;
  }

  getEvento(fecha: string) {
    return collectionData(
      query(this.collection, where('fecha', '==', fecha))
    ) as Observable<Cliente[]>;
  }

  async addEvento(evento: Cliente) {
    const ref = await addDoc(this.collection, evento);
    return docData(ref);
  }

  updateEvento(evento: Cliente) {
    const dcmt = doc(this.firestore, `${this.collection.path}/${evento.idCliente!!}`);
    return updateDoc(dcmt, { ...evento });
  }

  deleteEvento(id: string) {
    return deleteDoc(doc(this.firestore, `${this.collection.path}/${id}`));
  }
}
