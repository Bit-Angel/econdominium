import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { Entrada } from 'src/app/models/entrada.interface';
import { Vehiculo } from 'src/app/models/vehiculo.interface';
import { FlaskServiceService } from 'src/app/services/flask-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  vehiculoForm: FormGroup = new FormGroup({
    ctrPlacas: new FormControl('',[Validators.required]),
    ctrTelefono: new FormControl(''),
    ctrGafete: new FormControl(''),
    ctrNombre: new FormControl(''),
    ctrCelular: new FormControl(''),
    ctrDireccion: new FormControl(''),
    ctrColor: new FormControl(''),
    ctrMarca: new FormControl(''),
    ctrDescripcion: new FormControl(''),
    ctrTipo: new FormControl(''),
    ctrImagenFrente: new FormControl(''),
    ctrImagenAtras: new FormControl(''),
  });
  registroForm:FormGroup = new FormGroup({
    ctrFecha: new FormControl(''),
    ctrHora: new FormControl(''),
    ctrTipoIngreso: new FormControl(''),
    ctrNotas: new FormControl(''),
    estado:new FormControl('')
  });
  base64Output:any="";
  imgFrente:string="./assets/img/R.png";
  imgAtras:string="./assets/img/R.png";
  bandera:boolean=false;
  showInput:boolean=true;
  constructor(public servive:FlaskServiceService) { }

  ngOnInit(): void {
  }
  uploadFrontImage(event:any):any{
    console.log(event.target?.files);
    console.log(event.target?.files[0]);
    const file = event.target?.files[0];
    // this.vehiculoForm.value.ctrImagenFrente = event.target?.files[0]
    // console.log(this.vehiculoForm.value.ctrImagenFrente);
    const obserbable = new Observable((suscriber: Subscriber<any>)=>{
      this.readFile(file,suscriber);
    });
    obserbable.subscribe((d)=>{
      this.imgFrente = d;
      this.vehiculoForm.value.ctrImagenFrente = this.imgFrente;
      console.log(this.vehiculoForm.value.ctrImagenFrente);
    });
  }
  uploadBackImage(event:any):any{
    console.log(event.target?.files);
    console.log(event.target?.files[0]);
    const file = event.target?.files[0];
    // this.vehiculoForm.value.ctrImagenFrente = event.target?.files[0]
    // console.log(this.vehiculoForm.value.ctrImagenFrente);
    const obserbable = new Observable((suscriber: Subscriber<any>)=>{
      this.readFile(file,suscriber);
    });
    obserbable.subscribe((d)=>{
      
      this.imgAtras = d;
      this.vehiculoForm.value.ctrImagenAtras = this.imgAtras;
      console.log(this.vehiculoForm.value.ctrImagenAtras);
    });
  }
  readFile(file:File,suscriber:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      suscriber.next(fileReader.result)
      suscriber.complete();
    };
    fileReader.onerror = (error) =>{
      suscriber.error(error);
      suscriber.complete();
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////Funcion GET que busca un vehiculo en la BD//////////////////
  fnSerchVehicle(){
    if(!this.vehiculoForm.valid){
      Swal.fire(
        'Ingresa un numero de placa'
      )
    }else{
      let strId =  this.vehiculoForm.get('ctrPlacas')?.value;
      console.log(strId)
      /////////Si existe rellenamos los campos del formulario//////////////
      this.servive.fnSerchVehicleServer(strId).subscribe((response) => {
        console.log('Respuesta1:', response);
        console.log('Respuesta object:', JSON.stringify(response));
        if(response.length==1){
          console.log(response[0].name)
          this.vehiculoForm.patchValue({
            ctrTelefono:response[0].phone,
            ctrGafete:response[0].gafete,
            ctrNombre:response[0].name,
            ctrCelular:response[0].cellphone,
            ctrDireccion:response[0].addres,
            ctrColor:response[0].color,
            ctrMarca:response[0].brand,
            ctrDescripcion:response[0].description,
            ctrTipo:response[0].type
          })
          this.imgAtras = response[0].backImage;
          this.imgFrente =response[0].frontImage;
          this.bandera=true;
          this.showInput=false;
        }else{
          Swal.fire(
            'OH!',
            'No existe este vehiculo!'
          )
        }
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////Funcion POST que agrega un nuevo vehiculo a la BD//////////////////
  fnSendData(){
    if(!this.vehiculoForm.valid){
      Swal.fire(
        'Ingresa un numero de placa'
      )
    }else{
      const newVehicle:Vehiculo = {
        ctrPlacas:this.vehiculoForm.value.ctrPlacas,
        ctrTelefono: this.vehiculoForm.value.ctrTelefono,
        ctrGafete: this.vehiculoForm.value.ctrGafete,
        ctrNombre: this.vehiculoForm.value.ctrNombre,
        ctrCelular: this.vehiculoForm.value.ctrCelular,
        ctrDireccion: this.vehiculoForm.value.ctrDireccion,
        ctrColor: this.vehiculoForm.value.ctrColor,
        ctrMarca: this.vehiculoForm.value.ctrMarca,
        ctrDescripcion: this.vehiculoForm.value.ctrDescripcion,
        ctrTipo: this.vehiculoForm.value.ctrTipo,
        ctrImagenFrente:this.vehiculoForm.value.ctrImagenFrente,
        ctrImagenAtras: this.vehiculoForm.value.ctrImagenAtras
      };
      console.log(newVehicle);
        //Regresa un true si se agrega, regresa un false si ya existe//
        this.servive.fnSendDataServer(newVehicle).subscribe((response) => {
        console.log('Respuesta1:', response);
        console.log('Respuesta object:', JSON.stringify(response));
        if(response.acknowledged==true){
          console.log('ok');
          Swal.fire(
            'Listo',
            'Vehiculo con placas '+newVehicle.ctrPlacas+' Registrado'
          )
          this.bandera=true;
          
        }else{
          this.sweetAlert();
        }
      });
      
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  /////////////Funcion PUT que actualiza un vehiculo de la BD//////////////////
  fnUpdateData(){
    const newVehicle:Vehiculo = {
      ctrPlacas:this.vehiculoForm.value.ctrPlacas,
      ctrTelefono: this.vehiculoForm.value.ctrTelefono,
      ctrGafete: this.vehiculoForm.value.ctrGafete,
      ctrNombre: this.vehiculoForm.value.ctrNombre,
      ctrCelular: this.vehiculoForm.value.ctrCelular,
      ctrDireccion: this.vehiculoForm.value.ctrDireccion,
      ctrColor: this.vehiculoForm.value.ctrColor,
      ctrMarca: this.vehiculoForm.value.ctrMarca,
      ctrDescripcion: this.vehiculoForm.value.ctrDescripcion,
      ctrTipo: this.vehiculoForm.value.ctrTipo,
      ctrImagenFrente:this.imgFrente,
      ctrImagenAtras: this.imgAtras
    };
    console.log(newVehicle);
      //Regresa un true si se actualiza, regresa un false si no//
      this.servive.fnUpdateDataServer(newVehicle).subscribe((response) => {
      console.log('Respuesta1:', response);
      console.log('Respuesta object:', JSON.stringify(response));
      if(response.acknowledged==true){
        console.log('ok');
        Swal.fire(
          'Listo',
          'Vehiculo con placas '+newVehicle.ctrPlacas+' Actualizado'
        )   
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////////
  /////////////Funcion POST que agrega una nueva entrada de un vehiculo (Aceptada/Rechazada)//////////////////
  fnSendDataEntry(estado:string){
    if(!this.vehiculoForm.valid){
      Swal.fire(
        'Ingresa un numero de placa'
      )    }else{
      console.log(this.registroForm.value);
      let strId =  this.vehiculoForm.get('ctrPlacas')?.value; 
      const newEntry:Entrada = {
        ctrFecha: this.registroForm.value.ctrFecha,
        ctrHora: this.registroForm.value.ctrHora,
        ctrTipoIngreso: this.registroForm.value.ctrTipoIngreso,
        ctrNotas: this.registroForm.value.ctrNotas,
        estado:estado
      }
      console.log(newEntry);
      //Regresa un true si se agrega, regresa un false si ya existe//
      this.servive.fnSendEntryServer(newEntry,strId).subscribe((response) => {
        console.log('Respuesta1:', response);
        console.log('Respuesta object:', JSON.stringify(response));
        if(response.acknowledged==true){
          console.log('ok');
          Swal.fire(
            'Listo',
            'Entrada Registrada con placas '+strId
          )          
        }else{
          Swal.fire(
            'Oh!',
            'Entrada NO Registrada'
          ) 
        }
      });
    }
  }
  sweetAlert() {
    Swal.fire({
      title: 'Este vehiculo ya existe',
      text: '¿Desea reescribirlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((response: any) => {
      if (response.value) {
        this.fnUpdateData();
      } else if (response.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Vehiculo no actualizado'
        )
      }
    })
  }
}
