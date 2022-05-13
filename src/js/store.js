import { createStore } from 'framework7/lite';
import { authStore } from '../features/Auth/_redux/AuthStore';
import { postsStore } from '../features/Posts/_redux/PostsStore';

// Get Store
// const name = useStore("name"); name => function name getters
// Dispath Store store.dispatch(name, obj); name => function name actions, obj params actions

const store = createStore({
    state: {
        ...authStore.state,
        ...postsStore.state
    },
    getters: {
        ...authStore.getters,
        ...postsStore.getters
    },
    actions: {
        ...authStore.actions,
        ...postsStore.actions
    },
})
export default store;