import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to my website",
      change_language: "Change Language",
      professionals: "Professionals",
      looking_for_help: "Are you looking for someone to help you?",
      description: "Through this site, you can search for work by applying for the projects offered, or you can present a problem you have so that one of the experts can help you.",
      home: "Home",
      about: "About",
      workers: "Workers",
      Posts: "Posts",
      contact: "Contact",
      more: "more",
      address: "Hiafa Street, Jenin, Palestine",
      allPosts: "All Posts"
    }
  },
  ar: {
    translation: {
      welcome: "مرحبًا بك في موقعي",
      change_language: "تغيير اللغة",
      professionals: "المحترفون",
      looking_for_help: "هل تبحث عن شخص لمساعدتك؟",
      description: "    بامكانك من خلال هذا الموقع البحث عن عمل من خلال التقديم على المشاريع المعروضة,او بامكانك عرض مشكلة لديك ليقوم احد الخبراء بمساعدتك",
      home: "الرئيسية",
      about: "من نحن",
      workers: "العمال",
      Posts: "المنشورات",
      contact: "اتصل بنا",
      more:"المزيد",
      address:"شارع حيفا، جنين، فلسطين",
      allPosts:"جميع المنشورات"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
