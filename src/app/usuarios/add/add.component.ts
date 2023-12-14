import { Component,OnDestroy,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import {  Usuario,PostUsuarioResponse } from '../usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class UsuariosAddComponent implements  OnDestroy {
  private subscription: Subscription = new Subscription();
    usuario:Usuario={
    id:0,
    nombre:'',
    apellidos:'',
    direccion:'',
    telefono:0,
    correo : ''
  };

  private apiService = inject(ApiService);
  private Router = inject(Router);

  onSubmit():void{
    const url = 'usuarios';
    this.apiService.postData<PostUsuarioResponse>(url,this.usuario).pipe(
      catchError(error => {
        console.error('Error al insertar el usuario', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
            this.Router.navigate(['/usuarios/list']);
          }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
