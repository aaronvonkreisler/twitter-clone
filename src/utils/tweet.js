import { regexSupplant } from './regexSupplant';

export function extractMentions(text) {
   const atSigns = /[@＠]/;
   const validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|RT:?)/;
   const validMentionOrList = regexSupplant(
      '(#{validMentionPrecedingChars})' + // $1: Preceding character
         '(#{atSigns})' + // $2: At mark
         '([a-zA-Z0-9_.]{1,20})' + // $3: Screen name
         '(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?', // $4: List (optional)
      {
         validMentionPrecedingChars: validMentionPrecedingChars,
         atSigns: atSigns,
      },
      'g'
   );

   if (!text || !text.match(atSigns)) {
      return [];
   }

   const mentions = text.match(validMentionOrList);

   const extractedMentions = mentions.map((mention) => mention.slice(2));

   return extractedMentions;
}

export function extractHashtags(text) {
   const hashSigns = /[#＃]/;
   //    const hashtagMatch = new RegExp(/(?:\s|^)#[A-Za-z0-9\-\_]+(?:\s|$)/g)
   const validHashtagPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|RT:?)/;
   const validHashtag = regexSupplant(
      '(#{validHashtagPrecedingChars})' + // $1: Preceding character
         '(#{hashSigns})' + // $2: At mark
         '([a-zA-Z0-9_.]{1,20})' + // $3: Hashtag
         '(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?', // $4: List (optional)
      {
         validHashtagPrecedingChars: validHashtagPrecedingChars,
         hashSigns: hashSigns,
      },
      'g'
   );

   if (!text || !text.match(validHashtag)) {
      return [];
   }

   const hashtags = text.match(validHashtag);

   const extractedhashtag = hashtags.map((hashtag) => hashtag.slice(2));

   return extractedhashtag;
}
