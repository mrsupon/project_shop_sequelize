
import AdminsProductController from "../controllers/admins/productController.js";
import ShopsProductController from "../controllers/shops/productController.js";
import ShopsCartController from "../controllers/shops/cartController.js";
import ShopsOrderController from "../controllers/shops/orderController.js";
import ShopController from "../controllers/shops/shopController.js";
import ErrorController from "../controllers/errorController.js";

class Route{
        static start(app){

            app.get("/",(req, res)=>{ShopController.index(req, res);});

            app.get("/shops/products",(req, res)=>{ShopsProductController.index(req, res);});
            app.get("/shops/products/:id",(req, res)=>{ShopsProductController.show(req, res);});

            app.get("/shops/carts",(req, res)=>{ShopsCartController.index(req, res);}); 
            app.post("/shops/carts",(req, res)=>{ShopsCartController.store(req, res);}); 
            app.delete("/shops/carts/:id",(req, res)=>{ShopsCartController.destroy(req, res);}); 

            app.get("/shops/orders",(req, res)=>{ShopsOrderController.index(req, res);}); 
            app.post("/shops/orders",(req, res)=>{ShopsOrderController.store(req, res);});                  

            app.get("/admins/products",(req, res)=>{AdminsProductController.index(req, res);});
            app.get("/admins/products/create",(req, res)=>{AdminsProductController.create(req, res);});
            app.post("/admins/products",(req, res)=>{AdminsProductController.store(req, res);});
            app.get("/admins/products/:id/edit",(req, res)=>{AdminsProductController.edit(req, res);}); 
            app.put("/admins/products/:id",(req, res)=>{AdminsProductController.update(req, res);}); 
            app.delete("/admins/products/:id",(req, res)=>{AdminsProductController.destroy(req, res);});      

            app.all("*",(req, res)=>{ ErrorController.showStatus404(req, res);});   
        }
}


export default Route ;
 
