/**
 * Stores all URLs used by the module. Suggested by Waakul
 */

export namespace urls {
    let root = `https://scratch.mit.edu`
    let apiUrl = `https://api.scratch.mit.edu`

    namespace asset {
        const get = (md5ext: string) => `https://assets.scratch.mit.edu/internalapi/asset/${md5ext}/get/`
    }

    namespace backpack {
        const thumbnail = (thumbnail: string) => `https://backpack.scratch.mit.edu/${thumbnail}`
        const download = (body: string) => `https://backpack.scratch.mit.edu/${body}`
        const remove = (username: string, id: number) => `https://backpack.scratch.mit.edu/${username}/${id}`
    }

    namespace classroom {
        const alerts = () => `${root}/site-api/classrooms/alerts/`;
    }

    namespace cloud {
        const scratch = () => `wss://clouddata.scratch.mit.edu`
    }

    namespace forumTopic {
        const xml = (id: number) => `${root}/discuss/feeds/topic/${id}`
        const page = (id: number) => `${root}/discuss/topic/${id}/`
        const ocularReactions = (id: number) => `https://my-ocular.jeffalo.net/api/reactions/${id}`
    }

    namespace forumPost {
        const edit = (id: number) => `${root}/discuss/post/${id}/edit/`
    }

    namespace project {
        const page = (id: number) => `${root}/projects/${id}`
        const remixes = (id: number) => `${apiUrl}/projects/${id}/remixes`
        const download = (id: number) => `"https://projects.scratch.mit.edu/${id}`
    }

    namespace session {
        const page = () => `${root}/session`
        const settings = () => `${root}/accounts/settings/`
        const changeEmail = () => `${root}/accounts/email_change/`
        const logout = () => `${root}/accounts/logout/`  // Don't think this works
        const messages = (username: string) => `${apiUrl}/users/${username}/messages`  // bound to session because you cannot do this with an arbitrary user
        const adminMessages = (username: string) => `${apiUrl}/users/${username}/messages/admin`  // bound to session because you cannot do this with an arbitrary user
    }

    namespace stats {
        const daily = () => `${root}/statistics/data/daily/`
        const monthlyGa = () => `${root}/statistics/data/monthly-ga/`
        const monthly = () => `${root}/statistics/data/monthly/`
    }

    namespace studio {
        const page = (id: number) =>  `${root}/studios/${id}`
        const follow = (id: number) => `${root}/site-api/users/bookmarkers/${id}/add/`
        const unfollow = (id: number) => `${root}/site-api/users/bookmarkers/${id}/remove/`
        const api = (id: number) => `${apiUrl}/studios/${id}`
        const comments = (id: number) => `${apiUrl}/studios/${id}/comments/`
        const commentReplies = (id: number, commentId: number) => `${apiUrl}/studios/${id}/comments/${commentId}/replies`
        const comment = (id: number, commentId: number) => `${apiUrl}/studios/${id}/comments/${commentId}`
        // ${apiUrl}/proxy/comments/studio/${id} ??
    }

    namespace translate {
        const services = () => `https://translate-service.scratch.mit.edu/supported`
    }

    namespace user {
        const page = (username: string) => `${root}/users/${username}/`;
        const followers = (username: string) => `${root}/users/${username}/followers/`;
        const sapi = (username: string) => `${root}/site-api/users/all/${username}/`;
        const api = (username: string) => `${apiUrl}/users/${username}`;
        const messageCount = (username: string) => `${apiUrl}/users/${username}/messages/count`;
    }

    namespace other {
        const news = () => `${apiUrl}/news`
        const featured = () => `${apiUrl}/proxy/featured`
    }
}
