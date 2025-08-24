import * as base from './base';
import * as user from './user';

import * as commons from '../utils/commons';
import * as urls from '../utils/urls';
import {getFeatured} from "../other/other_apis";

import * as assert from 'assert';
import * as zlib from 'zlib';
import axios from 'axios';


/**
 * Represents a Scratch log in / session. Stores authentication data (session id and xtoken).
 */
export class Session extends base.BaseSiteComponent{
    id: string = '';

    password: string;
    xtoken?: string;
    login_ip?: string;
    user: user.User;
    login_date: Date;

    _headers: object;
    _cookies: object;

    constructor(params: {
        username?: string;
        password?: string;
        id: string;
        xtoken?: string;
    }) {
        if (params.username === undefined) {
            params.username = '';
        }
        if (params.password === undefined) {
            params.password = '';
        }

        super({});
        this.session = this;

        this.id = params.id;

        this.user = new user.User({
            name: params.username,
            session: this
        });
        this.password = params.password;
        this.xtoken = params.xtoken;

        // Post init
        this._headers = {...commons.headers};
        this._cookies = {
            "scratchsessionsid": this.id,
            "scratchcsrftoken": "a",
            "scratchlanguage": "en",
            "accept": "application/json",
            "Content-Type": "application/json"
        };

        this.login_date = new Date(); // Defined in below func call
        this.process_session_id();
    }

    private process_session_id() {
        let [data, date] = decode_session_id(this.id);

        this.user.name = data.username;
        this.user.id = Number(data._auth_user_id);
        this.xtoken = data.token;
        this.login_ip = data['login-ip'];
        this.login_date = date;
    }

    toString() {
        return `<Login for ${this.username}>`;
    }

    get username() {
        return this.user.name;
    }

    override getImageUrl(_dims?: string): string {
        return this.user.getImageUrl(_dims);
    }

    async connectFeatured() {
        return await getFeatured(this);
    }
}

/**
 * Extract the JSON data from the main part of a session ID string
 * Session id is in the format:
 * `<p1: long base64 string>`:`<p2: short base64 string>`:`<p3: medium base64 string>`
 *
 * p1 contains a base64-zlib compressed JSON string
 * p2 is a base 62 encoded timestamp
 * p3 might be a 'synchronous signature' for the first 2 parts (might be useless for us)
 *
 * The dict has these attributes:
 * - username
 * - _auth_user_id
 * - testcookie
 * - _auth_user_backend
 * - token
 * - login-ip
 * - _language
 * - django_timezone
 * - _auth_user_hash
 * @param session_id
 */
export function decode_session_id(session_id: string): [Record<string, string>, Date] {
    const [p1, p2] = session_id.split(':');

    return [
        JSON.parse(zlib.inflateSync(Buffer.from(p1 + '==', 'base64url')).toString()),
        new Date(commons.b62_decode(p2) * 1000)
    ];
}

/**
 * Creates a session / log in to the Scratch website with the specified session id.
 * @param session_id
 * @param username
 * @param password
 * @param xtoken
 */
export function login_by_id(session_id: string, username?: string, password?: string, xtoken?: string): Session {
    // issue_login_warning()

    // let session_string: string | undefined = undefined;
    // if (password !== undefined) {
    //     // session_data = dict(id=session_id, username=username, password=password)
    //     // session_string = base64.b64encode(json.dumps(session_data).encode()).decode()
    // }

    const _session = new Session({
        id: session_id,
        username: username,
        password: password,
    });
    if (xtoken !== undefined) {
        assert.equal(xtoken, _session.xtoken);
    }

    return _session;
}

/**
 * Creates a session / log in to the Scratch website with the specified username and password.
 * This method ...
 * 1. creates a session id by posting a login request to Scratch's login API. (If this fails, scratchattach.exceptions.LoginFailure is raised)
 * 2. fetches the xtoken and other information by posting a request to scratch.mit.edu/session. (If this fails, a warning is displayed)
 *
 * @param username
 * @param password
 * @param params contains kwargs
 * Timeout for the request to Scratch's login API (in seconds). Defaults to 10.
 * @return An object that represents the created login / session
 */
export async function login(username: string, password: string,
                            params?: {timeout?: number;}) {
    params = params? params : {};

    if (params.timeout === undefined) {
        params.timeout = 10000;
    }

    // issue_login_warning()

    const _headers = {...commons.headers,
        Cookie: 'scratchcsrftoken=a;scratchlanguage=en;',
    };

    const resp = await axios.post(
        urls.session.login(), {
            username: username,
            password: password
        }, {
            headers: _headers,
            timeout: params.timeout,
        });

    const sc = resp.headers['set-cookie'];

    if (sc === undefined) {
        throw new Error('Did not receive set-cookie');
    }

    const sid = new RegExp('"(.*)"').exec(sc.toString());
    if (sid === null) {
        throw new Error('Did not receive SessID. Maybe a wrong username or password? Or possibly too ' +
            'many incorrect login attempts means you need to login manually online?');
    }

    // There is actually no new data to be retrieved from the response JSON here. We only need headers.
    return login_by_id(sid[0], username, password);
}
