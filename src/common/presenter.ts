export interface IPresenter<Input, Output> {
  format(input: Input): Output;
}
