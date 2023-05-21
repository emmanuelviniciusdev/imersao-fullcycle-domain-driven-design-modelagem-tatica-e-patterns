import ProductRepositoryInterface from '../../domain/repository/product.repository.interface'
import Product from '../../domain/entity/product'
import ProductModel from '../database/sequelize/model/product.model'

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } })

        if (!productModel) {
            throw new Error(`Product with ID ${id} not found`)
        }

        const productData = productModel.toJSON()

        return new Product(productData.id, productData.name, productData.price)
    }

    async findAll(): Promise<Product[]> {
        const allProducts = await ProductModel.findAll()
        return allProducts.map((p) => new Product(p.id, p.name, p.price))
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            { name: entity.name, price: entity.price },
            { where: { id: entity.id } }
        )
    }
}
