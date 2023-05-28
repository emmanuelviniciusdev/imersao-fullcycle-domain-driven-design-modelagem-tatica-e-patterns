import RepositoryInteface from '../../@shared/repository/repository.interface'
import Customer from '../entity/customer'

export default interface CustomerRepositoryInterface
    extends RepositoryInteface<Customer> {}
