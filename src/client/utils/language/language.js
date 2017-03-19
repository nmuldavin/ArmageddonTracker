/**
 * Maps an object to a new object via a function defining an operation on each key / val
 * @param  {Object}   obj Object to map
 * @param  {Function} fn  Mapping function. Recieves keys and value as args, respectively.
 *                        Must return an array with new [key, val]
 * @return {Object}       New object
 */
const mapEntries = (obj, fn) => Object.entries(obj)
  .map(keyVal => fn(...keyVal))
  .reduce((accum, [key, value]) => {
    const newObj = {};
    newObj[key] = value;

    return Object.assign({}, newObj, accum);
  }, {});

/**
 * Maps an object to a new object via a function that operates on each key
 * @param  {Object}   obj Object to map
 * @param  {Function} fn  Mapping function. Recieves key as argument. Should return new key
 * @return {Object}       New object
 */
const mapKeys = (obj, fn) => mapEntries(obj, (key, val) => [fn(key), val]);

/**
 * Maps an object to a new object via a function that operates on each value
 * @param  {Object}   obj Object to map
 * @param  {Function} fn  Mapping function. Recieves alue as argument. Should return new value
 * @return {Object}       New object
 */
const mapValues = (obj, fn) => mapEntries(obj, (key, val) => [key, fn(val)]);

export {
  mapEntries,
  mapKeys,
  mapValues,
};
