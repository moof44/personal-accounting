import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Capital } from '../model/capital.model';
import { Update } from '@ngrx/entity';

export const CapitalActions = createActionGroup({
  source: 'Capital',
  events: {
    'Load Capitals': emptyProps(),
    'Load Capitals Success': props<{ capitals: Capital[] }>(),
    'Add Capital': props<{ capital: Capital }>(),
    'Add Capital Success': props<{ capital: Capital }>(),
    'Upsert Capital': props<{ capital: Capital }>(),
    'Add Capitals': props<{ capitals: Capital[] }>(),
    'Upsert Capitals': props<{ capitals: Capital[] }>(),
    'Update Capital': props<{ capital: Update<Capital> }>(),
    'Update Capitals': props<{ capitals: Update<Capital>[] }>(),
    'Delete Capital': props<{ id: string }>(),
    'Delete Capitals': props<{ ids: string[] }>(),
    'Clear Capital': emptyProps(),
  }
});
