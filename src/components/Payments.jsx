import axios from "axios";
import { Base_Url } from "../constants";
import { useState } from "react";
import {useEffect} from "react";

const Payments = () => {
  const [isPremium, setIsPremium] = useState(false);
  const paymentHandle = async (action)=>{
       try{
        const membershipType=action;
         const order=await axios.post(Base_Url+"/payment/user/",
        {membershipType}
        ,{withCredentials:true});

        const {amount,currency,orderId,notes,keyId} = order.data;

 const options = {
        key: keyId,
        amount, 
        currency,
        name: 'Dev Tinder',
        description: 'Test Transaction',
        order_id: orderId, 

        handler: async function(response){

    const verifyRes =
      await axios.post(
        Base_Url + "/payment/verify",
        {
          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature
        },
        {
          withCredentials:true
        }
        
      );
      if (verifyRes.data.success) {
   setIsPremium(true);
}


},

        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

         const rzp = new window.Razorpay(options);
      rzp.open();
       }

       catch(err){
        console.log(err);
       }
  }

  useEffect(() => {
   fetchPremiumStatus();
}, []);

const fetchPremiumStatus = async () => {
   const res = await axios.get(
      Base_Url + "/profile/view",
      {
         withCredentials: true,
      }
   );

   setIsPremium(res.data.isPremium);
};
 

if (isPremium) {
   return (
     <div className="min-h-screen flex justify-center items-center -mt-40">
         <div className="card bg-base-200 shadow-xl p-10 text-center">
            <h1 className="text-4xl font-bold text-green-500">
               🎉 Premium Membership Active
            </h1>

            <p className="mt-4 text-lg">
               You are already a premium user.
            </p>
         </div>
      </div>
   );
}

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="grid lg:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* Silver Card */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Silver Premium
          </h2>

          <ul className="space-y-3 mb-6">
            <li>✅ 50 Requests Per Day</li>
            <li>✅ Chat With People</li>
            <li>✅ Blue Tick</li>
            <li>✅ 3 Months Access</li>
          </ul>

          <button onClick={()=>paymentHandle("silver")} className="btn bg-gray-500 hover:bg-gray-600 text-white w-full">
            Buy Silver
          </button>
        </div>

        {/* Gold Card */}
        <div className="card bg-base-200 shadow-xl p-6 border-2 border-yellow-500">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-4">
            Gold Premium
          </h2>

          <ul className="space-y-3 mb-6">
            <li>✅ Unlimited Requests</li>
            <li>✅ Chat With People</li>
            <li>✅ Blue Tick</li>
            <li>✅ 6 Months Access</li>
          </ul>

          <button  onClick={()=>paymentHandle("gold")} className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full">
            Buy Gold
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payments;