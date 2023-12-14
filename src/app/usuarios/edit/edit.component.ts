import { Component,OnDestroy,OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import {  Usuario,PostUsuarioResponse,GetUsuarioResponse } from '../usuario.interface';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class UsuariosEditComponent implements OnInit, OnDestroy {
  id: string='';
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
  private activatedRoute = inject(ActivatedRoute);
  private router=inject(Router);

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const url = `usuarios/${this.id}`;
    this.apiService.getData<GetUsuarioResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return throwError(() => error);
      })
    ).subscribe(
      data =>
      {   
        this.usuario = data.usuarios[0];
      }
    );
  }

  onSubmit():void
  {
    const url =`usuarios/${this.id}`;
    this.apiService.putData<PostUsuarioResponse>(url,this.usuario).pipe(
      catchError(error => {
        console.error('Error al editar el usuario', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
            this.router.navigate(['/usuarios/list']);
          }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
