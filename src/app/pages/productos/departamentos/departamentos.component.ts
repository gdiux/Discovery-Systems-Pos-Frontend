import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// MODELS
import { Department } from '../../../models/department.model';

// SERVICES
import { DepartmentService } from '../../../services/department.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: [
  ]
})
export class DepartamentosComponent implements OnInit {
  
  public departmentos: Department[] = [];
  public departmentosTemp: Department[] = [];
  public totalDepartamentos: number = 0;
  
  public resultado: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;
  public sinResultados: boolean = true;

  constructor(  private departmentService: DepartmentService,
                private searchService: SearchService,
                private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.cargarDepartamentos();

  }

  /** ================================================================
   *   CARGAR DEPARTAMENTOS
  ==================================================================== */
  cargarDepartamentos(){
    this.cargando = true;
    this.sinResultados = true;

    this.departmentService.loadDepartment()
        .subscribe(({ total, departments }) =>{   

          this.totalDepartamentos = total;
          this.departmentos = departments;
          this.departmentosTemp = departments;
          this.resultado = 0;
          this.cargando = false;

        }, (err) => { Swal.fire('Error', err.error.msg, 'error'); }
        )
  }

  /** ================================================================
   *   BUSCAR DEPARTAMENTOS
  ==================================================================== */
  buscar(termino:string){
    
    this.sinResultados = true;
    if (termino.length === 0) {
      this.departmentos = this.departmentosTemp;
      this.resultado = 0;
      return;
    }else{
      
      this.sinResultados = true;
      
      this.searchService.search('departments', termino)
          .subscribe(({total, resultados}) => {
            
            // COMPROBAR SI EXISTEN RESULTADOS
            if (resultados.length === 0) {
              this.sinResultados = false;
              this.departmentos = [];
              this.resultado = 0;
              return;                
            }
            // COMPROBAR SI EXISTEN RESULTADOS
            
            this.totalDepartamentos = total;
            this.departmentos = resultados; 
            this.resultado = resultados.length;  

          }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });

    }

  }

  /** ================================================================
   *   CREAR DEPARTAMENTO
  ==================================================================== */
  public newDepartmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });
  public formSubmitted = false;

  crearDepartamento(){
    
    this.formSubmitted = true;

    if (this.newDepartmentForm.invalid) {
      return;
    }
   
    this.departmentService.createDepartment(this.newDepartmentForm.value)
        .subscribe( resp => {

          this.cargarDepartamentos();          
          Swal.fire('Estupendo', `Se ha creado el Departamento ${this.newDepartmentForm.value.name}, exitosamente!`, 'success')
          this.newDepartmentForm.reset();
          this.formSubmitted = false;
        
        }, (err) => { Swal.fire('Error', err.error.msgm, 'error'); })    


  }

  /** ================================================================
   *  VALIDAR CAMPOS
  ==================================================================== */
  campoValido(campo: string): boolean{

    if ( this.newDepartmentForm.get(campo).invalid &&  this.formSubmitted) {  
      return true;      
    } else{            
      return false;
    }
  
  }

  /** ================================================================
   *  OBTENER INFORMACIÓN DEL DEPARTAMENTO PARA ACTUALIZAR
  ==================================================================== */
  public upDepartmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    id: ['', [Validators.required, Validators.minLength(3)]]
  })  

  informacionDepartamento(departamento: Department){

    this.upDepartmentForm.setValue({
      name: departamento.name,
      id: departamento.did
    });

  }


  /** ================================================================
   *  ACTUALIZAR DEPARTAMENTO
  ==================================================================== */
  public formSubmittedUp = false;
  actualizarDepartamento(){

    this.formSubmittedUp = true;
    
    if (this.upDepartmentForm.invalid) {
      return;
    }
    
    this.departmentService.updateDepartment(this.upDepartmentForm.value, this.upDepartmentForm.value.id)
        .subscribe( resp => {
          
          this.cargarDepartamentos();
          Swal.fire('Estupendo', `El departamento ${this.upDepartmentForm.value.name}, ha sido actualizado`, 'success');
          this.upDepartmentForm.reset();
          this.formSubmittedUp = false;

        }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });

  }

  /** ================================================================
   *  VALIDAR CAMPOS
  ==================================================================== */
  campoValidoUpdate(campo: string): boolean{
    
    if ( this.upDepartmentForm.get(campo).invalid &&  this.formSubmittedUp) {      
      return true;      
    } else{
      
      return false;
    }
  
  }
    
  /** ================================================================
   *  ACTUALIZAR STATUS DEL DEPARTAMENTO
  ==================================================================== */
  statusUpdate(id:string){
    
    this.departmentService.statusUpdateDepartment(id)
        .subscribe( (department) => {

          let information: string;
          if (department.status) {
            information = 'Activado';            
          }else{
            information = 'Desactivado';
          }
          
          
          this.cargarDepartamentos();
          Swal.fire('Estupendo', `El departamento ${department.name}, ha sido ${information}`, 'success');

        }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });

  }


  // FIN DE LA CLASE
}
