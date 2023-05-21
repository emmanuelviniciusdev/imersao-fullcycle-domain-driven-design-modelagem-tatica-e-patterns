import RepositoryInteface from './repository.interface'
import Product from '../entity/product'

export default interface ProductRepositoryInterface
    extends RepositoryInteface<Product> {}
