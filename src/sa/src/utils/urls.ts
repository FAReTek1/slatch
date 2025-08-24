/**
 * Stores all URLs used by the module. Suggested by Waakul
 * TODO: add modifiable vars to change the root, e.g. api.scratch.mit.edu -> turbowarp trampoline
 * TODO: consider using namespaces instead of identifiers like these
 */

// root
const root = () => `https://scratch.mit.edu`

// root/
const forumTopicXml = (id: number) => `https://scratch.mit.edu/discuss/feeds/topic/${id}`
const forumTopicPage = (id: number) => `https://scratch.mit.edu/discuss/topic/${id}/`
const forumPostEdit = (id: number) => `https://scratch.mit.edu/discuss/post/${id}/edit/`

const projectPage = (id: number) => `https://scratch.mit.edu/projects/${id}`

const sessionPage = () => `https://scratch.mit.edu/session`
const sessionSettings = () => `https://scratch.mit.edu/accounts/settings/`
const sessionEmailChange = () => `https://scratch.mit.edu/accounts/email_change/`
const sessionDelete = () => `https://scratch.mit.edu/accounts/logout/`  // Don't think this works
const sessionMessages = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages`  // bound to session because you cannot do this with an arbitrary user
const sessionAdminMessages = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages/admin`  // bound to session because you cannot do this with an arbitrary user

const statisticsDaily = () => `https://scratch.mit.edu/statistics/data/daily/`
const statisticsMonthlyGa = () => `https://scratch.mit.edu/statistics/data/monthly-ga/`
const statisticsMonthly = () => `https://scratch.mit.edu/statistics/data/monthly/`

const studioPage = (id: number) =>  `https://scratch.mit.edu/studios/${id}`

const userPage = (username: string) => `https://scratch.mit.edu/users/${username}/`;
const userPageFollowers = (username: string) => `https://scratch.mit.edu/users/${username}/followers/`;

// root/site-api
const educatorAlertSAPI = () => `https://scratch.mit.edu/site-api/classrooms/alerts/`;

const studioSAPIFollow = (id: number) => `https://scratch.mit.edu/site-api/users/bookmarkers/${id}/add/`
const studioSAPIUnfollow = (id: number) => `https://scratch.mit.edu/site-api/users/bookmarkers/${id}/remove/`

const userSAPI = (username: string) => `https://scratch.mit.edu/site-api/users/all/${username}/`;

// api.scratch.mit.edu
const newsAPI = () => `https://api.scratch.mit.edu/news`
const featuredAPI = () => `https://api.scratch.mit.edu/proxy/featured`

const projectAPIRemixes = (id: number) => `https://api.scratch.mit.edu/projects/${id}/remixes`

const studioAPI = (id: number) => `https://api.scratch.mit.edu/studios/${id}`
const studioAPIComments = (id: number) => `https://api.scratch.mit.edu/studios/${id}/comments/`
const studioAPICommentReplies = (id: number, commentId: number) => `https://api.scratch.mit.edu/studios/${id}/comments/${commentId}/replies`
const studioAPIComment = (id: number, commentId: number) => `https://api.scratch.mit.edu/studios/${id}/comments/${commentId}`

// https://api.scratch.mit.edu/proxy/comments/studio/${id} ?

const userAPI = (username: string) => `https://api.scratch.mit.edu/users/${username}`;
const userAPIMessageCount = (username: string) => `https://api.scratch.mit.edu/users/${username}/messages/count`;

// cloud
const cloudScratch = () => `wss://clouddata.scratch.mit.edu`

// assets
const assetGet = (md5ext: string) => `https://assets.scratch.mit.edu/internalapi/asset/${md5ext}/get/`

// backpack
const backpackThumbnail = (thumbnail: string) => `https://backpack.scratch.mit.edu/${thumbnail}`
const backpackDownload = (body: string) => `https://backpack.scratch.mit.edu/${body}`
const backpackDelete = (username: string, id: number) => `https://backpack.scratch.mit.edu/${username}/${id}`

// projects
const projectDownload = (id: number) => `"https://projects.scratch.mit.edu/${id}`

// translate
const translateServices = () => `https://translate-service.scratch.mit.edu/supported`

// ocular
const forumTopicOclrReactions = (id: number) => `https://my-ocular.jeffalo.net/api/reactions/${id}`
