import { LifecycleValue } from '../../common/enums/LifecycleValue';
import { Behavior } from '../../common/interfaces/Behavior';
import { BinaryType } from '../../common/types/NumericalTypes';
import { Entity } from '../../ecs/classes/Entity';
import { getComponent } from '../../ecs/functions/EntityFunctions';
import { State } from '../components/State';
import { StateType } from '../enums/StateType';
import { StateValue } from '../interfaces/StateValue';
import { StateAlias } from '../types/StateAlias';

export const setState: Behavior = (entity: Entity, args: { state: StateAlias }): void => {
  const stateComponent = getComponent(entity, State);
  
  if(stateComponent === undefined)
    return console.warn("WARNING: State component is undefined");

  if (stateComponent.data.has(args.state))
    return;

  stateComponent.data.set(args.state, {
    state: args.state,
    type: StateType.DISCRETE,
    lifecycleState: LifecycleValue.STARTED,
    group: stateComponent.schema.states[args.state].group
  } as StateValue<BinaryType>);
};
