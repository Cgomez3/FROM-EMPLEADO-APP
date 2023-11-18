import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Empleado } from '../../empleado';
import { EmpleadoService } from '../../empleado.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent  implements OnInit{
  public empleado: Empleado = new Empleado();
  
  public titulo: string = 'Crear Empleado';
  public errores:string[]= [];

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    
  ) {}
  

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(): void {

    this.activatedRoute.params.subscribe((params) => {
      let nroDoc = params['nro-doc'];
      if (nroDoc) {
        this.empleadoService
          .getEmpleado(nroDoc)
          .subscribe((empleado) => (this.empleado = empleado));
          
      }
    });
  }


  update(): void {
    this.empleadoService.update(this.empleado).subscribe((json) => {
      this.router.navigate(['/crud']);
     Swal.fire({
        title: 'Actualizar Empleado',
        text: `${json.mensaje}: ${json.empleado.nombres}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    },
    err =>{
     this.errores =err.error.errors as string[];
     console.error(err.error.errors)
    });
  }

}
