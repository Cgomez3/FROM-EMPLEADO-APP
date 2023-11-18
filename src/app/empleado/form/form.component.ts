import { Component , OnInit} from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit{
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

  create(): void {
   this.empleadoService.create(this.empleado).subscribe((empleado) => {
      this.router.navigate(['/crud']);
      Swal.fire({
        title: 'Nuevo Empleado',
        text: `El Empleado: ${empleado.nombres} ha sido creado con Exito`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    },
     err =>{
      console.error(err);
      this.errores =err.error.errors as string[];
      
     }
    );
  }

}
