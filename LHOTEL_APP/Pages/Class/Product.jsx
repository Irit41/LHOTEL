export default class Product {
    
    constructor(Product) {
        this.ProductCode = Product.ProductCode,
        this.Category =  Product.Category,
        this.Name = Product.Name,
        this.Image =  Product.Image
        this.PricePerUnit = Product.PricePerUnit ,
        this.DiscountPercentage = Product.DiscountPercentage,
        this.AmountTaken = Product.AmountTaken
	
    }
}