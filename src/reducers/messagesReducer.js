const initialState = {
   inbox: [],
   chatRoom: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      default:
         return state;
   }
}
