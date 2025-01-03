import { Fragment } from "react";
import Action from "../components/Actions/Action";

const asOptions = ["a", "button"];
const activeOptions = ["button", "icon"];
const colorOptions = ["primary", "secondary", "black"];
const variantOptions = ["filled", "outlined", "underscored"];
const contentOptions = ["icon + label", "icon", "label"];

const svg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke="currentColor"
  >
    <path d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301C4.378 9 6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154c.901 1.153.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z" />
    <path d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4" />
    <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
    <path d="M4.5 18L12 9m7.5 9l-7-8.5m-8 .5L12 21l7.5-11" />
  </svg>
);

export default function Page() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center my-32">
      <div className="grid grid-cols-2 gap-4">
        {asOptions.map((as, indexAs) => (
          <div key={indexAs} className="flex flex-col gap-4">
            <h1>Element: {as}</h1>
            <div className="grid grid-cols-2 gap-4">
              {activeOptions.map((active, indexActive) => (
                <div key={indexActive}>
                  {colorOptions.map((color, indexColor) =>
                    variantOptions.map((variant, indexVariant) =>
                      contentOptions.map((content, indexContent) => (
                        <Fragment
                          key={
                            indexColor + "" + indexVariant + "" + indexContent
                          }
                        >
                          <div className="grid grid-cols-2">
                            <span>active:</span>
                            <span>{active}</span>
                            <span>color:</span>
                            <span>{color}</span>
                            <span>variant:</span>
                            <span>{variant}</span>
                            <span>content:</span>
                            <span>{content}</span>
                          </div>
                          {active === "icon" && content === "label" ? (
                            "---"
                          ) : (
                            <Action
                              // @ts-ignore
                              as={as}
                              href="#"
                              // @ts-ignore
                              active={active}
                              // @ts-ignore
                              color={color}
                              icon={
                                ["icon", "icon + label"].includes(content)
                                  ? svg
                                  : undefined
                              }
                              label={
                                ["label", "icon + label"].includes(content)
                                  ? "Label"
                                  : undefined
                              }
                              // @ts-ignore
                              variant={variant}
                            />
                          )}
                          <hr className="my-4" />
                        </Fragment>
                      ))
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
