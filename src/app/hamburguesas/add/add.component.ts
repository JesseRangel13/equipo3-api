import { Component,OnDestroy,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import {  Hamburguesa,PostHamburguesaResponse } from '../hamburguesa.interface';
import { Router } from '@angular/router';
import { UsuariosEditComponent } from '../../usuarios/edit/edit.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements  OnDestroy 
{
  private subscription: Subscription = new Subscription();
  hamburguesa :Hamburguesa={
    id:0,
    descripcion:'',
    nombre :'',
    imagen :'',
    calorias : 0
  };

  private apiService = inject(ApiService);
  private Router = inject(Router);

  onSubmit():void{
    const url = 'hamburguesas';
    this.apiService.postData<PostHamburguesaResponse>(url,this.hamburguesa).pipe(
      catchError(error => {
        console.error('Error al insertar la hamburguesa', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
            this.Router.navigate(['/hamburguesas/list']);
          }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
