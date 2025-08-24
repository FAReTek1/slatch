import * as base from './base';
import * as session from './session';

import * as urls from '../utils/urls'

export class User extends base.BaseSiteComponent {
    id?: number;
    name?: string;

    constructor(params: {
        name?: string;
        id?: number;
        session?: session.Session
    }) {
        super({session: params.session});

        this.id = params.id;
        this.name = params.name;
    }

    override getImageUrl(dims: string='60x60'): string {
        if (this.id === undefined) {
            throw 'not implemented: user.update()';
        }

        return urls.user.getImage(this.id, dims);
    }
}
