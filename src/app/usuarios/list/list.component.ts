import { Component, OnDestroy, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../data/api.service';
import { catchError, throwError, Subscription } from 'rxjs';
import { GetUsuarioResponse, Usuario, PostUsuarioResponse } from '../usuario.interface';
import { Router,RouterLink  } from '@angular/router';


@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class UsuariosListComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  usuarios:Usuario[]=[];
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit():void
  {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    const url = 'usuarios';
    this.apiService.getData<GetUsuarioResponse>(url).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => this.usuarios = data.usuarios
    );
  }

  delete(id:number) :void
  {
    const url = `usuarios/${id}`;
    this.apiService.deleteData<PostUsuarioResponse>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar la usuario', error);
        return throwError(() => error);
      })
    ).subscribe(
      data => {
          if(!data.error){
           this.cargarUsuarios();
          }
      }
    );
  }

  update(id: number) 
  {
    this.router.navigate([`/usuarios/edit/${id}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
