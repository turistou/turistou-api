import { Field, InputType, Float } from 'type-graphql';
import { PaymentTypes } from '@domain/entities/PaymentCondition';

@InputType()
export class PaymentTransactionInsertInput {
  @Field(type => Float, {
    description: 'The value(money) paid.'
  })
  value: number;

  @Field({
    description: 'The method type.',
  })
  method: PaymentTypes;
}

@InputType()
export class PaymentInsertInput {
  @Field({
    description: 'The passenger ID.'
  })
  public passengerId: String;

  @Field(type => PaymentTransactionInsertInput, {
    description: 'The payment data.'
  })
  public payment: PaymentTransactionInsertInput;
}

@InputType()
export class UpdatePayDateInput {
  @Field({
    description: 'The Passenger to update the payment.',
  })
  public passengerId: string;

  @Field({
    description: 'The Payment to update.',
  })
  public paymentId: String;
}