export default {
  name: "houses",
  namespace: true,
  state: {
    hosing: [],
  },
  getters: {},
  mutations: {
    add(state: any, payload: any) {
      state.hosing = payload.data
    },
  },
  actions: {},
}
