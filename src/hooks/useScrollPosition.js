import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

/**
 * Gets the current scroll position
 * @function getCurrentScrollPosition
 * @param {HTMLElement} element - The ele
 */
const getCurrentScrollPosition = (element) => {
   const { scrollTop } = element;
   return scrollTop;
};

const useScrollPosition = (callback, element, deps = []) => {
   const currentElement = element ? element : document.documentElement;
   const scrollPosition = useRef(getCurrentScrollPosition(currentElement));

   useEffect(() => {
      const handleScroll = () => {
         scrollPosition.current = getCurrentScrollPosition(currentElement);

         callback({
            currentScrollPosition: scrollPosition.current,
            atBottom:
               currentElement.scrollHeight -
                  currentElement.scrollTop -
                  currentElement.clientHeight <
               1000,
         });
      };

      const handleScrollThrottle = throttle(handleScroll, 200);
      element
         ? element.addEventListener('scroll', handleScrollThrottle)
         : window.addEventListener('scroll', handleScrollThrottle);

      return () => {
         element
            ? element.removeEventListener('scroll', handleScrollThrottle)
            : window.removeEventListener('scroll', handleScrollThrottle);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [...deps, element, currentElement, callback]);
};

export default useScrollPosition;
