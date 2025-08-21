import * as session from "./session";

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
}
