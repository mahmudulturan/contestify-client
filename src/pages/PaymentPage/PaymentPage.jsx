import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../api/axiosSecure";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import Container from "../../components/Shared/Container/Container";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPEPK);

const PaymentPage = () => {
  console.log(stripePromise);
  const { id } = useParams();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["contest-detail",], queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`)
      return res.data
    }
  })
  if (isLoading) return <Loading></Loading>


  const { name, image } = data;

  return (
    <div>
      <PageTitle
        bgImage={image}
        heading="Confirm Your Participation"
        subHeading="Finalize Your Contest Registration"
        paragraph="Confirm your payment to secure your contest entry and join the creative excitement. Your spot awaits – finalize your registration now!"
      ></PageTitle>
      <Container padding minHeight>
        <div className="py-12">
          <div className="max-w-2xl min-h-[30vh] bg-cardCol mx-auto rounded-md">
            <h1 className="text-center text-white py-4 text-sm">Continue Payment for <br /><span className="text-base">{name}</span></h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm data={data}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentPage;