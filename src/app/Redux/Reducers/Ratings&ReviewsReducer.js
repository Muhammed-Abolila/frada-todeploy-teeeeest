import { ADD_REVIEW, DELETE_REVIEW, GET_ALL_REVIEWS } from "../Types";
let initialValue = {
  GetAllReviews:[],
  MakeReview: {},
  DeleteReview:{},
};
export const Ratings_ReviewsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return {
        ...state,
        GetAllReviews: action.payload,
      };
    case ADD_REVIEW:
      return {
        ...state,
        MakeReview: action.payload,
      };
      case DELETE_REVIEW:
      return {
        ...state,
        DeleteReview: action.payload,
      };
    default:
      return state;
  }
};
