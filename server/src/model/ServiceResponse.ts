export class ServiceResponse<T> {
  private _data!: T
  private _message: string = ''
  private _success: boolean = true

  get Data(): T {
    return this._data
  }

  set Data(val: T) {
    this._data = val
  }

  get Message(): string {
    return this._message
  }

  set Message(msg: string) {
    this._message = msg
  }

  get Success(): boolean {
    return this._success
  }

  set Success(val: boolean) {
    this._success = val
  }

  get ResponseObject(): object {
    return {
      Data: this.Data,
      Message: this.Message,
      Success: this.Success
    }
  }
}
