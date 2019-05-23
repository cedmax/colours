import React, { useReducer, useCallback } from "react";
import originalList from "../colors.json";
import AppUI from "./AppFuncWithHistoryHookAndReducersUI";
import { useQueryString } from "../helpers/hooks.v2";
import reducers from "../helpers/reducers";

const defaultState = {
  allColors: originalList,
  colors: originalList,
  currentFilter: "",
  currentSortBy: "name",
  style: {
    color: "black",
    background: "white",
    opacity: 0.6,
    lightOpacity: 0.5,
  },
};

export default () => {
  const [state, dispatch] = useReducer(reducers, defaultState);

  const emitDispatch = useCallback(
    (type, payload) => dispatch({ type, payload }),
    []
  );
  const sortBy = useCallback(sortBy => emitDispatch("sort", sortBy), [emitDispatch]);
  const filter = useCallback(filter => emitDispatch("filter", filter), [emitDispatch]);
  const onColorChange = useCallback(hex => emitDispatch("change", hex), [emitDispatch]);

  const { currentFilter, currentSortBy } = state;
  useQueryString(
    { currentSortBy, currentFilter },
    { currentSortBy: sortBy, currentFilter: filter },
    defaultState
  );

  return (
    <AppUI
      {...state}
      sortBy={sortBy}
      filter={filter}
      onColorChange={onColorChange}
    />
  );
};
