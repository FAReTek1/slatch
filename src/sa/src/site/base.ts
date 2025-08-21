import * as session from "./session";

export class BaseSiteComponent {
    protected session?: session.Session;
    constructor(params: {
        session?: session.Session
    }) {
        this.session = params.session;
    }
}
