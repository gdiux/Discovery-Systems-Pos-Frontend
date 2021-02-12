import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// MODELS
import { Product } from '../../../models/product.model';
import { Client } from '../../../models/client.model';
import { Invoice } from '../../../models/invoice.model';

// SERVICES
import { ProductService } from '../../../services/product.service';
import { ClientService } from '../../../services/client.service';
import { SearchService } from '../../../services/search.service';
import { InvoiceService } from '../../../services/invoice.service';

// INTERFACES
import { Carrito, _payments } from '../../../interfaces/carrito.interface';
import { LoadInvoice } from '../../../interfaces/invoice.interface';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: [
  ]
})
export class TicketComponent implements OnInit {

  public carrito: Carrito[] = [];

  constructor( private productService: ProductService,
                private clientService: ClientService,
                private searchService: SearchService,
                private fb: FormBuilder,
                private invoiceService: InvoiceService ) { }

  ngOnInit(): void {

    // CLIENTES
    this.cargarCLientes();
        
  }

  /** ================================================================
   *  BUSCAR CODIGO
  ==================================================================== */
  @ViewChild('searchCode') searchCode: ElementRef;
  buscarCodigo(code: string){

    this.productService.cargarProductoCodigo(code)
    .subscribe( (product) => {
                  
            if (product === null || product.status === false) {
              Swal.fire('Error', 'No existe el producto, verifica el codigo de barras o si el producto a sido desactivado!', 'error');
              this.searchCode.nativeElement.value = '';
              this.searchCode.nativeElement.onFocus = true;
              return;              
            }            
            
            // PEDIMOS LA CANTIDAD
            if (product.type === 'Granel') {

              Swal.fire({
                title: 'Cantidad',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                showLoaderOnConfirm: true,
                preConfirm: (resp) => {
                  
                  return resp;
                }
              }).then((result) => {

                if (result.value > 0) {
                  
                  const qty:number = result.value;
  
                  // GUARDAR AL CARRITO
                  this.carritoTemp(product, qty, product.price);
                  // GUARDAR AL CARRITO
  
                  return;
                }else{
                  return;
                }                
                
              });
              
            }else{

              const qty:number = 1;

              // GUARDAR AL CARRITO
              this.carritoTemp(product, qty, product.price);
              // GUARDAR AL CARRITO

            }            
            
            // LIMPIAR INPUT
            this.searchCode.nativeElement.value = '';
            this.searchCode.nativeElement.onFocus = true;
            
          }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });
  }

  /** ================================================================
   *  ALMACENAR PRODUCTO TEMPORAL EN EL CARRITO
  ==================================================================== */
  public total: number = 0;
  carritoTemp( product: Product, qty: number, precio: number ){ 

    const pid:any = product.pid;
    
    // VALIDAR EL SI EXISTE EL PRODUCTO EN EL CARRITO
    const validarItem = this.carrito.findIndex( (resp) =>{      
      if (resp.product === pid ) {
        return true;
      }else {
        return false;
      }
    });

    // GUARDAR ITEM EN EL CARRITO
    if (validarItem === -1) {
      
      this.carrito.push({
        producto: product,
        product: product.pid,
        qty,
        price: precio
      });

    } else {
      
      let qtyTemp = this.carrito[validarItem].qty;
      qtyTemp += qty;

      this.carrito[validarItem].qty = qtyTemp;
    }
    
    // SUMAR TOTALES
    this.sumarTotales();

  }

  /** ================================================================
   *  ELIMINAR PRODUCTO DEL CARRITO CARRITO
  ==================================================================== */
  eliminarProductoCarrito( i: number ){

    Swal.fire({
      title: 'Estas Seguro?',
      text: "De eliminar este producto del carrito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.carrito.splice(i, 1);
        this.sumarTotales();

        Swal.fire('Eliminado!', 'El producto se a eliminado con exito.', 'success');
      }
    })   

  }

  /** ================================================================
   *  SUMAR TOTALES
  ==================================================================== */
  sumarTotales(){
    
    this.total = 0;
    if (this.carrito.length > 0) {
      
      for (let i = 0; i < this.carrito.length; i++) {
        
        this.total += (this.carrito[i].price * this.carrito[i].qty);        
      }

    }

  }

  /** ============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * CLIENTES - CLIENTES - CLIENTES - CLIENTES  
  ==================================================================== */
  public listaClientes: Client[] = [];
  public listaClientesTemp: Client[] = [];
  public totalClientes: number = 0;
  public clienteTemp: Client = {
    name : '',
    cedula: '',
    phone: '',
    email: '',
    address: '',
    city: ''
  };

  cargarCLientes(){
    
    this.clientService.cargarClientes(0)
          .subscribe(({total, clients}) => {

            // COMPROBAR SI EXISTEN RESULTADOS
            if (clients.length === 0) {
              this.listaClientes = [];
              this.totalClientes = 0;
              return;                
            }
            // COMPROBAR SI EXISTEN RESULTADOS
            
            this.listaClientes = clients;
            this.listaClientesTemp = clients;
            this.totalClientes = total;

          }, (err) => { Swal.fire('Error', err.error.msg, 'error'); });

  }

  /** ================================================================
   *  BUSCAR CLIENTE
  ==================================================================== */
  buscarCliente(termino: string){

    if (termino.length === 0) {
      this.listaClientes = this.listaClientesTemp;
      return;
    }else{
    
      this.searchService.search('clients', termino)
          .subscribe(({total, resultados}) => {          
          
          // COMPROBAR SI EXISTEN RESULTADOS
          if (resultados.length === 0) {
            this.listaClientes = [];
            this.totalClientes = 0;
            return;                
          }
          // COMPROBAR SI EXISTEN RESULTADOS
          
          this.listaClientes = resultados;
          this.totalClientes = total;

        });
    }

  }

  /** ================================================================
   *  SELECCIONAR CLIENTE
  ==================================================================== */
  seleccionarCliente(cliente: Client){
    
    this.clienteTemp = cliente;
    
  }

  /** ================================================================
   *  CREAR CLIENTE
  ==================================================================== */
  public newClientForm = this.fb.group({
    name: ['' , [Validators.required, Validators.minLength(3)]],
    cedula: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.email, Validators.minLength(7)]],
    phone: ['', [Validators.minLength(3)]]
  });
  public formSubmitted: boolean = false;

  crearCliente(){

    this.formSubmitted = true;

    if (this.newClientForm.invalid) {
      return;
    }

    this.clientService.createClient(this.newClientForm.value)
        .subscribe((resp: any) => {

          Swal.fire('Estupendo', 'Se ha creado el cliente exitosamente!', 'success');
          this.cargarCLientes();

          this.formSubmitted = false;
          this.newClientForm.reset();          
          
        }, (err) =>{
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** ================================================================
   *  CAMPO VALIDO
  ==================================================================== */
  campoValido(campo: string): boolean{

    if ( this.newClientForm.get(campo).invalid &&  this.formSubmitted) {      
      return true;      
    } else{
            
      return false;
    }
  
  }

  /** ============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   *  PRODUCTOS - PRODUCTOS - PRODUCTOS - PRODUCTOS
  ==================================================================== */
  @ViewChild('searchProduct') searchProduct: ElementRef;
  public listaProductos: Product[] = [];
  public listaProductosTemp: Product[] = [];
  public totalProductos: number = 0;

  buscarProducto( termino: string ){
    
    if (termino.length === 0) {
      this.listaProductos = this.listaProductosTemp;
      return;
    }else{
      
      this.searchService.search('products', termino)
          .subscribe(({total, resultados}) => {
              
            // COMPROBAR SI EXISTEN RESULTADOS
            if (resultados.length === 0) {
              this.listaProductos = [];
              this.totalProductos = 0;
              return;                
            }
            // COMPROBAR SI EXISTEN RESULTADOS

            this.listaProductos = resultados;
            this.totalProductos = total;
  
          });

    }

  }

  /** ================================================================
   *  SELECCIONAR PRODUCTO
  ==================================================================== */
  public productTemp: Product = {
    code: '',
    name: '',
    type: '',
    cost: 0,
    gain: 0,
    price: 0,
    wholesale: 0,
    getImage: ''
  };

  seleccionarProducto( producto: Product ){

    this.searchProduct.nativeElement.value = '';

    this.listaProductos = [];
    this.totalProductos = 0;

    this.productTemp = producto;

  }

  /** ================================================================
   *  ENVIAR PRODUCTO AL CARRITO TEMPORAL POR EL BUSCADOR
  ==================================================================== */
  evniarAlCarrito( qty:number, mayoreo: boolean, code: string ){

    if (code === '' || this.productTemp.price === 0) {
      Swal.fire('Atención', 'No has seleccionado ningun producto', 'info');
      return;
    }

    if (Number(qty) === 0 || qty < 0) {
      Swal.fire('Atención', 'No has seleccionado una cantidad validad', 'info');
      return;
    }

    let precio: number;

    if (!mayoreo) {
      precio = this.productTemp.price;
    }else{
      precio = this.productTemp.wholesale;
    }
    
    // GUARDAR AL CARRITO
    this.carritoTemp(this.productTemp, qty, precio);
    // GUARDAR AL CARRITO

    this.productTemp = {
      code: '',
      name: '',
      type: '',
      cost: 0,
      gain: 0,
      price: 0,
      wholesale: 0,
      getImage: ''
    };

    this.searchProduct.nativeElement.onFocus = true;

  }

  /** ============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * =============================================================================================
   * INVOICE - INVOICE - INVOICE - INVOICE  
  ==================================================================== */
  public payments: _payments[] = [];

  public invoiceForm = this.fb.group({
    amount: ['', [Validators.required, Validators.min(this.total)]],
    client: ['', [Validators.required]],
    type: ['efectivo', [Validators.required]],
    payments: [''], 
    products: ['']
  })

  /** ================================================================
   *  AGREGAR METODO DE PAGO
  ==================================================================== */
  @ViewChild('descripcionAdd') descripcionAdd: ElementRef;
  @ViewChild('montoAdd') montoAdd: ElementRef;

  agregarPagos(type: string, amount:number, description:string = ''){

    if (amount === 0 || amount < 1) {
      Swal.fire('Atención', 'No has agregado un monto', 'info');
      return;      
    }

    if (type === 'credito') {
      Swal.fire('Atención', 'Aun no se ha configurado la facturacion por credito', 'info');
      return;        
    }

    this.payments.push({
      type,
      amount,
      description
    });

    this.descripcionAdd.nativeElement.value = '';
    this.montoAdd.nativeElement.value = '';

    this.sumarPagos();
  }
  /** ================================================================
   *   ELIMINAR METODO DE PAGO
  ==================================================================== */
  eliminarPagos( item: any ){
    
    const i = this.payments.indexOf(item);

    if ( i !== -1 ) { this.payments.splice(i, 1); }

    this.sumarPagos();

  }
  /** ================================================================
   *   LIMPIAR METODO DE PAGO
  ==================================================================== */
  limpiarPagos(){
    this.payments = [];
  }

  /** ================================================================
   *   SUMAR METODO DE PAGO
  ==================================================================== */
  public totalPagos:number = 0;
  sumarPagos(){
    
    this.totalPagos = 0;
    if (this.payments.length > 0) {
      
      for (let i = 0; i < this.payments.length; i++) {
        
        this.totalPagos += Number( this.payments[i].amount );        
      }

    }

  }
  
  /** ================================================================
   *   CREAR FACTURA
  ==================================================================== */
  crearFactura(){

    if (this.totalPagos !== this.total) {
      Swal.fire('Importante', 'El monto del pago es diferente al del total, porfavor verificar', 'warning');
      return;      
    }

    try {

      this.invoiceForm.setValue({
        amount: this.totalPagos,
        client: this.clienteTemp.cid,
        type: this.invoiceForm.value.type,
        payments: this.payments, 
        products: this.carrito
      });

      this.invoiceService.createInvoice(this.invoiceForm.value)

          .subscribe( (resp:{ok: boolean, invoice: Invoice } ) => {
            

            this.invoiceForm.reset({
              type: 'efectivo'
            });

            this.total = 0;
            this.totalPagos = 0;
            this.carrito = [];
            this.payments = [];
            this.clienteTemp = {
              name : '',
              cedula: '',
              phone: '',
              email: '',
              address: '',
              city: '',
              cid: ''
            };

            Swal.fire('Success', `Se ha creado la factura <strong> #${ resp.invoice.invoice }</strong>, exitosamente`, 'success');
            
          }, (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          });
      
    } catch (error) {   

      Swal.fire('Error', 'Aun faltan campos importantes, porfavor verificar', 'error');
      
    }    

  }




  // FIN DE LA CLASE 
}
