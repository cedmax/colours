import React, { useCallback, useState, memo, useEffect } from "react";

import Filters from "./Filters";
import Header from "./Header";
import Bar from "./Bar";
import List from "./List";
import data from "../colors.json";

import worker from "workerize-loader!../sorting-worker.js"; // eslint-disable-line import/no-webpack-loader-syntax
import Loader from "./Loader";
const sorterWorker = worker();

const Body = () => {
  const [selected, setSelected] = useState({ hex: "white" });
  const [sorting, setSorting] = useState("name");
  const [range, setRange] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState(data.colors);

  useEffect(() => {
    setIsLoading(true);

    const sort = (colors, sorter) =>
      new Promise(resolve => {
        sorterWorker.postMessage({ colors, sorter });
        sorterWorker.onerror = console.log;
        sorterWorker.onmessage = async e => {
          const { colors } = e.data;
          resolve(colors);
        };
      });

    let filtered;
    if (range) {
      const groups = range === "gray" ? ["white", "gray", "black"] : [range];
      filtered = data.colors.filter(color => groups.includes(color.group));
    } else {
      filtered = data.colors;
    }

    sort(filtered, sorting).then(colors => {
      if (colors) {
        setColors(colors);
      }
      setIsLoading(false);
    });
  }, [sorting, range]);

  const sortBy = useCallback(e => setSorting(e.target.value), []);
  const filterRange = useCallback(range => setRange(range), []);
  const select = useCallback((hex, name) => setSelected({ hex, name }), []);

  return (
    <>
      {isLoading && <Loader />}
      <Bar color={selected.hex} />
      <Header>
        <Filters
          qty={colors.length}
          filterRange={filterRange}
          ranges={data.ranges}
          sortBy={sortBy}
        />
      </Header>
      <List colors={colors} onClick={select} />
    </>
  );
};

export default memo(Body);
