export const event = (state = null, action) => {
    switch (action.type) {
      case 'CATEGORY_ACTION':
        return {
          ...state,
          event: action.payload
        }
      default:
        return state
    }
  }
  