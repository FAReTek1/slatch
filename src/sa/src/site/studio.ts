import * as base from './base';
import * as session from './session';
import * as urls from '../utils/urls';

export class Studio extends base.BaseSiteComponent {
    id: number;
    title?: string;

    constructor(params: {
        id: number;
        title?: string;
        session?: session.Session;
    }) {
        super(params.session);
        this.id = params.id;
        this.title = params.title;
    }

    static fromJSON(json: Record<string, string | number>, _session?: session.Session): Studio {
        if (typeof json.id !== 'number') {throw new Error(`Bad json ${json.id}`)}
        if (typeof json.title !== 'string') {throw new Error(`Bad json ${json.title}`)}

        return new Studio({
            id: json.id,
            title: json.title,
            session: _session
        });
    }

    override getImageUrl(dims: string='170x100'): string {
        return urls.studio.getImage(this.id, dims);
    }

    get url() {
        return urls.studio.page(this.id);
    }
}