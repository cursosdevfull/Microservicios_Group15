class Product {
    productId: number
    name: string
    categoryId: number
    stock: number
    unit: string

    constructor(name: string, categoryId: number, stock: number, unit: string) {
        this.name = name
        this.categoryId = categoryId
        this.stock = stock
        this.unit = unit

        this.productId = Math.floor(Math.random() * 10000000 + 1)
    }
}

type ProductPort = {
    existsProduct(productId: number): boolean
    addProduct(product: Product): void
    deleteProduct(productId: number): void
    updateProduct(product: Product): void
    getAllProducts(): Product[]
    getOne(productId: number): Product | undefined
}

class ProductAdapter implements ProductPort {
    products: Product[] = []

    existsProduct(productId: number): boolean {
        return this.products.some(product => product.productId === productId)
    }

    addProduct(product: Product): void {
        this.products.push(product)
    }

    deleteProduct(productId: number): void {
        const position = this.products.findIndex(product => product.productId === productId)

        this.products.splice(position, 1)
    }

    updateProduct(product: Product) {
        const position = this.products.findIndex(prod => prod.productId === product.productId)

        this.products[position] = product
    }

    getAllProducts(): Product[] {
        return this.products
    }

    getOne(productId: number): Product | undefined {
        return this.products.find(product => product.productId === productId)
    }
}

class ProductApplication {
    private readonly port: ProductPort

    constructor(port: ProductPort) {
        this.port = port
    }

    create(product: Product) {
        const exists = this.port.existsProduct(product.productId)
        if (!exists) this.port.addProduct(product)
    }

    remove(productId: number) {
        const exists = this.port.existsProduct(productId)
        if (exists) this.port.deleteProduct(productId)
    }

    update(product: Product) {
        const exists = this.port.existsProduct(product.productId)
        if (exists) this.port.updateProduct(product)
    }

    list() {
        return this.port.getAllProducts()
    }

    findOne(productId: number) {
        return this.port.getOne(productId)
    }
}

const adapter: ProductPort = new ProductAdapter()
const application = new ProductApplication(adapter)

application.create(new Product("Soap", 10, 1000, "boxes"))
application.create(new Product("Butter", 1, 2000, "packs"))

const list = application.list()
console.log(list)