import { Component, OnDestroy, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import { GetHamburguesaResponse, Hamburguesa, PostHamburguesaResponse } from '../hamburguesa.interface';
import { Router,RouterLink  } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit, OnDestroy 
{

  private subscription: Subscription = new Subscription();
  hamburguesas:Hamburguesa[]=[];
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit():void
  {
    this.cargarHamburguesas();
  }

  private cargarHamburguesas() {
    const url = 'hamburguesas';
    this.apiService.getData<GetHamburguesaResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener hamburguesas:', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => this.hamburguesas = data.hamburguesas
    );
  }

  delete(id:number) :void
  {
    const url = `hamburguesas/${id}`;
    this.apiService.deleteData<PostHamburguesaResponse>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar la hamburguesa', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
           this.cargarHamburguesas();
          }
      }
    );
  }
  update(id: number) 
  {
    this.router.navigate([`/hamburguesas/edit/${id}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 }
