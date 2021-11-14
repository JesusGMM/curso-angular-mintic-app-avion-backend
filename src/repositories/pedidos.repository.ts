import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Persona, Productos} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProductosRepository} from './productos.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.id,
  PedidosRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedidos.prototype.id>;

  public readonly productos: HasOneRepositoryFactory<Productos, typeof Pedidos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Pedidos, dataSource);
    this.productos = this.createHasOneRepositoryFactoryFor('productos', productosRepositoryGetter);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
