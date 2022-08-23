---
uid: style-guides-javascript
title: JavaScript
---

# JavaScript

## Filenames

Filenames must be camel case and may not include underscores (`_`) or dashes (`-`). The filename's extensions must be `.js`.

## File Structure

All files must abide by the following general structure, with JSDoc comments being optional but preferred.

```javascript
/**
 * This module documents the structure used by Javascript code in Jellyfin.
 *
 * @module path/to/this/module
 */

import module from 'dependency';
import { myFunction, myClass } from 'dependency/submodule';
import 'otherDependency';

/**
 * Defines a non-exported function, accessible only from this module.
 *
 * @param {Object} argument - The argument to pass to the function.
 * @returns {Int|null} The resulting object from the function.
 */
function privateFunction (argument) {
    // Code ommitted
}

export publicFunction (argument) {
    // Code ommitted
}

export default { publicFunction }
```

## Miscellaneous

### File Encoding

All files must be encoded in UTF-8 and use LF line endings when committed.

### Non-ASCII Characters

For printable characters, use the actual Unicode character directly in your code.

For non-printable characters, use the hexadecimal or Unicode escape.
