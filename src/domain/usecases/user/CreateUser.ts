import { Service } from 'typedi';

import { IUser } from '@domain//entities/IUser';
import { events } from '@domain/subscribers/events';
import { DbModel, ModelInterface } from '@infra/database/DbModel';
import userSchema, { IUserModel } from '@infra/database/schemas/userSchema';
import { EventDispatcher, EventDispatcherInterface } from '@infra/eventDispatch/EventDispatcher';
import { Logger, LoggerInterface } from '@infra/logger/LoggerDecorator';

@Service()
export class CreateUser {
  constructor(
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @DbModel<IUserModel>(userSchema) private userModel: ModelInterface<IUserModel>,
    @Logger(__filename) private logger: LoggerInterface
  ) {}

  public async execute(userEntity: IUser): Promise<IUserModel> {
    this.logger.info('Create a new user => ', userEntity.toString());

    const userModel = new this.userModel(userEntity);
    const newUser = await userModel.save();
    this.eventDispatcher.dispatch(events.user.created, newUser);
    return newUser;
  }
}
