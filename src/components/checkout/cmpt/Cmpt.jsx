import Aside from '../aside/Aside';
import Store from '../store/Store';
import { Cmpt } from './cmptStyle';

function CheckoutCmpt() {
  return (
    <Cmpt>
      <Store />
      <Aside />
    </Cmpt>
  );
}

export default CheckoutCmpt;
