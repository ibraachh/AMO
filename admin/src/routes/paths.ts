// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: {
      root:`${ROOTS.DASHBOARD}/home`,
      list:`${ROOTS.DASHBOARD}/home/list`,
      createSliderVideo:`${ROOTS.DASHBOARD}/home/create-slider-video`,
    },
    about: {
      root: `${ROOTS.DASHBOARD}/about`,
      main: `${ROOTS.DASHBOARD}/about/main`,
      cardEdit:(id:string)=> `${ROOTS.DASHBOARD}/about/card-edit/${id}`,
      secondCardEdit:(id:string)=> `${ROOTS.DASHBOARD}/about/second-card-edit/${id}`,
      history: `${ROOTS.DASHBOARD}/about/history`,
      timeLineCardEdit:(id:string)=> `${ROOTS.DASHBOARD}/about/history/timeline-card-edit/${id}`,
      timeLineCardCreate: `${ROOTS.DASHBOARD}/about/history/timeline-card-create`,
      founderMessage: `${ROOTS.DASHBOARD}/about/founder-message`,
    },
    companies:{
      root: `${ROOTS.DASHBOARD}/companies`,
      editCard:(id:string)=>`${ROOTS.DASHBOARD}/companies/edit-card/${id}`,
      editGrowCard:(id:string)=>`${ROOTS.DASHBOARD}/companies/edit-grow-card/${id}`,
      editAmodoCard:(id:string)=>`${ROOTS.DASHBOARD}/companies/edit-amodo-card/${id}`,
      createCard:`${ROOTS.DASHBOARD}/companies/create-card`,
      amoTransportEdit:(id:string)=>`${ROOTS.DASHBOARD}/companies/amo-transport-edit/${id}`,
    },
    mediaCenter:{
      root: `${ROOTS.DASHBOARD}/media-center`,
      list:`${ROOTS.DASHBOARD}/media-center/list`,
      create:`${ROOTS.DASHBOARD}/media-center/create`,
      edit:(id:string)=>`${ROOTS.DASHBOARD}/media-center/edit/${id}`,
    },
    career:{
      root: `${ROOTS.DASHBOARD}/career/list`,
      create:`${ROOTS.DASHBOARD}/career/create`,
      edit:(id:string)=>`${ROOTS.DASHBOARD}/career/edit/${id}`,
    },
    contact:{
      root: `${ROOTS.DASHBOARD}/contact/list`,
      edit:`${ROOTS.DASHBOARD}/contact/edit`,
    },

  },
};
