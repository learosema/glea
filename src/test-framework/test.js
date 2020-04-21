/**
 * Minimal testing framework
 */

let indent = 0;

function indentation() {
  return Array(indent + 1).join('  ');
}

/**
 * Describe function
 * 
 * @param {string} description 
 * @param {function} testBody 
 */
export function describe(description, testBody) {
  const underline = Array(description.length + 1).join('-');
  console.log();
  console.log(indentation(), description);
  console.log(indentation(), underline);
  if (typeof testBody === "function") {
    indent++;
    testBody();
    indent--;
  }
}

/**
 * Test function.
 * 
 * @param {string} description Description of the test 
 * @param {Function} testBody test body function
 */
export function test(description, testBody) {
  const assert = (condition, ...args) => {
    if (! condition) {
      throw new Error();
    }
  };
  console.log(indentation(), '[ TEST ]', description);
  try {
    testBody(assert);
  } catch (ex) {
    // when the test fails somewhere,
    // run the test again with the native console.assert.
    // This way, line numbers are shown on assertion errors.
    const nativeAssert = console.assert.bind();
    testBody(nativeAssert);
    if (typeof process !== 'undefined') {
      // In node.js, exit with code -1
      process.exit(-1);
    }
  }
}

export function shouldThrow(assert, message, testBody) {
  try {
    testBody();
    assert(false, message);
  } catch (ex) {
    assert(true, message);
  }
}