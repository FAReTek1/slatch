import * as session from "./session";
import * as urls from '../utils/urls'

export class BaseSiteComponent {
    protected session?: session.Session;
    constructor(params: session.Session | undefined | {
        session?: session.Session
    }) {
        if (params instanceof session.Session || params === undefined) {
            this.session = params;
        } else {
            this.session = params.session;
        }
    }

    getImageUrl(_dims: string=''): string {
        return urls.images.privateCat();
    }
}
