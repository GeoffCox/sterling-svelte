import { componentDocs } from '../../_shared/componentDocs/componentDocs';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    component: params.component,
    docs: componentDocs[params.component]
  };
};
