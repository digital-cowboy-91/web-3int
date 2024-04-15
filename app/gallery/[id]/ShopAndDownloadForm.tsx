"use client";

import { TProduct } from "@/app/api/_cms/collections/products";
import { composeFilamentTitle } from "@/app/cart/lib/composeFilamentTitle";
import Action from "@/app/components/Actions/Action";
import Form from "@/app/components/UI/Form/Form";
import asCurrency from "@/app/lib/asCurrency";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ShopAndDownloadForm({
  products,
}: {
  products: TProduct[];
}) {
  console.log(products);

  const formMethods = useForm();

  const { unregister, watch, getValues } = formMethods;

  const pidSelected = watch("pid");
  const productSelected = products.find((p) => p.id === pidSelected);

  useEffect(() => {
    if (productSelected?.is_digital) {
      unregister("filament");
      unregister("quantity");
    }

    if (productSelected?.price) {
      unregister("email");
      unregister("mandatoryAgreement");
      unregister("subscribeToModel");
      unregister("subscribeToMarketing");
    }
  }, [pidSelected]);

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={() => null} className="shop-download-form">
        <Form.Group>
          {products.map(({ id, title, price }, index) => (
            <Form.Input
              key={id}
              id={`shop-download-${100 + index}`}
              name="pid"
              type="radio"
              value={id}
              label={
                <div className="flex justify-between">
                  <strong>{title}</strong>
                  <span className="uppercase font-black">
                    {!price ? "Free" : asCurrency(price)}
                  </span>
                </div>
              }
            />
          ))}
        </Form.Group>

        {!productSelected?.is_digital &&
          productSelected?.filament_refs.length && (
            <Form.Group>
              <Form.Select
                id="shop-download-200"
                name="filament"
                label="Filament"
              >
                {productSelected?.filament_refs.map(({ filament_ref }) => (
                  <option key={filament_ref.id} value={filament_ref.id}>
                    {composeFilamentTitle(filament_ref)}
                  </option>
                ))}
              </Form.Select>
              <Form.Input
                id="shop-download-201"
                type="number"
                name="quantity"
                label="Quantity"
                defaultValue={1}
                min={1}
              />
            </Form.Group>
          )}

        {productSelected?.is_digital && !productSelected.price ? (
          <>
            <Form.Input
              id="shop-download-300"
              type="email"
              name="email"
              label="Email"
            />
            <Form.Group noBorder>
              <Form.Input
                id="shop-download-401"
                type="checkbox"
                name="mandatoryAgreement"
                label="I've read T&C and Privacy Policy and I agree to them"
              />
              <Form.Input
                id="shop-download-402"
                type="checkbox"
                name="subscribeToModel"
                label="I want to recieve updates/changes about this model"
              />
              <Form.Input
                id="shop-download-403"
                type="checkbox"
                name="subscribeToMarketing"
                label="I want to subscribe to newsletters and occasional promotion and marketing emails"
              />
            </Form.Group>
            <div>
              <Action
                as={"button"}
                label="Get Download Link"
                className="float-right"
                onClick={() => console.log("TODO: Get Download Link")}
              />
            </div>
          </>
        ) : (
          <div>
            <Action
              as={"button"}
              label="Add to Cart"
              className="float-right"
              onClick={() => console.log("TODO: Add to Cart")}
            />
          </div>
        )}
      </Form>
    </FormProvider>
  );
}
