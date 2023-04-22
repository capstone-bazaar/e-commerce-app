import ShoppingCartComponent from '../components/ShoppingCart';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from './Product';

export function ShoppingCartPage() {
  return (
    <PageWithNavbar>
      <ContainerBox>
        <ShoppingCartComponent />
      </ContainerBox>
    </PageWithNavbar>
  );
}
