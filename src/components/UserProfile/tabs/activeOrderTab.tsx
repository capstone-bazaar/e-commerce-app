import UnshippedOrderItem from '../../ActiveOrders/UnshippedOrderItem';

function ActiveOrderTab({ data }: { data: any }) {
  return (
    <div>
      {data.map((unshippedOrder: any, index: any) => {
        return <UnshippedOrderItem key={index} orderData={unshippedOrder} />;
      })}
    </div>
  );
}

export default ActiveOrderTab;
