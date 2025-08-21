export class User {
    id?: string;
    name?: string;

    constructor(params: {
        name?: string;
        id?: string;
    }) {
        this.id = params.id;
        this.name = params.name;
    }
}
