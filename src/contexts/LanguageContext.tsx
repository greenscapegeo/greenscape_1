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
    'nav.projects': 'პროექტები',
    'nav.contact': 'კონტაქტი',

    // Hero Section
    'hero.mission.title': 'გრინსქეიფი - ბუნებასთან ჰარმონიაში',
    'hero.cta.learn': 'გაიგე მეტი ჩვენ შესახებ',
    'hero.cta.contact': 'დაგვიკავშირდი დღესვე',

    // About Section
    'about.text': 'შპს „გრინსქეიფი" დაარსდა 2024 წელს, როგორც შპს „გამწვანება 94"-ისა და შპს „ახალი გამწვანება"-ს შვილობილი კომპანია. დამფუძნებელი კომპანიების, ათწლეულების გამოცდილება „გრინსქეიფს" აძლევს შესაძლებლობას, კერძო სექტორს შესთავაზოს მაღალი ხარისხის სერვისები და დაამკვიდროს ახალი სტანდარტი ბაღის მოწყობისა და ლანდშაფტის დიზაინის სფეროში.',

    // Why Choose Us Section
    'why.title': 'რატომ გრინსქეიფი?',
    'why.experience.title': 'წლების გამოცდილება',
    'why.experience.desc': 'ათწლეულების ცოდნა და პრაქტიკა.',
    'why.plants.title': 'მცენარეების მრავალფეროვანი არჩევანი',
    'why.plants.desc': 'ხარისხიანი და კლიმატს მორგებული მცენარეები.',
    'why.service.title': 'სრული სერვისი',
    'why.service.desc': 'ლანდშაფტის დიზაინი, მცენარეების შერჩევა და შესრულება ერთ სივრცეში.',
    'why.affordable.title': 'ხელმისაწვდომი ფასები',
    'why.affordable.desc': 'ხელმისაწვდომი ფასები და უფასო კონსულტაცია.',

    // Services Section
    'services.showroom.title': 'შოურუმი',
    'services.showroom.bullets.1': 'ორნამენტული მცენარეების მრავალფეროვანი არჩევანი.',
    'services.showroom.bullets.2': 'კლიმატზე ადაპტირებული მცენარეები.',
    'services.showroom.bullets.3': 'ქოთნებში გაზრდილი და დაფესვიანებული ნერგები.',
    'services.showroom.bullets.4': 'იმპორტირებული და ადგილობრივი მცენარეები.',
    'services.showroom.bullets.5': 'ხელმისაწვდომი ფასები და გარანტირებული ხარისხი.',
    'services.showroom.catalogue': 'კატალოგი',

    'services.design.title': 'ლანდშაფტის დიზაინი',
    'services.design.text': 'ჩვენ ვქმნით თქვენს გემოვნებაზე მორგებულ ლანდშაფტის დიზაინს, რომელიც ითვალისწინებს როგორც ესთეტიკას, ისე ფუნქციონალს. თანამედროვე 3D ვიზუალიზაციით შეგიძლიათ წინასწარ იხილოთ, როგორ გარდაიქმნება თქვენი სივრცე — იდეიდან დასრულებულ ბაღამდე.',
    'services.design.cta': 'გაიგეთ, როგორ იმუშავებს ჩვენი დიზაინერი თქვენს პროექტზე',

    'services.planting.title': 'ლანდშაფტის მოწყობა და გამწვანება',
    'services.planting.checklist.1': 'ნიადაგის მომზადება და ნოყიერი მიწის შეტანა/გაშლა.',
    'services.planting.checklist.2': 'მსუბუქი კონსტრუქციების მონტაჟი (ბილიკები, კიბეები, პერგოლები, ქოთნები და სხვა).',
    'services.planting.checklist.3': 'სადრენაჟე სისტემების მოწყობა.',
    'services.planting.checklist.4': 'ავტომატიზირებული სარწყავი სისტემების ინსტალაცია.',
    'services.planting.checklist.5': 'მცენარეების დარგვა და გამაგრებითი სამუშაოები.',
    'services.planting.checklist.6': 'ბალახის დაგება და მწვანე საფარის მოწყობა.',

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
    'social.tiktok': 'ტიკტოკი',

    // Footer
    'footer.tagline': 'ბაღის ცენტრი და ლანდშაფტური დიზაინი',
    'footer.explore': 'გამოიკვლიეთ',
    'footer.rights': 'ყველა უფლება დაცულია.',

    // Gallery Section
    'gallery.title': 'ჩვენი პროექტები',
    'gallery.subtitle': 'გაეცანით ჩვენს შესრულებულ ლანდშაფტურ და ბაღის პროექტებს',
    'gallery.photos': 'ფოტო',
    'gallery.back': '← დაბრუნება პროექტებზე',
    'gallery.project.kiketi': 'კიკეთი',
    'gallery.project.lisi': 'ლისი',
    'gallery.project.saguramo': 'საგურამო',
    'gallery.project.shindisi': 'შინდისი',

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
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.mission.title': 'Greenscape  In harmony with nature',
    'hero.cta.learn': 'Learn More About Us',
    'hero.cta.contact': 'Contact Us Today',

    // About Section
    'about.text': 'LLC "Greenscape" was founded in 2024 as a subsidiary of LLC "Gamtsvaneba 94" and LLC "Akhali Gamtsvaneba". The decades of experience of its founding companies enables "Greenscape" to offer the private sector high-quality services and to establish a new standard in garden development and landscape design.',

    // Why Choose Us Section
    'why.title': 'Why Greenscape?',
    'why.experience.title': 'Years of Experience',
    'why.experience.desc': 'Decades of knowledge and practice.',
    'why.plants.title': 'Wide Variety of Plants',
    'why.plants.desc': 'High-quality, climate-adapted plants.',
    'why.service.title': 'Full Service',
    'why.service.desc': 'Landscape design, plant selection, and implementation all in one place.',
    'why.affordable.title': 'Affordable Prices',
    'why.affordable.desc': 'Competitive prices and free consultation.',

    // Services Section
    'services.showroom.title': 'Showroom',
    'services.showroom.bullets.1': 'A wide selection of ornamental plants.',
    'services.showroom.bullets.2': 'Climate-adapted varieties.',
    'services.showroom.bullets.3': 'Potted and well-rooted seedlings.',
    'services.showroom.bullets.4': 'Imported and locally grown plants.',
    'services.showroom.bullets.5': 'Affordable prices and guaranteed quality.',
    'services.showroom.catalogue': 'Catalogue',

    'services.design.title': 'Landscape Design',
    'services.design.text': 'We create landscape designs tailored to your taste, taking into account both aesthetics and functionality. With modern 3D visualization, you can preview how your space will transform — from concept to a completed garden.',
    'services.design.cta': 'Find Out How Our Designer Will Work on Your Project',

    'services.planting.title': 'Landscaping Services',
    'services.planting.checklist.1': 'Soil preparation and application.',
    'services.planting.checklist.2': 'Installation of light constructions (pathways, stairs, pergolas, pots, and more).',
    'services.planting.checklist.3': 'Drainage system installation.',
    'services.planting.checklist.4': 'Automated irrigation system installation.',
    'services.planting.checklist.5': 'Planting and reinforcement works.',
    'services.planting.checklist.6': 'Lawn arrangement.',

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

    // Gallery Section
    'gallery.title': 'Our Projects',
    'gallery.subtitle': 'Explore our completed landscape and garden projects',
    'gallery.photos': 'photos',
    'gallery.back': '← Back to Projects',
    'gallery.project.kiketi': 'Kiketi',
    'gallery.project.lisi': 'Lisi',
    'gallery.project.saguramo': 'Saguramo',
    'gallery.project.shindisi': 'Shindisi',

    // Language Switcher
    'language.georgian': 'ქართული',
    'language.english': 'English',
  }
};
