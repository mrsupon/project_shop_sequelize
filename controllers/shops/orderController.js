import Product from "../../models/product.js";
import Cart from "../../models/cart.js";
import CartItem from "../../models/cartItem.js";
import Order from "../../models/order.js";
import OrderDetail from "../../models/orderDetail.js";
import User from "../../models/user.js";

class OrderController{

    static index(req, res){  
        const user = req.user;
        user.getOrders({include:['products']})
        .then(orders=>{  
            res.render('shops/orders/index.ejs', {
            orders: orders ,
            pageTitle: 'Order',
            path: '/shops/orders'
            })
        })
        .catch( err=>console.log(err) );  

    }

    static store(req, res){ 
        const user = req.user;
        let foundCart = null;
        user.getCart({where:{userId:user.id}})
        .then( cart=>{ 
            foundCart = cart;
            return cart.getProducts();
        })
        .then( products=>{ 
            user.createOrder()
            .then( order=>{  
                return order.addProducts(
                    products.map(product=>{
                        product.orderDetail = {quantity: product.cartItem.quantity} ;
                        return product;
                    })
                ); 
            })
            .catch( err=>console.log(err) ); 
        })
        .then( result=>{ 
            return foundCart.setProducts(null);
        })
        .then( result=>{ 
            res.redirect('/shops/orders');
        })
        .catch( err=>console.log(err) );   
    }

}

export default OrderController;