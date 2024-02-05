import { getPricing } from "@/cms/items/pricing";
import { FINDALL } from "../../prisma/modelPriceTier";
import PriceTierFeature from "./PriceTierFeature";

const CSSDl = "text-dark flex flex-col gap-2";
const CSSDt =
  "border-b-2 border-gray my-4 text-end text-gray font-semibold uppercase";

const PriceTiers = async () => {
  const res = await getPricing();

  return (
    <div className="p-8 pt-0 flex flex-row justify-center">
      <div className="flex gap-8 justify-center flex-wrap">
        {res.map(({ id, title, subtitle, price, features }) => (
          <div
            key={id}
            className="bg-white p-5 z-10 rounded-[1rem] flex-1 min-w-[250px] w-[300px]"
          >
            <div className="flex flex-row justify-between items-center font-semibold uppercase mb-5">
              <span className="text-primary text-2xl">{title}</span>
              <span className="text-dark">{price}</span>
            </div>
            <div className="text-dark">{subtitle}</div>
            <dl className={CSSDl}>
              <dt className={CSSDt}>Includes</dt>
              {features
                .filter((item) => item.is_included)
                .map(({ description, additional_information }, index) => (
                  <dd key={id + "_inc_" + index}>
                    <PriceTierFeature
                      feature={description}
                      description={additional_information}
                    />
                  </dd>
                ))}
              {features.filter((item) => !item.is_included).length > 0 && (
                <>
                  <dt className={CSSDt}>Optional</dt>
                  {features
                    .filter((item) => !item.is_included)
                    .map(({ description, additional_information }, index) => (
                      <dd key={id + "_exc_" + index}>
                        <PriceTierFeature
                          feature={description}
                          description={additional_information}
                        />
                      </dd>
                    ))}
                </>
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTiers;
