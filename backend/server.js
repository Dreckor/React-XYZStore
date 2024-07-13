const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


let products = [];
let sales = [];
let balance = 0;


app.post('/products', (req, res) => {
    try{
        const { article, description, value, stock, image } = req.body;
        const newProduct = {
            id: products.length + 1,
            article,
            description,
            value,
            stock,
            image
        };
        products.push(newProduct);
        console.log(newProduct)
        res.status(201).json(newProduct);
    }catch(error){
        console.log(error)
    }
   
});


app.put('/products/:id', (req, res) => {
    try{
        const { id } = req.params;
    console.log(id)
    const updatedProduct = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.status(200).json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
    }catch(error){
        console.log(error)
    }
    
});


app.get('/products', (req, res) => {
    res.json(products);
});


app.get('/products/available', (req, res) => {
    try{
        const availableProducts = products.filter(product => product.stock > 0);
        res.json(availableProducts);
    }catch(error){
        console.log(error)
    }
    
});


app.post('/cart', (req, res) => {
    try {
        const { items, clientID } = req.body;
        let total = 0;
        let outOfStockItems = [];
        let purschasedItems = [];
        items.forEach(item => {
            const productIndex = products.findIndex(p => p.id === item.id && p.stock >= item.quantity);
            if (productIndex !== -1) {
                products[productIndex].stock -= item.quantity;
                total += products[productIndex].value * item.quantity;
                purschasedItems.push({...products[productIndex], clientID, quantity})
            } else {
                outOfStockItems.push(item);
            }
        });

        if (outOfStockItems.length > 0) {
            res.status(400).json({ message: 'Some items are out of stock or insufficient quantity', outOfStockItems });
        } else {
            purschasedItems.forEach(item => {
                sales.push(item)
            })
            balance += total
            res.json({ message: 'Purchase completed', total })
        }
    } catch (error) {
        next(error)
    }

});

app.get('/sales', (req, res) => {
    res.json({"sales": sales, "balance": balance});
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
