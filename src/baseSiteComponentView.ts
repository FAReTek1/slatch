import * as sa from "./sa/src/index";

export function generateBscHTML(bscs: sa.BaseSiteComponent[], attrs: string='') {
    let ret = `<div class="BSCView">`;

    bscs.forEach((bsc) => {
        ret += `
        <img src="${bsc.getThumbnailUrl()}" ${attrs}/>
        `;
    });

    ret += '</div>';
    return ret;
}
