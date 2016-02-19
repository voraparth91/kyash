## Installation

```bash
$ npm install kyash
```

## Create and Initialize Object
```js
var kyash = require('kyash')
kyash.init({"PUBLIC_ID":<yourId>,"API_SECRET":<yourAPISecret>})
```

## Features

  * Direct functions to call various API
  * Get Payment Points (This will be deprecated by Kyash soon. Check their widget)
  * Create a KyashCode
  * Get Details for any KyashCode
  * Cancel Payment based on KyashCode
 
## Get Payment Points List

```js
var paymentOptions = kyash.getPaymentPoints("560095").then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

## Create Kyashcode

```js
var customer = {
    order_id: "1234-1234",
    amount: 1000,
    brand_name:"Your Technologies",
    sms_enabled:true,
    billing_contact:{
        first_name:"Parth",
        last_name:"vora",
        email:"customer@gmail.com",
        address:"unknown",
        city:"Bangalore",
        state:"Karnataka",
        pincode:"560095",
        phone:"9876543210"
    },
    shipping_contact:{
        first_name:"Parth",
        last_name:"vora",
        email:"customer@gmail.com",
        address:"unknown",
        city:"Bangalore",
        state:"Karnataka",
        pincode:"560095",
        phone:"9876543210"
    }
}

var createKyashCode = kyash.createKyashCode(customer).then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

## Get Kyashcode details
```js
var kyashCodeSample = "T72011634";
var kyashCodeDetails = kyash.getKyashCodeDetails(kyashCodeSample).then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

## Cancelling Payment
```js
options = {"reason":"requested_by_customer","should_refund":true,"refund_amount":100,"charge_paid_by":"merchant"};
var cancelPayment = kyash.cancelPayment(kyashCodeSample,options).then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

##### For more details regarding API arguments, kindly go through official documentation found [here](http://secure.kyash.com/doc/merchant_api.pdf)