import { useQuery } from '@apollo/client';
import Orders from '../components/Orders';
import PageWithNavbar from '../components/Templates/PageWithNavbar';
import { ContainerBox } from '../components/container';
import { GET_ME } from '../queries/user';

export default function OrdersPage() {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <PageWithNavbar>
      <ContainerBox>
        <Orders data={data} />
      </ContainerBox>
    </PageWithNavbar>
  );
}
