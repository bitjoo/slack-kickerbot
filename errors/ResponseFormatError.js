function ResponseFormatError(message) {
    Error.captureStackTrace(this);
    this.name = this.constructor.name;
    this.message = message;
}
//inherit prototype using ECMAScript 5 (IE 9+)
ResponseFormatError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: ResponseFormatError,
        writable: true,
        configurable: true
    }
});