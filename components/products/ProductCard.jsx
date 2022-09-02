import React, { useState } from "react";
// import { useCart } from "hooks/useCart";
import Price from "./Price";
import Image from "next/image";

const VariantPicker = ({ product, currentVariant, setCurrentVariant }) => {
  // console.log('product variants', product.variants.edges)
  const [isLoading, setIsLoading] = useState({
    adding: false,
    buying: false,
  });

  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);

  // const { BuyNow, addToCart } = useCart();

  const handleSelectChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedVariant = product.variants.edges.find(
      ({ node }) => node.title === selectedTitle
    );

    console.log(selectedVariant);
    if (selectedVariant) setCurrentVariant(selectedVariant.node);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setQty("");
    } else if (Number.isInteger(parseInt(e.target.value))) {
      setQty(parseInt(e.target.value));
    }
    return;
  };

  const quantity = qty;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (e.currentTarget.id === "buy-now") {
        // setIsLoading({ ...isLoading, buying: true })
        // const checkoutUrl = await BuyNow({
        //   lineItems: [{ variantId: currentVariant.id, quantity }],
        // });
        // window.location.href = checkoutUrl;
      } else if (e.currentTarget.id === "add-to-cart") {
        setIsLoading({ ...isLoading, adding: true });
        // await addToCart([{ quantity, merchandiseId: currentVariant.id }]);
        setIsLoading({
          adding: false,
          buying: false,
        });
      }
    } catch (e) {
      setError(e);
      setIsLoading({
        adding: false,
        buying: false,
      });
    }
  };

  if (!currentVariant) {
    return <div>This Product Is Sold Out</div>;
  }

  return (
    <form className="">
      <h3 className="">{product.title}</h3>
      <div className="">
        <Price price={currentVariant.priceV2.amount} />
      </div>
      <div className="">
        <p>Select Details</p>
        <select
          name="variant_select"
          id="variant_select"
          onChange={handleSelectChange}
          value={currentVariant.title}
          className={`p-2 bg-slate-500 w-1/2`}
        >
          {product.variants.edges.map(({ node }) => (
            <option key={node.id} value={node.title} data-variant-id={node.id}>
              {node.title}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <div>
          <div className="flex flex-col">
            <div className="">Quantity:</div>
            <input
              className="p-2 bg-slate-500 w-1/2"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={qty}
              onChange={handleChange}
            />
          </div>

          <div className="flex fjc-sb mt-l">
            <button
              type="submit"
              name="add_to_cart"
              id="add-to-cart"
              className="p-2 border"
              onClick={handleSubmit}
              disabled={isLoading.adding || isLoading.buying}
            >
              {isLoading.adding ? "...Adding" : "Add To Cart"}
            </button>
            <div className="w-25px"></div>
            <button
              type="submit"
              name="buy-now"
              id="buy-now"
              className="p-2 border"
              onClick={handleSubmit}
              disabled={isLoading.adding || isLoading.buying}
            >
              {isLoading.buying ? "...Loading" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const Product = ({ product }) => {
  // console.log('product', product)
  const firstAvailableVariant = product.variants.edges.find(
    ({ node }) => node.availableForSale
  );

  const [currentVariant, setCurrentVariant] = useState(
    firstAvailableVariant.node
  );

  console.log({ currentVariant });
  return (
    <div className="">
      <div>
        <div className="relative w-full aspect-[1/1]">
          <Image
            src={currentVariant.image.src}
            alt="test"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="">
        <div className="">
          <VariantPicker
            product={product}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
          />
          <div
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            className="mtb-l"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
