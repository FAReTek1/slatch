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

    getImageUrl(_dims: string=''): string {
        return 'https://cdn.scratch.mit.edu/scratchr2/static/__3e14301069f00819d1c44531f23cc811__//treejs/img/private_cat.png';
    }
}
