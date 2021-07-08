
import React,{useEffect,useState} from 'react'
import table from '../css/table.css'
import { useDispatch, useSelector } from "react-redux";
import InventoryDataServices from '../services/inventoryDataServices'
import { setProducts,removeSelectedProduct } from "../redux/actions/productsActions";
import { useForm } from "react-hook-form";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';



function ManageProducts() {
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts.products);
    const[showForm,setShowForm]=useState(false);
    const[listData,setListDate] =useState([]);
    const[currentPage,setCurrentPage] =useState(1);
    const[postPerPage,setPostPerPage] =useState(2);
    const columns=[
        {dataField:"id",text:"id"},
        {dataField:"title",text:"Title",sort:true},
        {dataField:"price",text:"price",sort:true},
        {dataField:"category",text:"category",sort:true},
        {
            dataField: "remove",
            text: "Delete",
            formatter: (cellContent, row) => {
              return (
                <button
                  className="btn btn-danger btn-xs"
                  onClick={() => handleDelete(row.id, row.name)}
                >
                  Delete
                </button>
              );
            },
          },
          {
            dataField: "Edit",
            text: "Edit",
            formatter: (cellContent, row) => {
              return (
                <button
                  className="btn btn-danger btn-xs"
                  onClick={() => handleEdit(row.id, row.name)}
                >
                  Edit
                </button>
              );
            },
          },
    ]

    const handleDelete = async (rowId) => {
      const filterData=listData.filter((list)=>list.id!==rowId);
      // setListDate(filterData);
      const res = await InventoryDataServices.deleteItem(rowId);
      dispatch(setProducts(filterData));
      };

      const handleEdit = async (rowId) => {
        const itm=products.filter((item)=>rowId==item.id);
        console.log(itm);
        setShowForm(true);
        setValue("id", rowId);  
        setValue("image", itm[0].image);  
        setValue("description", itm[0].description);  
        setValue("title", itm[0].title);
        setValue("price", itm[0].price);
        setValue("category", itm[0].category);
        };

        const onSubmit = async (data) => {
          const res = await InventoryDataServices.updateItem(data);
          setShowForm(false);
          dispatch(setProducts(res));
       };

    const pagination=paginationFactory({
        page:1,
        sizePerPage:5,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange:function(page,sizePerPage){
            console.log("page",page);
            console.log("sizePerPage",sizePerPage);
        },
        onSizePerPageChange:function(page,sizePerPage){
            console.log("page",page);
            console.log("sizePerPage",sizePerPage);
        },
    });

    const fetchProducts = async () => {
        const res = await InventoryDataServices.getAllItem();
        dispatch(setProducts(res.data));
      };
      useEffect(() => {
        fetchProducts();
      }, []);
      useEffect(() => {
        setListDate(products);
      }, [products]);
    return (
        <div>
          {
                showForm &&
                <div style={{background: "currentColor"}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("id")} />   
                <input type="hidden" {...register("description")} /> 
                <input type="hidden" {...register("image")} /> 
                <label>Title</label>
                <input type="text" {...register("title")} />
                <label>Price</label>
                <input type="text" {...register("price")} />
                <label>Category</label>
                <input type="text" {...register("category")} />
                <input type="submit" />
              </form>
              </div>
}
            <BootstrapTable bootstrap4 
            keyField="id" columns={columns} 
            data={listData} pagination={pagination}/>
        </div>
    )
}

export default ManageProducts
