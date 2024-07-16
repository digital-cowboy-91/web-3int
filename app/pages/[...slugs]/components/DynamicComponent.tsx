import React from "react";

import Content from "./Content/Content";

type Props = {
    componentName: string;
    props: any;
}

export default function DynamicComponent({ componentName, props }: Props) {
    switch (componentName) {
        case 'content': {
            return React.createElement(Content, props);
        }
        default: {
            return null;
        }
    }
}