import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartLoading } from "store/selectors/cart";
import {
  addItemToCart,
  decreaseQuantityOfItem,
  increaseQuantityOfItem,
  removeItemFromSelection,
} from "store/thunks/cart";
import { Item } from "types/cart";

import Layout from "components/Layouts/PageLayout";

const Index: NextPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCartLoading);
  const cartItems = useSelector(selectCartItems);

  const increaseQuantityClickHandler = (line: string) => {
    dispatch(increaseQuantityOfItem({ line, quantity: 1 }));
  };

  const decreaseQuantityClickHandler = (line: string) => {
    dispatch(decreaseQuantityOfItem({ line, quantity: 1 }));
  };

  const removeItemClickHandler = (line: string) => {
    dispatch(removeItemFromSelection(line));
  };

  return (
    <Layout title="Cart" description="This is you inventory">
      <div className="my-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cartItems?.map((item: Item) => {
          return (
            <div className="border border-borderGray" key={item.item}>
              <h2>{item?.product?.name}</h2>
              <div className="flex justify-between text-gray-500">
                <p>x {item.quantity}</p>
                <p>{item.totalPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Index;
