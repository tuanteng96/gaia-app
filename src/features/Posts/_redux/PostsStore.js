export const postsStore = {
    state: {
        Posts: {
            loading: false,
            listPosts: []
        }
    },
    getters: {
        Posts: ({ state }) => {
            return state.Posts;
        },
    },
    actions: {
        getListPosts({ state }, filters) {
            state.Posts.loading = true;
        },
    }
};