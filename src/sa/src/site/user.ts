import * as base from './base';
import * as session from './session';

export class User extends base.BaseSiteComponent {
    id?: string;
    name?: string;

    constructor(params: {
        name?: string;
        id?: string;
        session?: session.Session
    }) {
        super({session: params.session});

        this.id = params.id;
        this.name = params.name;
    }
}
