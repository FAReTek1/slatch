import * as fs from 'fs';
import * as assert from 'assert';

import * as sa from "./sa/src/index";

import jsdom from 'jsdom';

export function getFileName(name: string = "") {
    return `${__dirname}/../site/${name}`;
}

export function getFile(name: string) {
    return fs.readFileSync(getFileName(name), 'utf-8');
}

export function getDom(name: string): [string, jsdom.JSDOM] {
    const content = getFile(name);
    const dom = preprocess(content);

    return [content, dom];
}
/**
 * Preprocess dom with class=preprocess-includes
 * @param dom 
 */
function preprocess(content: string) {
    console.log(content);

    const dom = new jsdom.JSDOM(content);

    let preprocesses = 0;

    dom.window.document.querySelectorAll('.preprocess').forEach((elem) => {
        if (elem.textContent === ''){
            preprocesses++;

            const src = elem.getAttribute('src');
            switch (elem.className) {
                case 'preprocess include':
                    elem.textContent = getFile(src!);
                    break;

                case 'preprocess replace':
                    elem.replaceWith(getFile(src!));
                    break;

                default:
                    console.warn(elem.className);
            }
        }
    });

    if (preprocesses > 0) {
        return preprocess(dom.serialize());
    }

    return dom;
}

export function generateBscHTML(bscs: sa.BaseSiteComponent[], width: string = "120", attrs: string = '') {
    let ret = `<div class="bsc-view">`;

    bscs.forEach((bsc) => {
        if (bsc instanceof sa.Project) {
            ret += `
            <a href=${bsc.url} style="
                display: flex;
                flex-direction: column;
                max-width: ${width}px;
            ">
                <img src="${bsc.getImageUrl()}" width="${width}" ${attrs}/>
                ${bsc.title}
            </a>`;
        } else if (bsc instanceof sa.Studio) {
            ret += `
            <a href=${bsc.url} style="
                display: flex;
                flex-direction: column;
                max-width: ${width}px;
            ">
                <img src="${bsc.getImageUrl()}" width="${width}" ${attrs}/>
                ${bsc.title}
            </a>`;
        } else {
            ret += `
            <div><img src="${bsc.getImageUrl()}" width="${width}" ${attrs}/></div>`;
        }

    });

    ret += '</div>';
    return ret;
}
