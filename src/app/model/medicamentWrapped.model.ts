import { medicament} from './medicament.model';
export class InstitutWrapper{
_embedded!: { medicaments : medicament[]};
}
