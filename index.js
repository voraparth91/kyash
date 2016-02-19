var co = require('co');
var prequest = require("request-promise");

var BASE_URL = "https://api.kyash.in/v1";
var API_PATH_PAYMENT_POINTS = "/paymentpoints";
var API_PATH_KYASHCODE = "/kyashcodes";

var defaultObject = {
    PUBLIC_ID : null,
    API_SECRET :null
};

exports.init = function(options){
    defaultObject["PUBLIC_ID"] = options["PUBLIC_ID"];
    defaultObject["API_SECRET"] = options["API_SECRET"];
    defaultObject["auth_BASE64"] = new Buffer(defaultObject["PUBLIC_ID"]+':'+defaultObject["API_SECRET"]).toString('base64');
}

exports.getPaymentPoints = function(pincode){
    return co(function*(){
        console.error("This particular API => getPaymentPoints, will soon be deprecated by Kyash. Please move on to client side widget.");
        //Lets configure and request
        var result = yield prequest({
          url: BASE_URL+API_PATH_PAYMENT_POINTS+"/"+pincode, //URL to hit
          method: 'GET',
          //Adding Basic Auth Header(Basic base64 username:password)
          headers : {
            'Authorization':'Basic '+defaultObject["auth_BASE64"]
          }
        });
        return result;
    });
}

exports.createKyashCode = function(customer){
    return co(function*(){
        var result = yield prequest({
          url: BASE_URL+API_PATH_KYASHCODE+"/", //URL to hit
          method: 'POST',
          //Adding Basic Auth Header(Public Id)
          headers : {
            'Authorization':'Basic '+defaultObject["auth_BASE64"]
          },
          form : {
            "order_id": customer.order_id,
            "amount": customer.amount,
            "brand_name":customer.brand_name,
            "sms_enabled":customer.sms_enabled,
            "expires_on":customer.expires_on,
            "billing_contact.first_name": customer.billing_contact.first_name,
            "billing_contact.last_name": customer.billing_contact.last_name,
            "billing_contact.email": customer.billing_contact.email,
            "billing_contact.address": customer.billing_contact.address,
            "billing_contact.city": customer.billing_contact.city,
            "billing_contact.state": customer.billing_contact.state,
            "billing_contact.pincode": customer.billing_contact.pincode,
            "billing_contact.phone": customer.billing_contact.phone,
            "shipping_contact.first_name": customer.shipping_contact.first_name,
            "shipping_contact.last_name": customer.shipping_contact.last_name,
            "shipping_contact.email": customer.shipping_contact.email,
            "shipping_contact.address": customer.shipping_contact.address,
            "shipping_contact.city": customer.shipping_contact.city,
            "shipping_contact.state": customer.shipping_contact.state,
            "shipping_contact.pincode": customer.shipping_contact.pincode,
            "shipping_contact.phone": customer.shipping_contact.phone
          }
        });
        return result;
    });
}

exports.getKyashCodeDetails = function(kyashcode){
    return co(function*(){
        var result = yield prequest({
        url: BASE_URL+API_PATH_KYASHCODE+"/"+kyashcode, //URL to hit
        method: 'GET',
        //Adding Basic Auth Header(Basic base64 username:password)
        headers : {
        'Authorization':'Basic '+defaultObject["auth_BASE64"]
        }
        });
        return result;
    });
}

exports.cancelPayment = function(kyashcode,options){
    return co(function*(){
        var result = yield prequest({
        url: BASE_URL+API_PATH_KYASHCODE+"/"+kyashcode+"/cancel", //URL to hit
        method: 'POST',
        //Adding Basic Auth Header(Basic base64 username:password)
        headers : {
        'Authorization':'Basic '+defaultObject["auth_BASE64"]
        },
        form : {
          "reason":options.reason,
          "should_refund":options.should_refund,
          "refund_amount":options.refund_amount,
          "charge_paid_by":options.charge_paid_by
        }
        });
        return result;
    });
}