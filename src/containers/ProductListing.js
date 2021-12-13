import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import InventoryDataServices from '../services/inventoryDataServices'
function ProductPage() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const res = await InventoryDataServices.getAllItem();
    console.log(res);
     dispatch(setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
    return (
           <div className="ui grid container">
            <ProductComponent />
            </div>
    )
}

export default ProductPage

