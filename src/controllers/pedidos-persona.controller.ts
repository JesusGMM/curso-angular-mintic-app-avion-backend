import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Persona,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosPersonaController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Persona> {
    return this.pedidosRepository.persona(id);
  }
}
