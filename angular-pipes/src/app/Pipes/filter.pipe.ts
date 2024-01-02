import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../Modals/student";

@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{
    transform(list: Student[], filterBy:string) {
        console.log("Filter pipe called")
        if(filterBy.toLowerCase() === 'all' || filterBy === '' || list.length === 0)
            return list;
        else{
            return list.filter((val)=> {
                return val.gender.toLowerCase() === filterBy.toLowerCase();
            })
        }
    }
}