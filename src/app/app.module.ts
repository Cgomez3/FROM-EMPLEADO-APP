import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadoService } from './empleado/empleado.service';
import { registerLocaleData} from '@angular/common';
import localeES from "@angular/common/locales/es"
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './empleado/form/form.component';
import { FormsModule } from '@angular/forms';
import { EditarComponent } from './empleado/form/editar/editar.component'
registerLocaleData(localeES,'es');

const routes:Routes=[
  {path:'',redirectTo: '/crud' , pathMatch: 'full' },
  {path:'crud', component: EmpleadoComponent },
  {path:'empleados/form', component: FormComponent },
  {path:'empleados/form/:nro-doc', component: EditarComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmpleadoComponent,
    FormComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EmpleadoService,{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
