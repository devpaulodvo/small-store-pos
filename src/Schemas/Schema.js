import * as Yup from 'yup';


// export let RegisterSchema = Yup.object().shape({
//     username: Yup.string().min(5, "Username must be 5 characters long").required('Required Username')
    // .test("is_exists", null, (value)=>{
    //     return new Promise((resolve, reject)=>{
    //         try{
    //            if(value.length!==0){
    //                 resolve(false)
    //             }
    //             else{
    //                 resolve(true)
    //             }
    //         }catch(err){
    //             return;
    //         }
           
    //     })
    // })
    // 
//     ,
//     password: Yup.string().min(6, "Must be 6 or more characters").required('Required Password'),
//     cpassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required Confirm Password')
// });

export let LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required Username'),
    password: Yup.string().required("Required password")
})

export let AddProductSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is Required'),
    price: Yup.number('Number only').required('Price is Required')
})