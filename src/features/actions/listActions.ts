import { IlistTypes } from "../../types/listTypes";
import * as listActionTypes from "../actionTypes/listActionTypes";

export const createLists = (params: IlistTypes) => ({
  type: listActionTypes.LISTS,
  payload: params,
});
export const getLists = (params: IlistTypes) => ({
  type: listActionTypes.GET_LISTS,
  payload: params,
});
export const putLists = (params: IlistTypes) => ({
  type: listActionTypes.PUT_LISTS,
  payload: params,
});
export const deleteLists = (params: string) => ({
  type: listActionTypes.DELETE_LISTS,
  payload: params,
});
export const getByIdLists = (params: IlistTypes) => ({
  type: listActionTypes.GET_BY_ID_LISTS,
  payload: params,
});
export const getIdOnlyLists = (params: string) => ({
  type: listActionTypes.GET_ID_ONLY_LISTS,
  payload: params,
});
