import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  
  @ViewChild("formName")
  formName!: ElementRef;

  @ViewChild("formEmail")
  formEmail!: ElementRef;

  @ViewChild("formMensaje")
  formMensaje!: ElementRef;

  @ViewChild("formRespuesta")
  formRespuesta!: ElementRef;


  @ViewChild("nameErr")
  nameErr!: ElementRef;

  @ViewChild("mailErr")
  mailErr!: ElementRef;

  @ViewChild("msgErr")
  msgErr!: ElementRef;

  @ViewChild("spamErr")
  spamErr!: ElementRef;

  emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  @Output() onGuardar: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() {
  }
 
  ngOnInit() {
  }

  clickGuardar = (): void => {
    let formData: string[] = [];
    console.log(this.formName.nativeElement.value);
    formData.push(this.formName.nativeElement.value);
    formData.push(this.formEmail.nativeElement.value);
    formData.push(this.formMensaje.nativeElement.value);
    formData.push(this.formRespuesta.nativeElement.value);

    let valid: boolean = true;
    for (let i = 0; i < formData.length; i++) {
      if(formData[i].trim() == ""){
        valid = false;
      }
    }

    console.log(formData);
    if (valid && this.formRespuesta.nativeElement.value == "5") {
      this.onGuardar.emit(formData);
      this.shorErr();
    } else {
      this.shorErr();
    }
  }

  shorErr = (): void => {
    console.log(this.formEmail.nativeElement.hidden)
    if (this.formName.nativeElement.value.trim() == "") {
      this.nameErr.nativeElement.removeAttribute("hidden");
    } else {
      this.nameErr.nativeElement.hidden = true;
    }
    
    if (this.formEmail.nativeElement.value.trim() == "" || !this.emailRegex.test(this.formEmail.nativeElement.value.trim())) {
      this.mailErr.nativeElement.removeAttribute("hidden");
    } else {
      this.mailErr.nativeElement.hidden = true;
    }
    
    if (this.formMensaje.nativeElement.value.trim() == "") {
      this.msgErr.nativeElement.removeAttribute("hidden");
    } else {
      this.msgErr.nativeElement.hidden = true;
    }
    
    if (this.formRespuesta.nativeElement.value.trim() == "" || this.formRespuesta.nativeElement.value.trim() != "5") {
      this.spamErr.nativeElement.removeAttribute("hidden");
    } else {
      this.spamErr.nativeElement.hidden = true;
    }
  }
}
