import * as sa from "./sa/src/index";

export function generateBscHTML(bscs: sa.BaseSiteComponent[], width: string="120", attrs: string='') {
    let ret = `<div class="BSCView" style="
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            ">`;

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
