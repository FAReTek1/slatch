import * as sa from '../../src/index';
import * as https from 'https';

const username = process.env["SA_TEST_USERNAME"];
const password = process.env["SA_TEST_PASSWORD"];
const sessId = process.env["SA_TEST_SESSID"];

if (username === undefined) {
    throw new Error(`username must be set`);
}
if (password === undefined) {
    throw new Error(`password must be set`);
}
if (sessId === undefined) {
    throw new Error(`sessId must be set`);
}
//
// const session = sa.login(username, password);
//
// console.log(session.toString());

let body = '';
const req = https.request(
    'https://scratch.mit.edu', {
        method: 'GET',
    }, resp => {
        resp.on('data', (chunk) => {
            body += chunk.toString();
        });

        resp.on('end', () => {
            console.log(body);
        })
    }
)
req.on('error', e => {
})
req.end()
