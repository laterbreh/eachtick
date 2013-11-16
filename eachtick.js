/**
 *               .  .---.      .
 *               |    |  o     |
 *   .-. .-.  .-.|--. |  .  .-.|.-.
 *  (.-'(   )(   |  | |  | (   |-.'
 *   `--'`-'`-`-''  `-'-' `-`-''  `-
 *
 *    Non-blocking for loop styled
 *       iteration for Node.js
 *
 *  --------------------------------
 *
 * @param obj
 *   Object to be iterated over
 * @param iterator
 *   Callback for each iteration
 * @param complete
 *   Iteration is complete
 */
function eachtick(obj, iterator, complete){
  var keys = Object.keys(obj);
  (function iterate(keys){
    process.nextTick(function(){
      // Return the key / value pair, wait for next callback
      iterator(keys[0], obj[keys[0]], function next(err, stop){
        // Stop iterating on error or stop instruction
        if (err || stop) return complete ? complete(err, stop) : false;
        // Check if we're done
        if (keys.length === 1) return complete ? complete() : true;
        // Grab a slice to go. Pepperoni please.
        return ((keys = keys.slice(1)).length && iterate(keys));
      });
    });
  })(keys);
};

module.exports = eachtick;
