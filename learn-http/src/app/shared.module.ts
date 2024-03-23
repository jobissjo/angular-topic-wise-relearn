import { NgModule } from "@angular/core";
import { LoaderComponent } from "./components/utility/loader/loader.component";
import { FormsModule } from "@angular/forms";
import { SnackbarComponent } from "./components/utility/snackbar/snackbar.component";

@NgModule({
    declarations: [
        LoaderComponent,
        SnackbarComponent
    ],
    exports: [LoaderComponent, FormsModule, SnackbarComponent],
    imports: [FormsModule]
})
export class SharedModule{

}