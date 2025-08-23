import * as sa from '../../src';


async function main(){
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

    const sess = sa.login_by_id(sessId);

    console.log(await sess.connectFeatured());
}

main().then()
