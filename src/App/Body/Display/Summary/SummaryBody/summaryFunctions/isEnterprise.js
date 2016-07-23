import { withName } from './shared';
import { FEATURES } from 'data/columns';

export default function isEnterprise(modules) {
  const serverModule = modules.find(withName('SERVER'));

  const hasFeatures = /[CDEFSW]/.test(serverModule[FEATURES]);
  const hasModules = ['WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name => (
    modules.some(withName(name))
  ));

  return hasFeatures || hasModules;
}
