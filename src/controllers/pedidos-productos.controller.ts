import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedidos,
  Productos,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosProductosController {
  constructor(
    @repository(PedidosRepository) protected pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/productos', {
    responses: {
      '200': {
        description: 'Pedidos has one Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Productos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos> {
    return this.pedidosRepository.productos(id).get(filter);
  }

  @post('/pedidos/{id}/productos', {
    responses: {
      '200': {
        description: 'Pedidos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInPedidos',
            exclude: ['id'],
            optional: ['pedidosId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.pedidosRepository.productos(id).create(productos);
  }

  @patch('/pedidos/{id}/productos', {
    responses: {
      '200': {
        description: 'Pedidos.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.pedidosRepository.productos(id).patch(productos, where);
  }

  @del('/pedidos/{id}/productos', {
    responses: {
      '200': {
        description: 'Pedidos.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.pedidosRepository.productos(id).delete(where);
  }
}
