/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Player schema
 */

var PlayerSchema = new Schema({
  name: { type: String, default: '', required: true },
  playerId: {type: String, required: true, unique: true}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PlayerSchema.method({

});

/**
 * Statics
 */

PlayerSchema.static({

});

/**
 * Register
 */

mongoose.model('Player', PlayerSchema);
