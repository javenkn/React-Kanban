String.prototype.properName = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = String;