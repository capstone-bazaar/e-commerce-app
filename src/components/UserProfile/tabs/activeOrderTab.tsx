import UnshippedOrderItem from '../../ActiveOrders/UnshippedOrderItem';
//eslint-disable-next-line
function ActiveOrderTab({ data }: { data: any }) {
  return (
    <div>
      {
        //eslint-disable-next-line
        data.map((unshippedOrder: any, index: any) => {
          return <UnshippedOrderItem key={index} orderData={unshippedOrder} />;
        })
      }
    </div>
  );
}

export default ActiveOrderTab;
