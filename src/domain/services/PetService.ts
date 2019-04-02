import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Pet } from '../../infra/database/models/Pet';
import { EventDispatcher, EventDispatcherInterface } from '../../infra/decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../infra/decorators/Logger';
import { PetRepository } from '../../interfaces/repositories/PetRepository';
import { User } from '../entities/User';
import { events } from '../subscribers/events';

@Service()
export class PetService {
  constructor(
    @OrmRepository() private petRepository: PetRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(): Promise<Pet[]> {
    this.log.info('Find all pets');
    return this.petRepository.find();
  }

  public findByUser(user: User): Promise<Pet[]> {
    this.log.info('Find all pets of the user', user.toString());
    return this.petRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  public findOne(id: string): Promise<Pet | undefined> {
    this.log.info('Find all pets');
    return this.petRepository.findOne({ id });
  }

  public async create(pet: Pet): Promise<Pet> {
    this.log.info('Create a new pet => ', pet.toString());
    pet.id = uuid.v1();
    const newPet = await this.petRepository.save(pet);
    this.eventDispatcher.dispatch(events.pet.created, newPet);
    return newPet;
  }

  public update(id: string, pet: Pet): Promise<Pet> {
    this.log.info('Update a pet');
    pet.id = id;
    return this.petRepository.save(pet);
  }

  public async delete(id: string): Promise<void> {
    this.log.info('Delete a pet');
    await this.petRepository.delete(id);
    return;
  }
}
