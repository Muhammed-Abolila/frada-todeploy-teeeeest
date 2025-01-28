import { GET_ALL_COLLECTIONS, GET_SINGLE_COLLECTION,ADD_COLLECTION_TO_CART } from "./../Types";
const InitialValue = {
  AllCollections: [],
  singleColletion: {},
  AddCollectionToCart:{}
};
export const CollectionReducer = (state = InitialValue, action) => {
  switch (action.type) {
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        AllCollections: action.payload,
      };
    case GET_SINGLE_COLLECTION:
      return {
        ...state,
        singleColletion: action.payload,
      };
      case ADD_COLLECTION_TO_CART:
      return {
        ...state,
        AddCollectionToCart: action.payload,
      };
    default:
      return state;
  }
};
