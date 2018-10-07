import { Address } from './address';
import { Education } from './education';
import { Skill } from './skill';

export class Person {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
    education: Education[];
    skills: Skill[];
}
