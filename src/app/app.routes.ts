import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './hamburguesas/list/list.component';
import { AddComponent } from './hamburguesas/add/add.component';
import { EditComponent } from './hamburguesas/edit/edit.component';
import { UsuariosListComponent } from './usuarios/list/list.component';
import { UsuariosAddComponent } from './usuarios/add/add.component';
import { UsuariosEditComponent } from './usuarios/edit/edit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },       // default route
    { path: 'hamburguesas/list', component: ListComponent }, 
    { path: 'hamburguesas/add', component: AddComponent },
    { path: 'hamburguesas/edit/:id', component: EditComponent },
    { path: 'usuarios/list', component: UsuariosListComponent }, 
    { path: 'usuarios/add', component: UsuariosAddComponent },
    { path: 'usuarios/edit/:id', component: UsuariosEditComponent }, 
];

