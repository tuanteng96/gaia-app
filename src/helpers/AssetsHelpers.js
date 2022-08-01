import APPS from "../js/settings";

export const toAbsoluteUrl = pathname => APPS.DOMAIN_URL + "/upload/image/" + pathname;
export const toContentDomain = (content) => {
    if (!content) return "";
    return content.replace(/src=\"\//g, 'src="' + APPS.DOMAIN_URL + "/");
}