import { Location } from './location.model';
import { ClassMemberDeclarationChildren } from './class-member-declaration-children';

export class ClassMemberDeclaration {
    classMemberDeclaration?: ClassMemberDeclaration[] = [new ClassMemberDeclaration()];
    name ?= '';
    children?: ClassMemberDeclarationChildren = new ClassMemberDeclarationChildren();
    location?: Location = new Location(); 
}
