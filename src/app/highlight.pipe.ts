import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: string, args: string): any { //Search globally for the keyword and add html mark tag
        if (!args) {
            return value;
        }
        return value.replace(new RegExp(args, 'gi'), '<mark>' + args + '</mark>');
    }

}
