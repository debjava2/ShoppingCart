import React,{useEffect,useState} from 'react'
import table from '../css/table.css'
import { useDispatch, useSelector } from "react-redux";
import InventoryDataServices from '../services/inventoryDataServices'
import { setProducts,removeSelectedProduct } from "../redux/actions/productsActions";
import { useForm } from "react-hook-form";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Pagination from './Pagination'
import axios from 'axios'


function AdminPanel() {
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts.products);
    const[showForm,setShowForm]=useState(false);
    const[listData,setListDate] =useState([]);
    const[currentPage,setCurrentPage] =useState(1);
    const[postPerPage,setPostPerPage] =useState(2);
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
     
      

      const handleEdit=(id)=>{
            const itm=products.filter((item)=>id==item.id);
            console.log(itm)
            setShowForm(true);
            setValue("id", id);  
            setValue("title", itm[0].title);
      }
      const onSubmit = (data) => {
         alert(JSON.stringify(data));

      };

      const indexOfLastPost=currentPage*postPerPage
      const indexOfFirstPost=indexOfLastPost-postPerPage;
      const currentPosts=listData.slice(indexOfFirstPost,indexOfLastPost)
     

      const paginate=(pagenumber)=>{
        setCurrentPage(pagenumber)
         
      }

      const deleteItem= async (id)=>{
            const res = await InventoryDataServices.deleteItem(id);
         dispatch(removeSelectedProduct(res.data));

       






      }
    return (

        <div>
            
            {
                showForm &&
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("id")} />   
                <label>Title</label>
                <input type="text" {...register("title")} />
                <label>Last Name</label>
                <input type="text" {...register("lastName", { minLength: 10 })} />
                {errors.lastName && <p>"This Field must have more than 10 characters"</p>}
                
                <input type="submit" />
                
              </form>
              </div>
            }
    <div className="container-lg">
    <div className="table-responsive">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-8"> <h2><b>Inventory Details</b></h2></div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Discription</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                
                <tbody>
                    
                {
                    
                    currentPosts.map((list)=>{
                        const{id,title,price,discription,category,image}=list
                        console.log(title);
                        return(
                        <tr>
                        <td>{title}</td>
                        <td>{price}</td>
                        <td>{category}</td>
                        <td>{image}</td>
                        <td>
                            {/* <a className="add" title="Add" data-toggle="tooltip" ><i className="material-icons" onClick={handleEdit}>&#xE03B;</i></a> */}
                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons" onClick={()=>handleEdit(id)}>&#xE254;</i></a>
                           
                        </td>
                        <td>
                        <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons" onClick={()=>deleteItem(id)}>&#xE872;</i></a>
                        </td>
                    </tr>
                        )

                    })
                }
                   
                  
                </tbody>
            </table>
            <Pagination 
            postPerPage={postPerPage} 
            totalPosts={products.length} paginate={paginate}/>
        </div>
    </div>
    
</div>
      
        </div>
    )
}

export default AdminPanel

