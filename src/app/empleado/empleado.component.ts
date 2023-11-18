import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { Observable,tap } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})

export class EmpleadoComponent implements OnInit {

  empleados:  Array<Empleado>=new Array<Empleado>;

  constructor(private empleadoService: EmpleadoService){ }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().pipe(
      tap(res => {
      })
    ).subscribe(
      empleados => this.empleados= empleados
    );
}

delete(empleado:Empleado): void{
  Swal.fire({
    title: 'Esta seguro?',
    text: `Seguro que desea eliminar al cliente ${empleado.nombres} ${empleado.apellidos}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.empleadoService.delete(empleado.documentoId).subscribe(
        response =>{
          this.empleados = this.empleados.filter(emp => emp !== empleado)
          Swal.fire(
            'Cliente eliminado',
            `Cliente  ${empleado.nombres} eliminado con exito!`,
            'success'
          )
        }
      )
      
    }
  })

 }



}
