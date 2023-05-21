import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../database/sequelize/model/product.model'
import ProductRepository from './product.repository'
import Product from '../../domain/entity/product'

describe('ProductRepository Integration Tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([ProductModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should throw an error if product was not found in the database', async () => {
        const productRepository = new ProductRepository()

        await expect(
            async () => await productRepository.find('foo-123')
        ).rejects.toThrowError('Product with ID foo-123 not found')
    })

    it('should find a persisted product in the database by ID', async () => {
        const productRepository = new ProductRepository()

        const products = [
            new Product('c324d38b-4ea5-443a-955d-0d9c91747dea', 'Pumpkin', 0.8),
            new Product('aa9e6df5-5694-4d5c-9410-180626e9b397', 'Grapes', 1.2),
            new Product('4ed807c8-2c63-4f83-b11f-a3aab241ebe2', 'Apple', 0.5),
        ]

        await Promise.all(products.map((p) => productRepository.create(p)))

        const foundProduct = await productRepository.find(
            'aa9e6df5-5694-4d5c-9410-180626e9b397'
        )

        expect(foundProduct.id).toBe('aa9e6df5-5694-4d5c-9410-180626e9b397')
        expect(foundProduct.name).toBe('Grapes')
        expect(foundProduct.price).toBe(1.2)
    })

    it('should find all persisted products in the database', async () => {
        const productRepository = new ProductRepository()

        const products = [
            new Product('c324d38b-4ea5-443a-955d-0d9c91747dea', 'Pumpkin', 0.8),
            new Product('aa9e6df5-5694-4d5c-9410-180626e9b397', 'Grapes', 1.2),
            new Product('4ed807c8-2c63-4f83-b11f-a3aab241ebe2', 'Apple', 0.5),
        ]

        await Promise.all(products.map((p) => productRepository.create(p)))

        const allFoundProducts = await productRepository.findAll()

        expect(allFoundProducts).toHaveLength(3)

        for (const foundProduct of allFoundProducts) {
            const product = products.find((p) => p.id === foundProduct.id)

            expect(foundProduct.id).toBe(product.id)
            expect(foundProduct.name).toBe(product.name)
            expect(foundProduct.price).toBe(product.price)
        }
    })

    it('should persist a product in the database', async () => {
        const productRepository = new ProductRepository()

        const productId = 'c324d38b-4ea5-443a-955d-0d9c91747dea'

        const product = new Product(productId, 'Pumpkin', 0.8)

        await productRepository.create(product)

        const foundProduct = await productRepository.find(productId)

        expect(foundProduct.id).toBe(productId)
        expect(foundProduct.name).toBe('Pumpkin')
        expect(foundProduct.price).toBe(0.8)
    })

    it('should update a persisted product in the database', async () => {
        const productRepository = new ProductRepository()

        const productId = 'c324d38b-4ea5-443a-955d-0d9c91747dea'

        const product = new Product(productId, 'Pumpkin', 0.8)

        await productRepository.create(product)

        product.changeName('Pumpkin (close to expiration date)')
        product.changePrice(0.4)

        await productRepository.update(product)

        const foundProduct = await productRepository.find(productId)

        expect(foundProduct.id).toBe(productId)
        expect(foundProduct.name).toBe('Pumpkin (close to expiration date)')
        expect(foundProduct.price).toBe(0.4)
    })
})
