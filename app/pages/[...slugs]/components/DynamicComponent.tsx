import React from "react";

import PageContent from "./PageContent";

type Props = {
    componentName: string;
    props: any;
}

export default function DynamicComponent({ componentName, props }: Props) {
    switch (componentName) {
        case 'content': {
            return React.createElement(PageContent, props);
        }
        default: {
            return null;
        }
    }
}