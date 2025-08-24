import * as project from '../site/project';
import * as studio from "../site/studio";
import * as session from "../site/session";
import axios from 'axios';

async function featured_data(): Promise<Record<string, Record<string, string | number>[]>> {
    const resp = await axios.get('https://api.scratch.mit.edu/proxy/featured');
    return resp.data;  // Axios automatically converts to JSON
}

/**
 * Fetch the projects from the scratch/featured projects api.
 * @param session Provide a session to connect each project to the session.
 *  ***If you are doing this, use session.connectFeatured, which uses this under the hood***
 */
export async function getFeatured(session?: session.Session): Promise<Record<
    'community_newest_projects' | 'community_most_remixed_projects' | 'scratch_design_studio' |'curator_top_projects' |
    'community_most_loved_projects' | 'community_featured_projects' | 'community_featured_studios',
    studio.Studio[] | project.Project[]>> {
    const data = await featured_data();
    let ret: Record<string, studio.Studio[] | project.Project[]> = {};

    Object.entries(data).forEach((kv) => {
        const [key, value] = kv;
        ret[key] = value.map((jsonData) => {
            return key == 'community_featured_studios' ?
                studio.Studio.fromJSON(jsonData, session) :
                project.Project.fromJSON(jsonData, session);
        });
    });

    return ret;
}
