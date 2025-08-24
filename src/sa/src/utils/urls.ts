/**
 * Stores all URLs used by the module. Suggested by Waakul
 */

export let root = `https://scratch.mit.edu`
export let apiUrl = `https://api.scratch.mit.edu`

export const setRoot = (newRoot: string)=> {root = newRoot}
export const setapiUrl = (newApiUrl: string)=> {apiUrl = newApiUrl}

export namespace asset {
    export const get = (md5ext: string) => `https://assets.scratch.mit.edu/internalapi/asset/${md5ext}/get/`
}

export namespace backpack {
    export const thumbnail = (thumbnail: string) => `https://backpack.scratch.mit.edu/${thumbnail}`
    export const download = (body: string) => `https://backpack.scratch.mit.edu/${body}`
    export const remove = (username: string, id: number) => `https://backpack.scratch.mit.edu/${username}/${id}`
}

export namespace classroom {
    export const alerts = () => `${root}/site-api/classrooms/alerts/`;
}

export namespace cloud {
    export const scratch = () => `wss://clouddata.scratch.mit.edu`
}

export namespace forumTopic {
    export const xml = (id: number) => `${root}/discuss/feeds/topic/${id}`
    export const page = (id: number) => `${root}/discuss/topic/${id}/`
    export const ocularReactions = (id: number) => `https://my-ocular.jeffalo.net/api/reactions/${id}`
}

export namespace forumPost {
    export const edit = (id: number) => `${root}/discuss/post/${id}/edit/`
}

export namespace project {
    export const page = (id: number) => `${root}/projects/${id}`
    export const remixes = (id: number) => `${apiUrl}/projects/${id}/remixes`
    export const download = (id: number) => `"https://projects.scratch.mit.edu/${id}`
    export const getImage = (id: number, dims: string) => `https://uploads.scratch.mit.edu/get_image/project/${id}_${dims}.png`
    export const getThumbnail = (id: number) => `https://uploads.scratch.mit.edu/projects/thumbnails/${id}.png`
}

export namespace session {
    export const page = () => `${root}/session`
    export const login = () => `${root}/login/`
    export const settings = () => `${root}/accounts/settings/`
    export const changeEmail = () => `${root}/accounts/email_change/`
    export const logout = () => `${root}/accounts/logout/`  // Don't think this works
    export const messages = (username: string) => `${apiUrl}/users/${username}/messages`  // bound to session because you cannot do this with an arbitrary user
    export const adminMessages = (username: string) => `${apiUrl}/users/${username}/messages/admin`  // bound to session because you cannot do this with an arbitrary user
}

export namespace stats {
    export const daily = () => `${root}/statistics/data/daily/`
    export const monthlyGa = () => `${root}/statistics/data/monthly-ga/`
    export const monthly = () => `${root}/statistics/data/monthly/`
}

export namespace studio {
    export const page = (id: number) => `${root}/studios/${id}`
    export const follow = (id: number) => `${root}/site-api/users/bookmarkers/${id}/add/`
    export const unfollow = (id: number) => `${root}/site-api/users/bookmarkers/${id}/remove/`
    export const api = (id: number) => `${apiUrl}/studios/${id}`
    export const comments = (id: number) => `${apiUrl}/studios/${id}/comments/`
    export const commentReplies = (id: number, commentId: number) => `${apiUrl}/studios/${id}/comments/${commentId}/replies`
    export const comment = (id: number, commentId: number) => `${apiUrl}/studios/${id}/comments/${commentId}`
    export const thumbnail = (id: number) => `https://uploads.scratch.mit.edu/galleries/thumbnails/${id}.png`;
    export const getImage = (id: number, dims: string) => `https://uploads.scratch.mit.edu/get_image/gallery/${id}_${dims}.png`;
    // ${apiUrl}/proxy/comments/studio/${id} ??
}

export namespace translate {
    export const services = () => `https://translate-service.scratch.mit.edu/supported`
}

export namespace user {
    export const page = (username: string) => `${root}/users/${username}/`;
    export const followers = (username: string) => `${root}/users/${username}/followers/`;
    export const sapi = (username: string) => `${root}/site-api/users/all/${username}/`;
    export const api = (username: string) => `${apiUrl}/users/${username}`;
    export const messageCount = (username: string) => `${apiUrl}/users/${username}/messages/count`;
    export const getImage = (id: number, dims: string) => `https://uploads.scratch.mit.edu/get_image/user/${id}_${dims}.png`
}

export namespace other {
    export const news = () => `${apiUrl}/news`
    export const featured = () => `${apiUrl}/proxy/featured`
}

export namespace images {
    export const privateCat = () => `https://cdn.scratch.mit.edu/scratchr2/static/__3e14301069f00819d1c44531f23cc811__//treejs/img/private_cat.png`
}
