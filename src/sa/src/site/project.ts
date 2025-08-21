import * as base from './base';
import * as session from './session';

/**
 * Represents an unshared Scratch project that can't be accessed.
 */
export class PartialProject extends base.BaseSiteComponent {
    id?: number;

    constructor(params: {
        session?: session.Session,
        id?: number,
    }) {
        if (params.id === undefined) {
            params.id = 0;
        }

        super({session: params.session});

        this.id = params.id;
    }

    toString() {
        return `Unshared project with id ${this.id}`;
    }

    get url() {
        return `https://scratch.mit.edu/projects/${this.id}/`;
    }
}

/**
 * Represents a Scratch project.
 */
export class Project extends PartialProject {

}
