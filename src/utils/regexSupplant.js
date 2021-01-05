// The code for this function comes from Twitters "twitter-text" library.
// https://github.com/twitter/twitter-text/blob/33169dfd33d61debdbf58dc940f5a200c06def10/js/pkg/twitter-text-3.1.0.js#L2394

export function regexSupplant(regex, map, flags) {
   flags = flags || '';

   if (typeof regex !== 'string') {
      if (regex.global && flags.indexOf('g') < 0) {
         flags += 'g';
      }

      if (regex.ignoreCase && flags.indexOf('i') < 0) {
         flags += 'i';
      }

      if (regex.multiline && flags.indexOf('m') < 0) {
         flags += 'm';
      }

      regex = regex.source;
   }

   return new RegExp(
      regex.replace(/#\{(\w+)\}/g, function (match, name) {
         var newRegex = map[name] || '';

         if (typeof newRegex !== 'string') {
            newRegex = newRegex.source;
         }

         return newRegex;
      }),
      flags
   );
}
