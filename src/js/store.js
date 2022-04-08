import { createStore } from 'framework7/lite';
import { authStore } from '../features/Auth/_redux/AuthStore';

// Get Store
// const name = useStore("name"); name => function name getters
// Dispath Store store.dispatch(name, obj); name => function name actions, obj params actions

const store = createStore({
    state: {
        ...authStore.state
    },
    getters: {
        ...authStore.getters
    },
    actions: {
        ...authStore.actions
    },
})
export default store;