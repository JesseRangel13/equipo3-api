import { Component,OnDestroy,OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import {  Hamburguesa,PostHamburguesaResponse,GetHamburguesaResponse } from '../hamburguesa.interface';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy
{
  id: string='';
  private subscription: Subscription = new Subscription();
  hamburguesa :Hamburguesa={
    id:0,
    descripcion:'',
    nombre :'',
    imagen :'',
    calorias : 0
  };
  private apiService = inject(ApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router=inject(Router);

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const url = `hamburguesas/${this.id}`;
    this.apiService.getData<GetHamburguesaResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener la  hamburguesa:', error);
        return throwError(() => error);
      })
    ).subscribe(
      data =>
      {      
        this.hamburguesa = data.hamburguesas[0];
      }
    );
  }

  onSubmit():void
  {
    const url =`hamburguesas/${this.id}`;
    this.apiService.putData<PostHamburguesaResponse>(url,this.hamburguesa).pipe(
      catchError(error => {
        console.error('Error al editar la hamburguesa', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
            this.router.navigate(['/hamburguesas/list']);
          }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
