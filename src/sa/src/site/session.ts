import * as commons from '../utils/commons'
import * as base from './base'

import * as zlib from 'zlib';
import * as https from 'https';



/**
 * Represents a Scratch log in / session. Stores authentication data (session id and xtoken).
 */
export class Session extends base.BaseSiteComponent{
    id: string = '';

    username: string;
    password: string;
    xtoken?: string;

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

        super()

        this.id = params.id;

        this.username = params.username;
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

        this.process_session_id();
    }

    private process_session_id() {
        console.log("Process session ID");

        let data = decode_session_id(this.id);
        console.log(data);
    }

    toString() {
        return '<' + `Login for ${this.username}>`;
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
export function decode_session_id(session_id: string) {
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

    let session_string: string | undefined = undefined;
    if (password !== undefined) {
        // session_data = dict(id=session_id, username=username, password=password)
        // session_string = base64.b64encode(json.dumps(session_data).encode()).decode()
    }

    const _session = new Session({
        id: session_id,
        username: username,
        password: password,
    });
    if (xtoken !== undefined) {
        commons.assert_eq(xtoken, _session.xtoken);
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
 * @param timeout Timeout for the request to Scratch's login API (in seconds). Defaults to 10.
 * @return An object that represents the created login / session
 */
export function login(username: string, password: string, timeout=10): Session {
    // issue_login_warning()
    const body = JSON.stringify({
        username: username, password:password
    });
    const _headers: Record<string, string | number> = {...commons.headers,
        Cookie: 'scratchcsrftoken=a;scratchlanguage=en;',
        'Content-Length': Buffer.byteLength(body)
    };

    console.log(_headers);

    const options: https.RequestOptions = {
        port: 443,
        method: 'POST',
        headers: _headers,
        timeout: timeout,
    };

    const req = https
        .request(
            'https://scratch.mit.edu/login/', options, function (resp) {
                console.log('Resp received');
                console.log(resp.statusCode);
            }
        );
    req.write(body);

    req.end();

    while (true) {

    }
}