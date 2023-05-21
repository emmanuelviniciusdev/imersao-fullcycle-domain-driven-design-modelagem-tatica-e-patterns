import RepositoryInteface from './repository.interface'
import Customer from '../entity/customer'

export default interface CustomerRepositoryInterface
    extends RepositoryInteface<Customer> {}
