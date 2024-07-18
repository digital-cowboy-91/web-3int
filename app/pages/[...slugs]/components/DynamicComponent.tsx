import React from "react";

import Content from "./Content/Content";
import FAQ from "./FAQ/FAQ";
import Header from "./Header/Header";

type Props = {
  componentName: string;
  props: any;
};

export default function DynamicComponent({ componentName, props }: Props) {
  switch (componentName) {
    case "header": {
      return React.createElement(Header, props);
    }
    case "content": {
      return React.createElement(Content, props);
    }
    case "faq": {
      return React.createElement(FAQ, props);
    }
    default: {
      return null;
    }
  }
}
