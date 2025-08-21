import * as session from "./session";

export class BaseSiteComponent {
    protected session?: session.Session;
    constructor(session?: session.Session) {
        this.session = session;
    }
}
