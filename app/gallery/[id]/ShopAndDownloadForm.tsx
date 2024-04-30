"use client";

import { TProduct } from "@/app/api/_cms/collections/products";
import { useCartStore } from "@/app/cart/components/Cart.store";
import { composeFilamentTitle } from "@/app/cart/lib/composeFilamentTitle";
import Action from "@/app/components/Actions/Action";
import Loader from "@/app/components/Loader";
import Form from "@/app/components/UI/Form/Form";
import asCurrency from "@/app/lib/asCurrency";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ShopAndDownloadForm({
  products,
}: {
  products: TProduct[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const formMethods = useForm();

  const { unregister, watch, getValues, handleSubmit, reset } = formMethods;

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

  const addCartItem = useCartStore((s) => s.addCartItem);
  const handleAddToCart = handleSubmit((data) => {
    if (!productSelected) return;
    setIsProcessing(true);
    addCartItem(productSelected, parseInt(data.quantity) || 1, data.filament);
    setTimeout(() => {
      setIsProcessing(false);
      reset();
    }, 500);
  });

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={() => null}
        className="shop-download-form content-wrapper"
      >
        <div className="content-wrapper__l2">
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
              disabled={isProcessing}
            />
          ))}
        </div>
        {!productSelected?.is_digital &&
          productSelected?.filament_refs.length && (
            <>
              <hr />
              <div className="content-wrapper__l2">
                <Form.Select
                  id="shop-download-200"
                  name="filament"
                  label="Filament"
                  disabled={isProcessing}
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
                  disabled={isProcessing}
                />
              </div>
            </>
          )}
        {productSelected?.is_digital && !productSelected.price ? (
          <>
            <hr />
            <Form.Input
              id="shop-download-300"
              type="email"
              name="email"
              label="Email"
              disabled={isProcessing}
            />
            <hr />
            <div className="content-wrapper__l2">
              <Form.Input
                id="shop-download-401"
                type="checkbox"
                name="mandatoryAgreement"
                label="I've read T&C and Privacy Policy and I agree to them"
                disabled={isProcessing}
              />
              <Form.Input
                id="shop-download-402"
                type="checkbox"
                name="subscribeToModel"
                label="I want to recieve updates/changes about this model"
                disabled={isProcessing}
              />
              <Form.Input
                id="shop-download-403"
                type="checkbox"
                name="subscribeToMarketing"
                label="I want to subscribe to newsletters and occasional promotion and marketing emails"
                disabled={isProcessing}
              />
            </div>
            <div>
              <Action
                as={"a"}
                href={"/d/" + productSelected?.id}
                label="Get Download Link"
                className="float-right"
                download
              />
            </div>
          </>
        ) : (
          <Action
            as={"button"}
            label={isProcessing ? <Loader /> : "Add to Cart"}
            className="float-right"
            onClick={handleAddToCart}
            disabled={isProcessing}
          />
        )}
      </Form>
    </FormProvider>
  );
}
