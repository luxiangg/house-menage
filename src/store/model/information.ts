export default {
  name: "information",
  namespace: true,
  state: {
    data: JSON.parse(localStorage.getItem("data") as string) || [],
  },
  getters: {},
  mutations: {
    SAVE_DATA: (state: any, { payload }: any): void => {
      state.data = payload
      localStorage.setItem("data", JSON.stringify(state.data))
    },
    SAVE_SET: (state: any, { payload }: any): void => {
      state.data.forEach((value: any, index: number) => {
        if (value.id === payload) {
          value.status == 1 ? (value.status = 0) : (value.status = 1)
        }
      })
      localStorage.setItem("data", JSON.stringify(state.data))
    },
    SAVE_DELE: (state: any, { payload }: any): void => {
      state.data.forEach((value: any, index: number) => {
        if (value.id === payload) {
          state.data.splice(index, 1)
        }
      })
      localStorage.setItem("data", JSON.stringify(state.data))
    },
    SAVE_SEARCH: (state: any, { payload }: any): void => {
      let data = state.data.filter((value: any, index: number) => {
        return value.tit.includes(payload)
      })
      state.data = [...data]
    },
    SAVE_SELECT: (state: any, { payload }: any): void => {
      let data = state.data.filter((value: any, index: number) => {
        return value.status == payload
      })
      state.data = data
    },
    SAVE_DATE: (state: any, { payload }: any): void => {
      let data = state.data
    let index = data.findIndex((value:any, index:number) => {
      return value.id === payload.id
    })
    if(index !== -1){
      data[index] = payload
    }
      state.data = data
      localStorage.setItem("data", JSON.stringify(state.data))
    },
  },
  actions: {
    SAVE_USER_DATA({ commit }: any, { payload }: any) {
      commit("SAVE_DATA", { payload: payload })
    },
    SAVE_SET_DATA({ commit }: any, { payload }: any) {
      commit("SAVE_SET", { payload: payload })
    },
    SAVE_DELETE_DATA({ commit }: any, { payload }: any) {
      commit("SAVE_DELE", { payload: payload })
    },
    SAVE_SEARCH_DATA({ commit }: any, { payload }: any) {
      commit("SAVE_SEARCH", { payload: payload })
    },
    SAVE_SELECT_DATA({ commit }: any, { payload }: any) {
      commit("SAVE_SELECT", { payload: payload })
    },
    SAVE_SET_DATE({ commit }: any, { payload }: any) {
      commit("SAVE_DATE", { payload: payload })
    },
  },
}
