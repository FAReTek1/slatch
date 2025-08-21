import * as fs from 'fs';
import * as sa from "./sa/src/index";

export function getSiteFileName(name: string="") {
    return `${__dirname}/../site/${name}`;
}

export function getSiteFile(name: string) {
    return fs.readFileSync(getSiteFileName(name), 'utf-8');
}

export function generateBscHTML(bscs: sa.BaseSiteComponent[], width: string="120", attrs: string='') {
    let ret = `<div class="bsc-view">`;

    bscs.forEach((bsc) => {
        if (bsc instanceof sa.Project) {
            ret += `
            <a href=${bsc.url} style="
                display: flex;
                flex-direction: column;
                max-width: ${width}px;
            ">
                <img src="${bsc.getThumbnailUrl()}" width="${width}" ${attrs}/>
                ${bsc.title}
            </a>`;
        } else if (bsc instanceof sa.Studio) {
            ret += `
            <a href=${bsc.url} style="
                display: flex;
                flex-direction: column;
                max-width: ${width}px;
            ">
                <img src="${bsc.getThumbnailUrl()}" width="${width}" ${attrs}/>
                ${bsc.title}
            </a>`;
        } else {
            ret += `
            <div><img src="${bsc.getThumbnailUrl()}" width="${width}" ${attrs}/></div>`;
        }

    });

    ret += '</div>';
    return ret;
}
