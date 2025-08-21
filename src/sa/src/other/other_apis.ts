import * as https from 'https';
import * as project from '../site/project';
import * as studio from "../site/studio";
import * as session from "../site/session";
import * as commons from '../utils/commons';

function featured_data(callback?: (data: Record<string, Record<string, string | number>[]>) => void) {
    https.request(
        'https://api.scratch.mit.edu/proxy/featured',
        {
            method: 'GET',
        }, (resp) => {
            let body = '';
            resp.on('data', (chunk) => {body += chunk;});
            resp.on('end', () => {
                const data = JSON.parse(body);
                callback && callback(data);
            })
        }
    ).end();

}

export function featured(callback?: (data: Record<
    'community_newest_projects' |
    'community_most_remixed_projects' |
    'scratch_design_studio' |
    'curator_top_projects' |
    'community_most_loved_projects' |
    'community_featured_projects' |
    'community_featured_studios', studio.Studio[] | project.Project[]>) => void, _session?: session.Session) {
    featured_data((data) => {
        let pdata: Record<string, studio.Studio[] | project.Project[]> = {
            community_newest_projects: data.community_newest_projects.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            community_most_remixed_projects: data.community_most_remixed_projects.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            scratch_design_studio: data.scratch_design_studio.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            curator_top_projects: data.curator_top_projects.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            community_most_loved_projects: data.community_most_loved_projects.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            community_featured_projects: data.community_featured_projects.map(pjson => {
                return project.Project.fromJSON(pjson, _session)
            }),
            community_featured_studios: data.community_featured_studios.map(pjson => {
                return studio.Studio.fromJSON(pjson, _session)
            }),
        };

        callback && callback(pdata);
    });
}
