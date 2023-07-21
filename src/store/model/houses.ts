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
    shan(state: any, payload: any) {
      console.log(state.hosing, "state.hosing.")

      state.hosing.forEach((item: any, index: any) => {
        if (item.id === payload.id) {
          state.hosing.splice(index, 1)
        }
      })
    },
  },
  actions: {},
}
