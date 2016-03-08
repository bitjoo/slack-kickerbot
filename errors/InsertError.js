function InsertError(message) {
    Error.captureStackTrace(this);
    this.name = this.constructor.name;
    this.message = message;
}
//inherit prototype using ECMAScript 5 (IE 9+)
InsertError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: InsertError,
        writable: true,
        configurable: true
    }
});