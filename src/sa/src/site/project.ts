import * as base from './base';
import * as session from './session';
import * as user from './user';
import * as urls from '../utils/urls';

/**
 * Represents an unshared Scratch project that can't be accessed.
 */
export class PartialProject extends base.BaseSiteComponent {
    id: number;
    title?: string;
    author?: user.User;
    private _loveCount?: number;

    constructor(params: {
        session?: session.Session,
        id?: number,
        title?: string
        author?: user.User,
        loveCount?: number
    }) {
        if (params.id === undefined) {
            params.id = 0;
        }

        super({session: params.session});

        this.id = params.id;
        this.title = params.title;
        this.author = params.author;
        this._loveCount = params.loveCount;
    }

    toString() {
        return `Unshared project with id ${this.id}`;
    }

    get url() {
        return urls.project.page(this.id);
    }

    override getImageUrl(dims: string='144x108'): string {
        return urls.project.getImage(this.id, dims);
    }
}

/**
 * Represents a Scratch project.
 */
export class Project extends PartialProject {
    static fromJSON(json: Record<string, string | number>, _session?: session.Session): Project {
        if (typeof json.id != 'number') {throw new Error(`Bad json ${json}`)}
        if (typeof json.title != 'string') {throw new Error(`Bad json ${json}`)}
        if (typeof json.creator != 'string') {throw new Error(`Bad json ${json}`)}
        if (typeof json.love_count != 'number') {throw new Error(`Bad json ${json}`)}

        return new Project ({
            id: json.id,
            title: json.title,
            author: new user.User({
                name: json.creator,
            }),
            loveCount: json.love_count,
            session: _session
        })
    }

}

