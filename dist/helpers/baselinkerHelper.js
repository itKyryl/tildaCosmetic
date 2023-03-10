"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOrderParams = void 0;
const additionalProducts_1 = require("../public/db/additionalProducts");
function convertOrderParams(body) {
    const deliveryOptions = body.deliveryOptions.split("=")[0].split(",");
    const name = `${body.name} ${body.surname}`;
    let newOrderData = {
        currency: getCurrency(body),
        custom_extra_fields: [],
        date_add: new Date().getTime(),
        delivery_address: "adress should be added to a form",
        delivery_city: body.CITY,
        delivery_company: "",
        phone: body.phone,
        delivery_country_code: getCountryCode(body),
        delivery_fullname: name,
        delivery_method: deliveryOptions.includes("standard") ? "Standard" : "Express",
        delivery_point_address: "",
        delivery_point_city: "",
        delivery_point_id: "",
        delivery_point_name: "",
        delivery_point_postcode: "",
        delivery_postcode: "postcode should be added to a form",
        delivery_price: 0,
        email: "email should be added to a form",
        extra_field_1: "",
        extra_field_2: "",
        invoice_address: "adress should be added to a form",
        invoice_city: body.CITY,
        invoice_company: "",
        invoice_country_code: getCountryCode(body),
        invoice_fullname: name,
        invoice_nip: "",
        invoice_postcode: "postcode should be added to a form",
        order_status_id: 166416,
        paid: 0,
        payment_method: body.paymentsystem,
        payment_method_cod: body.paymentsystem === "cash" ? 1 : 0,
        products: generateProducts(body),
        admin_comments: `orderId - ${body.payment.orderid}`,
        user_login: "",
        want_invoice: 0,
        user_comments: ""
    };
    return newOrderData;
}
exports.convertOrderParams = convertOrderParams;
function getCurrency(params) {
    switch (params.formid) {
        case "form526328071":
            return "PLN";
        default:
            throw new Error(`Error! Error with order ${params}.\n Please add validation to ${getCurrency.name} function with ${params.formid}`);
    }
}
function getCountryCode(params) {
    switch (params.formid) {
        case "form526328071":
            return "PL";
        default:
            throw new Error(`Error! Error with order ${params}.\n Please add validation to ${getCurrency.name} function with ${params.formid}`);
    }
}
function generateProducts(body) {
    const orderData = body.payment;
    let products = orderData.products.map(productData => {
        let attributes = productData.options ? productData.options.map(option => `${option.option} - ${option.variant}`).join(" ; ") : "";
        return {
            weight: 0,
            attributes,
            ean: "",
            location: "",
            name: productData.name,
            price_brutto: productData.price,
            product_id: "",
            quantity: productData.quantity,
            sku: productData.sku ? productData.sku : "",
            storage: "",
            storage_id: 0,
            tax_rate: 0,
            variant_id: 0,
            warehouse_id: 0
        };
    });
    try {
        const additionalProducts = generateAdditionalProductsArray(body.deliveryOptions).map(productData => {
            return {
                weight: 0,
                attributes: "",
                ean: "",
                location: "",
                name: productData[0],
                price_brutto: productData[1],
                product_id: "",
                quantity: 1,
                sku: "",
                storage: "",
                storage_id: 0,
                tax_rate: 0,
                variant_id: 0,
                warehouse_id: 0
            };
        });
        products = [...products, ...additionalProducts];
    }
    catch (e) {
        throw new Error(`Error! ${e.message}`);
    }
    return products;
}
function generateAdditionalProductsArray(deliveryOptions) {
    let [productsString, priceString] = deliveryOptions.split("=");
    let products = productsString.split(",").map(productName => {
        for (let additionalProductName of Object.keys(additionalProducts_1.additionalProducts)) {
            const additionalProduct = additionalProducts_1.additionalProducts[additionalProductName];
            if (additionalProduct.ProductTypeId === productName) {
                return [additionalProduct.ProductTitle, additionalProduct.ProductPrice];
            }
        }
        throw new Error(`Additional Products variable does not contain description for "${productName}"\n\nAdditional Products variable data - ${additionalProducts_1.additionalProducts}`);
    });
    return products;
}
// function checkPrices(productsArray: any[][], amount: number) {
//     const priceFromArray = productsArray.reduce( (prev, cur) => prev + cur[1] as number, 0);
//     if(priceFromArray !== amount) {
//         throw new Error();
//     }
// }
/*
    {"orderid":"2002769111","products":["Wyg??adzaj??cy &quot;gor??cy&quot; krem (hotcream)=375","Gor??cy peeling 129zl=129","Samoopalacz 129zl=129","Peeling do twarzy 79zl=79"],"amount":"817.3","subtotal":"712","delivery":"ubezpieczenie,niespodzianka,gwarancja,express,pobranie","delivery_price":105.3,"delivery_fio":"","delivery_address":"","delivery_comment":""}
*/
