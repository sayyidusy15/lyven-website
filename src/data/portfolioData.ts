// 1. Kita definisikan Tipe Datanya di sini agar bisa dipakai di mana saja
export interface Technology {
  name: string;
  logo: string;
}

export interface PortfolioItem {
  image: string;
  companyLogo: string;
  title: string;
  categories: string[];
  technologies: Technology[];
  link: string;
}

// 2. Ini Datanya (Satu sumber untuk semua halaman)
export const portfolioData: PortfolioItem[] = [
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['Streaming', 'VOD'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'Tech 3', logo: '/assets/img/tech_portfolio4.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_3.jpg',
    companyLogo: '/assets/img/brand_6.svg',
    title: 'MRT Jakarta',
    categories: ['Transport', 'App'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_2.jpg',
    companyLogo: '/assets/img/brand_4.svg',
    title: 'NBS TV',
    categories: ['News', 'Live'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_2.jpg',
    companyLogo: '/assets/img/brand_4.svg',
    title: 'NBS TV',
    categories: ['News', 'Live'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_2.jpg',
    companyLogo: '/assets/img/brand_4.svg',
    title: 'NBS TV',
    categories: ['News', 'Live'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_2.jpg',
    companyLogo: '/assets/img/brand_4.svg',
    title: 'NBS TV',
    categories: ['News', 'Live'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  // ... Tambahkan data lainnya di sini ...
];