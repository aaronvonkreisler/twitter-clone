import { Link } from 'react-router-dom';

export const linkifyOptions = {
   tagName: {
      mention: () => Link,
      hashtag: () => Link,
   },
   className: 'styled-link',
   attributes: (href, type) => {
      if (type === 'hashtag') {
         return {
            to: '/expore/hashtag/' + href.substring(1),
         };
      }
      if (type === 'mention') {
         return {
            to: '/profile/' + href.substring(1),
         };
      }
   },
};
