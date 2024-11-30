import { getCategories } from "@app/store/actions/general.actions";

export const HOME_URLS = {
    getCategories: 'master/commons/categories',
    getCategoriesByLanguage: 'master/commons/modules?lang=:lang',
    getModules: 'master/commons/modules',
    getModuleInfo: 'master/commons/categories?module=:moduleId',
    getInterviewQuestions: 'master/commons/languages?moduleId=:moduleId',
    getModuleMenu: 'master/commons/modules?lang=:lang',
    getTechnologies: 'master/commons/technologies?lang=:lang&module=:moduleName',
    getReviews: 'master/commons/reviews',
    getTrendingBlogs: 'master/blogs/trending',
    getLanguageBasedBlogs: 'master/blogs?lang=:lang&size=:size',
    getLanguageBasedFaqs: 'master/commons/languages/about?lang=:lang'
};
