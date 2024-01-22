import { FINDALL } from "../../prisma/modelPriceTier";
import PriceTierFeature from "./PriceTierFeature";

const CSSDl = "text-dark flex flex-col gap-2";
const CSSDt =
  "border-b-2 border-gray my-4 text-end text-gray font-semibold uppercase";

const PriceTiers = async () => {
  const res = await FINDALL();

  if (!res.success) return <div>Something went wrong</div>;

  return (
    <div className="p-8 pt-0 flex flex-row justify-center">
      <div className="flex gap-8 justify-center flex-wrap">
        {res.data.map(
          ({ id, title, price, description, includes, optional }) => (
            <div
              key={id}
              className="bg-white p-5 z-10 rounded-[1rem] flex-1 min-w-[250px] w-[300px]"
            >
              <div className="flex flex-row justify-between items-center font-semibold uppercase mb-5">
                <span className="text-primary text-2xl">{title}</span>
                <span className="text-dark">{price}</span>
              </div>
              <div className="text-dark">{description}</div>
              <dl className={CSSDl}>
                <dt className={CSSDt}>Includes</dt>
                {includes.map(({ feature, description }, index) => (
                  <dd key={id + "_inc_" + index}>
                    <PriceTierFeature
                      feature={feature}
                      description={description}
                    />
                  </dd>
                ))}
                {Boolean(optional.length) && (
                  <>
                    <dt className={CSSDt}>Optional</dt>
                    {optional.map(({ feature, description }, index) => (
                      <dd key={id + "_exc_" + index}>
                        <PriceTierFeature
                          feature={feature}
                          description={description}
                        />
                      </dd>
                    ))}
                  </>
                )}
              </dl>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PriceTiers;
