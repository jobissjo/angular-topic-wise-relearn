import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appContainer]'
})

export class ViewContainer{
    viewContainer :ViewContainerRef;
    constructor(viewContainer:ViewContainerRef){
        this.viewContainer = viewContainer;
    }
}