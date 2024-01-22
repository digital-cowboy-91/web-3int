import { Fragment } from "react";
import { FINDALL } from "../prisma/modelHomePage";
import dynamicComponent from "./dynamicComponent";

export default async function Home() {
  const res = await FINDALL();

  if (!res.success) return <div>error</div>;

  return (
    <>
      {res.data.map(({ component, props }) => (
        <Fragment key={props?.slug}>
          {dynamicComponent(component, props)}
        </Fragment>
      ))}
    </>
  );
}
