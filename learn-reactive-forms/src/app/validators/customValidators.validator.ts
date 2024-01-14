import { AbstractControl, FormControl } from "@angular/forms";


export class CustomValidators {

    static noSpaceAllowed(control: FormControl) {
        if (control.value != null && control.value.indexOf(' ') !== -1) {
            return { noSpaceAllowed: true }
        }
        return null;
    }

    static usernameCheck(control: AbstractControl): Promise<Object| null>{
        return usernameAllowed(control.value)
    }
}

function usernameAllowed(username:string) {
    const takenUsernames = ['jobi', 'johnsmith', 'eren'];

    return new Promise((resolve, reject)=>{
        setTimeout(()=> {
            if (takenUsernames.includes(username)){
                resolve({checkUsername:true});
            }else{
                resolve(null)
            }
        },5000)
    })
}