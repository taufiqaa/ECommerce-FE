import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopFormValidators {

    //whitespace validation
    static preventWhiteSpace(control : FormControl): ValidationErrors {
        if((control.value != null) &&  (control.value.trim().length === 0)){
            
            //invalid return error object
            return {'preventWhiteSpace' : true};
        }else {
            //valid, return null

            return null!;
        }
    }


}
