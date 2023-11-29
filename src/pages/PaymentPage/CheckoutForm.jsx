import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../../components/Shared/Button/Button";
import { useEffect, useState } from "react";
import { axiosSecure } from "../../api/axiosSecure";
import PropTypes from 'prop-types';
import useAuth from "../../hooks/useAuth";
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



const CheckoutForm = ({ data }) => {
  const [error, setError] = useState("");
  const [clientsecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate()
  useEffect(() => {

    axiosSecure.post('/create-payment-intent', { price: data?.contest_price })
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [data, user])
  const handlePayment = async e => {
    e.preventDefault()
    setLoading(true)
    if (!stripe || !element) {
      setLoading(false)
      return;
    }
    const card = element.getElement(CardElement)
    if (card === null) {
      setLoading(false)
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card })
    if (error) {
      setLoading(false)
      setError(error.message)
    }
    else {
      setError('')
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientsecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName
        },
      },
    })
    if (confirmError) {
      setError(confirmError.message)
      setLoading(false)
    }
    else {
      if (paymentIntent.status == "succeeded") {
        console.log(paymentIntent, error);
        setError("")
        const participateData = {
          contest_name: data?.name,
          contest_id: data?._id,
          transactionID: paymentIntent.id,
          purchaseTime: new Date(),
          contest_type: data?.contest_type,
          contest_deadline: data?.contest_deadline,
          contest_image: data?.image,
          participator: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
          }
        }

        const { data: insertedData } = await axiosSecure.post('/participate-contest', participateData)
        if (insertedData.acknowledged) {
          toast.success('Successfully toasted!')
          navigate('/dashboard/joined-contests', { replace: true })
          setLoading(false)
        }
        setLoading(false)
      }
    }
  }
  return (
    <div>
      <form onSubmit={handlePayment}>
        <CardElement>
        </CardElement>
        <div className="text-center">
          {
            loading ?
              <Button disable={!clientsecret || !stripe || !element || loading} icon={FaSpinner} spin></Button>
              :
              <Button disable={!clientsecret || !stripe || !element} name={`Pay $${data?.contest_price}`}></Button>
          }
          {
            error && <span className="text-red-500 block">{error}</span>
          }
        </div>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  data: PropTypes.object,
}

export default CheckoutForm;