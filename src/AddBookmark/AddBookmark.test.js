import React from "react";
import ReactDOM from "react-dom";
import AddBookmark from "./AddBookmark";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    }
  };
  ReactDOM.render(<AddBookmark {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
