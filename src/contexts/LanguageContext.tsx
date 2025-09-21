import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ka' | 'en'; // Georgian (ka) and English (en)

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('ka'); // Georgian by default

  const t = (key: string): string => {
    const translation = translations[language] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation object
const translations = {
  ka: {
    // Site Meta
    'site.title': 'გრინსქეიფი – ბაღის ცენტრი და ლანდშაფტური დიზაინი',
    'site.description': 'გრინსქეიფი: ბაღის ცენტრი, ლანდშაფტური დიზაინი, დარგვა და სრული სერვისი ბაღის მოვლისთვის.',
    'brand.name': 'გრინსქეიფი',

    // Navigation
    'nav.about': 'ჩვენს შესახებ',
    'nav.services': 'სერვისები',
    'nav.contact': 'კონტაქტი',

    // Hero Section
    'hero.mission.title': 'გრინსქეიფი არის ჩვენი მისია — ჰარმონიაში გასვლა.',
    'hero.mission.subtitle': 'სადაც ბუნება ხდება სიმშვიდისა და ბალანსის წყარო.',
    'hero.cta.learn': 'გაიგე მეტი ჩვენ შესახებ',
    'hero.cta.contact': 'დაგვიკავშირდი დღესვე',

    // About Section
    'about.text': 'გრინსქეიფი შპს დაარსდა 2024 წელს, როგორც "გამცვანება 94" შპს-ისა და "ახალი გამცვანება" შპს-ის ქვეკომპანია. დამფუძნებელი კომპანიების ათწლეულების გამოცდილება ახლა კერძო სექტორში გადაიტანება.',

    // Why Choose Us Section
    'why.title': 'რატომ',
    'why.experience.title': 'წლების გამოცდილება',
    'why.experience.desc': 'ათწლეულების ცოდნა და პრაქტიკა.',
    'why.plants.title': 'კლიმატში ადაპტირებული მცენარეები',
    'why.plants.desc': 'ხარისხიანი მცენარეები, შერჩეული ადგილობრივი პირობებისთვის.',
    'why.service.title': 'სრული სერვისი',
    'why.service.desc': 'დიზაინი, მცენარეები და განხორციელება ერთ ადგილას.',
    'why.affordable.title': 'ხელმისაწვდომი და სასარგებლო',
    'why.affordable.desc': 'ხელმისაწვდომი ფასები და უფასო კონსულტაცია.',

    // Services Section
    'services.showroom.title': 'შოურუმი',
    'services.showroom.bullets.1': 'ორნამენტული მცენარეების მრავალფეროვანი არჩევანი.',
    'services.showroom.bullets.2': 'კლიმატში ადაპტირებული მცენარეები.',
    'services.showroom.bullets.3': 'ქოთნებსა და ძირებზე ნერგები – გადანერგვა წლის ნებისმიერ დროს.',
    'services.showroom.bullets.4': 'იმპორტირებული და ადგილობრივი მცენარეები.',
    'services.showroom.bullets.5': 'ხელმისაწვდომი ფასები და გარანტირებული ხარისხი.',

    'services.design.title': 'ლანდშაფტური დიზაინი',
    'services.design.text': 'ჩვენ ვქმნით ლანდშაფტურ დიზაინს, რომელიც მორგებულია თქვენს გემოვნებაზე, აბალანსებს ესთეტიკასა და ფუნქციონალობას. 3D ვიზუალიზაციით შეგიძლიათ წინასწარ ნახოთ თქვენი მომავალი ბაღი.',
    'services.design.cta': 'გაიგეთ, როგორ იმუშავებს ჩვენი დიზაინერი თქვენს პროექტზე',

    'services.planting.title': 'დარგვა და მოვლა',
    'services.planting.checklist.1': 'ნიადაგის მომზადება და ნაყოფიერი მიწის დამატება.',
    'services.planting.checklist.2': 'ბილიკები, კიბეები, პერგოლები, ქოთნები.',
    'services.planting.checklist.3': 'მორწყვისა და ავტომატური მორწყვის სისტემები.',
    'services.planting.checklist.4': 'მცენარეების დარგვა და დამაგრება.',
    'services.planting.checklist.5': 'ბალახოვნების გაშლა და მწვანე საფარის შექმნა.',

    // Contact Section
    'contact.title': 'კონტაქტი',
    'contact.address.label': 'მისამართი',
    'contact.info.label': 'საკონტაქტო ინფორმაცია',
    'contact.hours.label': 'სამუშაო საათები',
    'contact.address': 'თბილისი, ივერთუბანი, მახათას აღმართი',
    'contact.hours': 'ორშაბათი – შაბათი (09:00 – 18:00)',

    // Contact Form
    'contact.form.name': 'სახელი',
    'contact.form.phone': 'ტელეფონი',
    'contact.form.message': 'შეტყობინება',
    'contact.form.name.placeholder': 'თქვენი სახელი',
    'contact.form.phone.placeholder': 'თქვენი ტელეფონის ნომერი',
    'contact.form.message.placeholder': 'როგორ შეგვიძლია დაგეხმაროთ?',
    'contact.form.send': 'გაგზავნა',
    'contact.form.thanks': 'გმადლობთ! ჩვენ მალე დაგიკავშირდებით.',

    // Social Labels
    'social.facebook': 'ფეისბუქი',
    'social.instagram': 'ინსტაგრამი',
    'social.tiktok': 'ტიქტოქი',

    // Footer
    'footer.tagline': 'ბაღის ცენტრი და ლანდშაფტური დიზაინი',
    'footer.explore': 'გამოიკვლიეთ',
    'footer.rights': 'ყველა უფლება დაცულია.',

    // Language Switcher
    'language.georgian': 'ქართული',
    'language.english': 'English',
  },
  en: {
    // Site Meta
    'site.title': 'Greenscape – Garden Center & Landscape Design',
    'site.description': 'Greenscape: Garden Center, Landscape Design, Planting, and Full-Service Garden Solutions.',
    'brand.name': 'Greenscape',

    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.mission.title': 'Greenscape is our mission — an escape into harmony.',
    'hero.mission.subtitle': 'Where nature becomes a source of calm and balance.',
    'hero.cta.learn': 'Learn More About Us',
    'hero.cta.contact': 'Contact Us Today',

    // About Section
    'about.text': 'Greenscape LLC was founded in 2024 as a subsidiary of Gamzvaneba 94 LLC and Akhali Gamzvaneba LLC. The decades of experience from the founding companies are now being transferred to the private sector.',

    // Why Choose Us Section
    'why.title': 'Why',
    'why.experience.title': 'Years of Experience',
    'why.experience.desc': 'Decades of knowledge and practice.',
    'why.plants.title': 'Climate-Adapted Plants',
    'why.plants.desc': 'Quality plants selected for local conditions.',
    'why.service.title': 'Full Service Cycle',
    'why.service.desc': 'Design, plants, and execution in one place.',
    'why.affordable.title': 'Affordable & Helpful',
    'why.affordable.desc': 'Affordable prices and free consultation.',

    // Services Section
    'services.showroom.title': 'Showroom',
    'services.showroom.bullets.1': 'Diverse selection of ornamental plants.',
    'services.showroom.bullets.2': 'Climate-adapted plants.',
    'services.showroom.bullets.3': 'Potted and rooted seedlings – transplant any time of year.',
    'services.showroom.bullets.4': 'Imported and local plants.',
    'services.showroom.bullets.5': 'Affordable prices and guaranteed quality.',

    'services.design.title': 'Landscape Design',
    'services.design.text': 'We create landscape designs tailored to your taste, balancing aesthetics and function. With 3D visualization, you can see your future garden in advance.',
    'services.design.cta': 'Find Out How Our Designer Will Work on Your Project',

    'services.planting.title': 'Planting & Care',
    'services.planting.checklist.1': 'Soil preparation and addition of fertile earth.',
    'services.planting.checklist.2': 'Paths, stairs, pergolas, pots.',
    'services.planting.checklist.3': 'Irrigation and automated watering systems.',
    'services.planting.checklist.4': 'Planting and securing plants.',
    'services.planting.checklist.5': 'Laying sod and creating green cover.',

    // Contact Section
    'contact.title': 'Contact',
    'contact.address.label': 'Address',
    'contact.info.label': 'Contact Information',
    'contact.hours.label': 'Working Hours',
    'contact.address': 'Tbilisi, Ivertubani, Makhata\'s Rise',
    'contact.hours': 'Monday – Saturday (09:00 – 18:00)',

    // Contact Form
    'contact.form.name': 'Name',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.name.placeholder': 'Your name',
    'contact.form.phone.placeholder': 'Your phone number',
    'contact.form.message.placeholder': 'How can we help?',
    'contact.form.send': 'Send',
    'contact.form.thanks': 'Thanks! We will contact you shortly.',

    // Social Labels
    'social.facebook': 'Facebook',
    'social.instagram': 'Instagram',
    'social.tiktok': 'TikTok',

    // Footer
    'footer.tagline': 'Garden Center & Landscape Design',
    'footer.explore': 'Explore',
    'footer.rights': 'All rights reserved.',

    // Language Switcher
    'language.georgian': 'ქართული',
    'language.english': 'English',
  }
};