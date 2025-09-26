/**
 * Secure Random Number Generator Utility
 * Replaces Math.random() with cryptographically secure alternatives
 */

class SecureRandom {
  /**
   * Generate a cryptographically secure random number between 0 and 1
   * @returns {number} Random number between 0 and 1
   */
  static random() {
    if (window.crypto && window.crypto.getRandomValues) {
      // Use crypto.getRandomValues for secure random numbers
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] / (0xffffffff + 1);
    } else {
      // Fallback to Math.random() with warning
      console.warn('SecureRandom: crypto.getRandomValues not available, using Math.random()');
      return Math.random();
    }
  }

  /**
   * Generate a secure random integer between min and max (inclusive)
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random integer between min and max
   */
  static randomInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a secure random float between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random float between min and max
   */
  static randomFloat(min, max) {
    return this.random() * (max - min) + min;
  }

  /**
   * Generate a secure random boolean
   * @returns {boolean} Random boolean value
   */
  static randomBoolean() {
    return this.random() < 0.5;
  }

  /**
   * Generate a secure random element from an array
   * @param {Array} array - Array to choose from
   * @returns {*} Random element from array
   */
  static randomChoice(array) {
    if (!array || array.length === 0) return null;
    return array[this.randomInt(0, array.length - 1)];
  }

  /**
   * Shuffle an array securely
   * @param {Array} array - Array to shuffle
   * @returns {Array} New shuffled array
   */
  static shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate a secure random string of specified length
   * @param {number} length - Length of string to generate
   * @param {string} charset - Character set to use (default: alphanumeric)
   * @returns {string} Random string
   */
  static randomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[this.randomInt(0, charset.length - 1)];
    }
    return result;
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecureRandom;
}

// Make available globally
window.SecureRandom = SecureRandom;
