import { State, Action, StateContext, Selector } from '@ngxs/store';

import {Tutorial} from '../models/tutorial.model';
import {AddTutorial, RemoveTutorial} from '../actions/tutoral.actions';


export class TutorialStateModel {
  tutorials: Tutorial[];
}

@State<TutorialStateModel>({
  name: 'tutorials',
  defaults: {
    tutorials: []
  }
})

export class TutorialState {

  @Selector()
  static getTutorials(state: TutorialStateModel) {
    console.log('Selector getTutorials');
    return state.tutorials;
  }

  @Action(AddTutorial)
  add({getState, patchState}: StateContext<TutorialStateModel>, { payload }: AddTutorial) {
    console.log('Action Add');
    const state = getState();
    patchState({
      tutorials: [...state.tutorials, payload]
    });
  }

  @Action(RemoveTutorial)
  remove({getState, patchState}: StateContext<TutorialStateModel>, { payload }: RemoveTutorial) {
    console.log('Action Remove');
    patchState({
      tutorials: getState().tutorials.filter(a => a.name !== payload)
    });
  }
}
