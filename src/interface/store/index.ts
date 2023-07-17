export interface CommitInterface<T> {
  commit: (type: string, value: any) => void
  state: T
}
export interface IPayload {
  type: string
  payload?: any
}
