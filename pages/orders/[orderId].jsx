import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const ShowOrder = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id
    },
    onSuccess: payment => console.log(payment);
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) return <div>Order expired</div>;

  return (
    <div>
      <p>{timeLeft} seconds until order expires</p>
      <StripeCheckout
        token={({ id }) => doRequest({ id })}
        stripeKey="pk_test_51HqNGbEUgEdtsguSdToivZ70DbME32vG3Li7H9seezAOAOkORCVq2OojTueZhHJKdNgoKekfun0WnWc4aOKC1mgh006jDJBjid" // todo: put this somewhere else
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

ShowOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default ShowOrder;
