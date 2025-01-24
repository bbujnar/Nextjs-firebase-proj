(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[513],{1376:(e,s,a)=>{Promise.resolve().then(a.bind(a,5037))},5037:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>d});var r=a(5155),l=a(9606),t=a(4565),i=a(7982),o=a(2115),n=a(6046);let d=function(){var e,s;let{register:a,handleSubmit:d,formState:{errors:m}}=(0,l.mN)(),[c,u]=(0,o.useState)(""),x=(0,n.useRouter)();return(0,r.jsx)("section",{className:"bg-white",children:(0,r.jsxs)("div",{className:"lg:grid lg:min-h-screen lg:grid-cols-12",children:[(0,r.jsx)("aside",{className:"relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6",children:(0,r.jsx)("img",{alt:"Login background",src:"https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",className:"absolute inset-0 h-full w-full object-cover",width:200,height:200})}),(0,r.jsx)("main",{className:"flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6",children:(0,r.jsxs)("div",{className:"max-w-xl lg:max-w-3xl",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl",children:"Login to app"}),(0,r.jsx)("p",{className:"mt-4 leading-relaxed text-gray-500",children:"Please log in to access your account."}),c&&(0,r.jsx)("div",{className:"mt-4 text-red-500 bg-red-100 p-4 rounded-md",children:c}),(0,r.jsxs)("form",{onSubmit:d(e=>{(0,t.oM)(i.j,t.iM).then(()=>(0,t.x9)(i.j,e.email,e.password).then(e=>{let s=e.user;if(!s.emailVerified){u("Email not verified. Please check your email."),x.push("/user/verify");return}console.log("User logged in:",s),u(""),x.push("/user/profile")}).catch(e=>{console.error("Error during login:",e.message),u("Invalid email or password.")})).catch(e=>{console.error("Error setting persistence:",e.message),u("An unexpected error occurred. Please try again later.")})}),className:"mt-8 grid grid-cols-6 gap-6",children:[(0,r.jsxs)("div",{className:"col-span-6",children:[(0,r.jsx)("label",{htmlFor:"Email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,r.jsx)("input",{...a("email",{required:"Email is required",pattern:{value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"Invalid email format"}}),type:"email",id:"Email",name:"email",className:"mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"}),(0,r.jsx)("p",{className:"text-red-500",children:null===(e=m.email)||void 0===e?void 0:e.message})]}),(0,r.jsxs)("div",{className:"col-span-6 sm:col-span-3",children:[(0,r.jsx)("label",{htmlFor:"Password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,r.jsx)("input",{...a("password",{required:"Password is required",minLength:{value:6,message:"Password must be at least 6 characters"}}),type:"password",id:"Password",name:"password",className:"mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"}),(0,r.jsx)("p",{className:"text-red-500",children:null===(s=m.password)||void 0===s?void 0:s.message})]}),(0,r.jsx)("div",{className:"col-span-6 sm:flex sm:items-center sm:gap-4",children:(0,r.jsx)("button",{type:"submit",className:"inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500",children:"Login"})})]})]})})]})})}},7982:(e,s,a)=>{"use strict";a.d(s,{db:()=>n,j:()=>o});var r=a(9904),l=a(4565),t=a(7058);let i=(0,r.Wp)({apiKey:"AIzaSyABs8ZIhbsAPFm8PqfE-v_kqVFvM8Fv4kU",authDomain:"frontend-app-wsei.firebaseapp.com",projectId:"frontend-app-wsei",storageBucket:"frontend-app-wsei.firebasestorage.app",messagingSenderId:"193371263244",appId:"1:193371263244:web:6ba3fa9cf180e5079bb929",measurementId:"G-7M1R3618T9"}),o=(0,l.xI)(i),n=(0,t.aU)(i)}},e=>{var s=s=>e(e.s=s);e.O(0,[697,992,512,778,533,441,517,358],()=>s(1376)),_N_E=e.O()}]);