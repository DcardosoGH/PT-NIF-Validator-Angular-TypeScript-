# Angular (TypeScript) PT NIF Validator

This is a custom reactive form validator built for Angular to check if a Portuguese Fiscal Number (NIF) is correct.

##### Features: 
  - Easy to use on any Angular project with Reactive Forms;
  - Built and tested with Angular 5.2;

## Installation

Simply place the file ```nif.validator.ts ``` inside of your project folder.

#### Usage with Reactive Forms

- Import the file to the component that you want to use it in.
- When referencing Form Validators, simply add the exported function (nifValidator).

## Example  
Below is a basic example on how to use the NIF Validator on the TypeScript File and on the HTML template.
#### Component ``app.component.ts``

```sh  
import { nifValidator } from './validators/nif.validator';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

constructor(private fb: FormBuilder){
    this.createForm();
}
createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      nif: ['', [Validators.required,Validators.minLength(9), Validators.maxLength(9), nifValidator]],
    });
  }
}
```

### Template ``app.component.html``
``` sh
<div class="form-group">
        <label for="nif">Qual o seu número de contribuinte (NIF)?</label>
        <input 
            type="text" 
            class="form-control" 
            name="nif" 
            id="nif" 
            formControlName="nif"
        >
        <div 
            *ngIf="!userForm.controls['nif'].valid &&
             userForm.controls['nif'].touched &&
             userForm.controls['nif'].errors.invalidNif"
        >
         Invalid NIF
        <div *ngIf="userForm.controls['nif'].errors.required">
            Required.
        </div>
    </div>
</div>
```