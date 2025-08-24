import * as fs from 'fs';
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
    const dom = new jsdom.JSDOM(content);

    preprocess(dom);

    return [content, dom];
}
/**
 * Preprocess dom with class=preprocess-includes
 * @param dom 
 */
function preprocess(dom: jsdom.JSDOM) {
    dom.window.document.querySelectorAll('.preprocess-include').forEach((elem) => {
        const src = elem.getAttribute('src');
        if (src) {
            elem.textContent = getFile(src);
        }
    });

    dom.window.document.querySelectorAll('.preprocess-replace').forEach((elem) => {
        const src = elem.getAttribute('src');
        if (src) {
            elem.replaceWith(getFile(src));
        }
    });
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
