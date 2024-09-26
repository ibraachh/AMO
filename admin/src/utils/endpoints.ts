export const endpoints= {
    auth: {
        me: '/api/auth/me',
        signIn: '/api/auth/login',
      },

    sliderVideos:{
      list:"/api/video/list",
      create:"/api/video/create",
      delete:"/api/video/delete/"
    },
    getFile:{
      getByFileName:"api/file/getFile/"
    },
    media:{
      list:"/api/news/list",
      listAll:"/api/news/listAll",
      delete:"/api/news/delete/",
      getById:"/api/news/get/"
    },
    career:{
      list:"/api/career/list",
      listAll:"/api/career/listAll",
      getWithTranslation:"/api/career/getWithTranslation/",
      create:"/api/career/create",
      delete: "/api/career/delete/",
      getById:"/api/career/getWithTranslation/"
    },
    contact:{
      list:"/api/contact-info/list",
      create:"/api/contact-info/create",
      update:"/api/contact-info/"
    }
}