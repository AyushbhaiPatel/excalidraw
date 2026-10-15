import React from "react";

import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { render } from "../tests/test-utils";

import { actionSelectAll } from "./actionSelectAll";

const { h } = window;

describe("actionSelectAll", () => {
  beforeEach(async () => {
    await render(<Excalidraw />);
  });

  it("gives a lone selectable line or arrow its line editor", () => {
    const deleted = API.createElement({ type: "rectangle", isDeleted: true });
    const arrow = API.createElement({ type: "arrow" });
    API.setElements([deleted, arrow]);

    API.executeAction(actionSelectAll);

    expect(API.getSelectedElements().map((el) => el.id)).toEqual([arrow.id]);
    expect(h.state.selectedLinearElement?.elementId).toBe(arrow.id);
  });

  it("doesn't give a line editor to an unselected line or arrow", () => {
    const lockedArrow = API.createElement({ type: "arrow", locked: true });
    const rectangle = API.createElement({ type: "rectangle" });
    API.setElements([lockedArrow, rectangle]);

    API.executeAction(actionSelectAll);

    expect(API.getSelectedElements().map((el) => el.id)).toEqual([
      rectangle.id,
    ]);
    expect(h.state.selectedLinearElement).toBeNull();
  });
});
