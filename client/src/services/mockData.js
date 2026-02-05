/**
 * Mock video data for the application
 * In a real app, this would come from a backend API
 */

export const mockVideos = [
  {
    id: '1',
    title: 'Building a Full-Stack App with React and Node.js',
    description: 'Learn how to build a complete full-stack application using React for the frontend and Node.js with Express for the backend. We\'ll cover authentication, database integration, and deployment.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 1845, // in seconds
    views: 125000,
    likes: 8500,
    uploadDate: new Date('2024-01-15'),
    channel: {
      name: 'Code Masters',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMasters',
      subscribers: 250000
    },
    comments: [
      {
        id: 'c1',
        author: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        text: 'Great tutorial! Really helped me understand the concepts.',
        date: new Date('2024-01-16'),
        likes: 45
      },
      {
        id: 'c2',
        author: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        text: 'Could you make a follow-up video on testing?',
        date: new Date('2024-01-17'),
        likes: 23
      }
    ]
  },
  {
    id: '2',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    description: 'A comprehensive guide to understanding the differences between CSS Grid and Flexbox, and when to use each layout system in your projects.',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 920,
    views: 89000,
    likes: 5200,
    uploadDate: new Date('2024-01-20'),
    channel: {
      name: 'CSS Wizards',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CSSWizards',
      subscribers: 180000
    },
    comments: []
  },
  {
    id: '3',
    title: 'JavaScript ES6+ Features You Should Know',
    description: 'Explore modern JavaScript features including arrow functions, destructuring, spread operator, async/await, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 1560,
    views: 210000,
    likes: 12000,
    uploadDate: new Date('2024-01-10'),
    channel: {
      name: 'JS Academy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JSAcademy',
      subscribers: 450000
    },
    comments: []
  },
  {
    id: '4',
    title: 'Responsive Web Design Masterclass',
    description: 'Master responsive web design with mobile-first approach, media queries, and modern CSS techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 2340,
    views: 156000,
    likes: 9800,
    uploadDate: new Date('2024-01-25'),
    channel: {
      name: 'Design Pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignPro',
      subscribers: 320000
    },
    comments: []
  },
  {
    id: '5',
    title: 'Git and GitHub for Beginners',
    description: 'Complete guide to version control with Git and GitHub. Learn branching, merging, pull requests, and collaboration workflows.',
    thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 1680,
    views: 342000,
    likes: 18500,
    uploadDate: new Date('2024-01-05'),
    channel: {
      name: 'Dev Tools',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevTools',
      subscribers: 520000
    },
    comments: []
  },
  {
    id: '6',
    title: 'React Hooks Deep Dive',
    description: 'Everything you need to know about React Hooks: useState, useEffect, useContext, custom hooks, and best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: 2100,
    views: 198000,
    likes: 11200,
    uploadDate: new Date('2024-01-28'),
    channel: {
      name: 'React Experts',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ReactExperts',
      subscribers: 380000
    },
    comments: []
  },
  {
    id: '7',
    title: 'React Hooks Deep Dive',
    description: 'Everything you need to know about React Hooks: useState, useEffect, useContext, custom hooks, and best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: 2100,
    views: 198000,
    likes: 11200,
    uploadDate: new Date('2024-01-28'),
    channel: {
      name: 'React Experts',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ReactExperts',
      subscribers: 380000
    },
    comments: []
  }
];

/**
 * Simulate API delay
 */
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all videos
 */
export const getVideos = async () => {
  await delay();
  return [...mockVideos];
};

/**
 * Get video by ID
 */
export const getVideoById = async (id) => {
  await delay();
  return mockVideos.find(video => video.id === id);
};

/**
 * Search videos
 */
export const searchVideos = async (query) => {
  await delay();
  const lowerQuery = query.toLowerCase();
  return mockVideos.filter(video =>
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery)
  );
};
