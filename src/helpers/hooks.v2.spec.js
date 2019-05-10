import React from "react";
import { mount } from "enzyme";
import { useQueryString } from "./hooks.v2";
import {
  objectToHistory,
  subscribeToHistory,
  unsubscribeFromHistory,
} from "./utils";

jest.mock("./utils", () => ({
  objectToHistory: jest.fn(),
  subscribeToHistory: jest.fn(() => "listener function"),
  unsubscribeFromHistory: jest.fn(),
}));

describe("useQueryString", () => {
  const stateSetter = jest.fn();
  const Component = ({ value }) => {
    useQueryString(
      { value },
      { value: stateSetter },
      { value: "defaultValue" }
    );
    return null;
  };

  beforeEach(() => {
    subscribeToHistory.mockClear();
    objectToHistory.mockClear();
    unsubscribeFromHistory.mockClear();
  });

  test("the first time should subscribe to history with the right callback", () => {
    mount(<Component value="a" />);
    expect(subscribeToHistory).toBeCalledTimes(1);

    const callback = subscribeToHistory.mock.calls[0][0];
    callback({ value: "b" });
    expect(stateSetter).toBeCalledWith("b");

    callback({ value: "" });
    expect(stateSetter).toBeCalledWith("defaultValue");
  });

  const wrapper = mount(<Component value="a" />);

  test("further executions should invoke objectToHistory", () => {
    wrapper.setProps({ value: "b" });
    expect(subscribeToHistory).toBeCalledTimes(0);
    expect(objectToHistory).toBeCalledTimes(1);
  });

  test("further executions with the same props should do nothing", () => {
    wrapper.setProps({ value: "b" });
    expect(subscribeToHistory).toBeCalledTimes(0);
    expect(objectToHistory).toBeCalledTimes(0);
  });

  test("unmounting should invoke unsubscribeFromHistory with the listener ", () => {
    wrapper.unmount();

    expect(unsubscribeFromHistory).toBeCalledTimes(1);
    expect(unsubscribeFromHistory).toBeCalledWith("listener function");
  });
});
