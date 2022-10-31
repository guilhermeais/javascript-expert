export class NotImplementedException extends Error {
  constructor(functionName) {
    super(`Function ${functionName} not implemented`);
    this.name = 'NotImplementedException';
  }
}