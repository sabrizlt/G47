const initialState = {
    favourite: {
      content: [],
    },
  };
  
  const mainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_FAV":
        return {
          ...state,
          favourite: {
            content: [...state.favourite.content, action.payload],
          },
        };
  
      case "REMOVE_FROM_FAV":
        return {
          ...state,
          favourite: {
            content: [
              ...state.favourite.content.slice(0, action.payload),
              ...state.favourite.content.slice(action.payload + 1),
            ],
          },
        };
  
      default:
        return state;
    }
  };
  
  export default mainReducer;