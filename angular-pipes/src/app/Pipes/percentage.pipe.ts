import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'percentage'
})

export class PercentagePipe implements PipeTransform{

    transform(value: number, total:number, decimal:number = 0) {
        console.log("PERCENTAGE pipe called")
        return ((value/total) * 100).toFixed(decimal) + '%'
    }

}