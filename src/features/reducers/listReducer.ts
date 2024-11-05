import { IlistTypes } from "../../types/listTypes";
import * as listActionTypes from "../actionTypes/listActionTypes";

interface IinitialState {
  lists: [];
  list_id: string;
}

const IinitialState: IinitialState = {
  list_id: "",
  lists: [],
};

interface CREATE_LIST {
  type: typeof listActionTypes.LISTS;
  payload: IlistTypes;
}
interface GET_LIST {
  type: typeof listActionTypes.GET_LISTS;
  payload: IlistTypes[];
}
interface DELETE_LIST {
  type: typeof listActionTypes.DELETE_LISTS;
  payload: string;
}
interface PUT_LIST {
  type: typeof listActionTypes.PUT_LISTS;
  payload: IlistTypes;
}
interface GET_ID_ONLY_LISTS {
  type: typeof listActionTypes.GET_ID_ONLY_LISTS;
  payload: string;
}

type ActionType =
  | CREATE_LIST
  | GET_LIST
  | DELETE_LIST
  | PUT_LIST
  | GET_ID_ONLY_LISTS;

export const listReducerc = (state = IinitialState, action: ActionType) => {
  switch (action.type) {
    case listActionTypes.LISTS:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };

    case listActionTypes.GET_LISTS:
      return {
        ...state,
        lists: action.payload.map((item) => {
          return {
            _id: item._id,
            name: item?.name,
            description: item?.description,
            conver_photos: item?.conver_photos,
            price: item?.price,
            benefits: item?.benefits,
            additional_details: item?.additional_details,
            category: item?.category,
          };
        }),
      };

    case listActionTypes.DELETE_LISTS:
      return {
        ...state,
        lists: state.lists.filter((item) => item._id !== action.payload),
      };

    case listActionTypes.PUT_LISTS:
      return {
        ...state,
        lists: state.lists.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        ),
      };

    case listActionTypes.GET_ID_ONLY_LISTS:
      return {
        ...state,
        list_id: action.payload,
      };
    default:
      return state;
  }
};
