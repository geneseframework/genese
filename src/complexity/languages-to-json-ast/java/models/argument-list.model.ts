import { Location } from './location.model';

export class ArgumentList {
    name ?= '';
    children?: any = undefined;
    location?: Location = new Location();
}
