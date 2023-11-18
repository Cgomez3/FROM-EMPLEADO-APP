import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, throwError, tap } from 'rxjs';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private urlEndPoin: string = 'http://localhost:8090/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoin + '/listado-empleados').pipe(
      map((response) => {
        let empleados = response as Empleado[];
        console.log(empleados);
        return empleados.map((empleado) => {
          empleado.nombres = empleado.nombres.toLocaleUpperCase();
          return empleado;
        });
      })
    );
  }

  delete(nroDoc: String): Observable<Empleado> {
    return this.http
      .delete<Empleado>(`${this.urlEndPoin + '/eliminar-empleado'}/${nroDoc}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          return throwError(e);
        })
      );
  }

  getEmpleado(nroDoc: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoin + '/obtener-empleado-por-documento'}/${nroDoc}`).pipe(
      catchError((e) => {
        this.router.navigate(['/crud']);
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return throwError(e);
      })
    );
  }

  
  create(empleado: Empleado): Observable<Empleado> {
    console.log(empleado);
    return this.http
      .post(this.urlEndPoin + '/crear-empleado' , empleado, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.empleado as Empleado),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          return throwError(e);
        })
      );
  }

  
  update(empleado: Empleado): Observable<any> {
    console.error(empleado);
    return this.http
      .put<any>(`${this.urlEndPoin + '/editar-empleado' }/${empleado.documentoId}`, empleado, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => new Error(e));
          }

          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          return throwError(e);
        })
      );
  }

}
