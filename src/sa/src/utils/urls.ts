/**
 * Stores all URLs used by the module. Suggested by Waakul
 * TODO: add modifiable vars to change the root, e.g. api.scratch.mit.edu -> turbowarp trampoline
 */

export namespace urls {
    const root = () => `https://scratch.mit.edu`

    namespace asset {
        const get = (md5ext: string) => `https://assets.scratch.mit.edu/internalapi/asset/${md5ext}/get/`
    }

    namespace backpack {
        const thumbnail = (thumbnail: string) => `https://backpack.scratch.mit.edu/${thumbnail}`
        const download = (body: string) => `https://backpack.scratch.mit.edu/${body}`
        const remove = (username: string, id: number) => `https://backpack.scratch.mit.edu/${username}/${id}`
    }

    namespace classroom {
        const alerts = () => `https://scratch.mit.edu/site-api/classrooms/alerts/`;
    }

    namespace cloud {
        const scratch = () => `wss://clouddata.scratch.mit.edu`
    }

    namespace forumTopic {
        const xml = (id: number) => `https://scratch.mit.edu/discuss/feeds/topic/${id}`
        const page = (id: number) => `https://scratch.mit.edu/discuss/topic/${id}/`
        const ocularReactions = (id: number) => `https://my-ocular.jeffalo.net/api/reactions/${id}`
    }

    namespace forumPost {
        const edit = (id: number) => `https://scratch.mit.edu/discuss/post/${id}/edit/`
    }

    namespace project {
        const page = (id: number) => `https://scratch.mit.edu/projects/${id}`
        const remixes = (id: number) => `https://api.scratch.mit.edu/projects/${id}/remixes`
        const download = (id: number) => `"https://projects.scratch.mit.edu/${id}`
    }

    namespace session {
        const page = () => `https://scratch.mit.edu/session`
        const settings = () => `https://scratch.mit.edu/accounts/settings/`
        const changeEmail = () => `https://scratch.mit.edu/accounts/email_change/`
        const logout = () => `https://scratch.mit.edu/accounts/logout/`  // Don't think this works
        const messages = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages`  // bound to session because you cannot do this with an arbitrary user
        const adminMessages = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages/admin`  // bound to session because you cannot do this with an arbitrary user
    }

    namespace stats {
        const daily = () => `https://scratch.mit.edu/statistics/data/daily/`
        const monthlyGa = () => `https://scratch.mit.edu/statistics/data/monthly-ga/`
        const monthly = () => `https://scratch.mit.edu/statistics/data/monthly/`
    }

    namespace studio {
        const page = (id: number) =>  `https://scratch.mit.edu/studios/${id}`
        const follow = (id: number) => `https://scratch.mit.edu/site-api/users/bookmarkers/${id}/add/`
        const unfollow = (id: number) => `https://scratch.mit.edu/site-api/users/bookmarkers/${id}/remove/`
        const api = (id: number) => `https://api.scratch.mit.edu/studios/${id}`
        const comments = (id: number) => `https://api.scratch.mit.edu/studios/${id}/comments/`
        const commentReplies = (id: number, commentId: number) => `https://api.scratch.mit.edu/studios/${id}/comments/${commentId}/replies`
        const comment = (id: number, commentId: number) => `https://api.scratch.mit.edu/studios/${id}/comments/${commentId}`
        // https://api.scratch.mit.edu/proxy/comments/studio/${id} ??
    }

    namespace translate {
        const services = () => `https://translate-service.scratch.mit.edu/supported`
    }

    namespace user {
        const page = (username: string) => `https://scratch.mit.edu/users/${username}/`;
        const followers = (username: string) => `https://scratch.mit.edu/users/${username}/followers/`;
        const sapi = (username: string) => `https://scratch.mit.edu/site-api/users/all/${username}/`;
        const api = (username: string) => `https://api.scratch.mit.edu/users/${username}`;
        const messageCount = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages/count`;
    }

    namespace other {
        const news = () => `https://api.scratch.mit.edu/news`
        const featured = () => `https://api.scratch.mit.edu/proxy/featured`
    }
}
