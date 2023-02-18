import sorterMethods from "./helpers/sorter";

onmessage = e => {
  const { sorter, colors } = e.data;

  postMessage({
    colors: sorterMethods[sorter]({ colors }),
  });
};
