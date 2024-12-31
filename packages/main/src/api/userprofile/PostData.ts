import { PostType } from '../../types/apps/userProfile';
import { Chance } from 'chance';
import user2 from '/src/assets/images/profile/user-2.jpg';
import user3 from '/src/assets/images/profile/user-3.jpg';
import user4 from '/src/assets/images/profile/user-4.jpg';
import user5 from '/src/assets/images/profile/user-5.jpg';
import user6 from '/src/assets/images/profile/user-6.jpg';
import user10 from "/src/assets/images/profile/user-10.jpg";

import s1 from '/src/assets/images/products/s1.jpg';
import s2 from '/src/assets/images/products/s2.jpg';
import s4 from '/src/assets/images/products/s4.jpg';

const chance = new Chance();

// social profile
const posts: PostType[] = [
  {
    id: chance.integer({ min: 1, max: 2000 }),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: user10,
      name: 'Nirav Joshi',
      time: '15 min ago',
    },
    data: {
      content: chance.paragraph({ sentences: 2 }),
      images: [
        {
          img: s1,
          featured: true,
        },
      ],
      likes: {
        like: true,
        value: 67,
      },
      comments: [
        {
          id: chance.integer({ min: 1, max: 2000 }),
          profile: {
            id: chance.integer({ min: 1, max: 2000 }),
            avatar: user3,
            name: 'Deran Mac',
            time: '8 min ago ',
          },
          data: {
            comment: chance.paragraph({ sentences: 2 }),
            likes: {
              like: true,
              value: 55,
            },
            replies: [],
          },
        },
        {
          id: chance.integer({ min: 1, max: 2000 }),
          profile: {
            id: chance.integer({ min: 1, max: 2000 }),
            avatar: user4,
            name: 'Jonathan Bg',
            time: '5 min ago ',
          },
          data: {
            comment: chance.paragraph({ sentences: 2 }),
            likes: {
              like: false,
              value: 68,
            },
            replies: [
              {
                id: chance.integer({ min: 1, max: 2000 }),
                profile: {
                  id: chance.integer({ min: 1, max: 2000 }),
                  avatar: user5,
                  name: 'Carry minati',
                  time: 'just now ',
                },
                data: {
                  comment: chance.paragraph({ sentences: 2 }),
                  likes: {
                    like: true,
                    value: 10,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: user5,
      name: 'Carry Minati',
      time: 'now',
    },
    data: {
      content: chance.paragraph({ sentences: 2 }),
      images: [],
      likes: {
        like: true,
        value: 1,
      },
      comments: [],
    },
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: user2,
      name: 'Genelia Desouza',
      time: '15 min ago ',
    },
    data: {
      content: chance.paragraph({ sentences: 2 }),
      images: [
        {
          img: s2,
          title: 'Image Title',
        },
        {
          img: s4,
          title: 'Painter',
        },
      ],
      likes: {
        like: false,
        value: 320,
      },
      comments: [
        {
          id: chance.integer({ min: 1, max: 2000 }),
          profile: {
            id: chance.integer({ min: 1, max: 2000 }),
            avatar: user3,
            name: 'Ritesh Deshmukh',
            time: '15 min ago ',
          },
          data: {
            comment: chance.paragraph({ sentences: 2 }),
            likes: {
              like: true,
              value: 65,
            },
            replies: [],
          },
        },
      ],
    },
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: user6,
      name: 'Himesh R',
      time: '15 min ago ',
    },
    data: {
      content: chance.paragraph({ sentences: 2 }),
      images: [],
      video: 'ejqFyft90zQ?si=1TxNRUpR7HAxcrqY',
      likes: {
        like: true,
        value: 129,
      },
    },
  },
];




export default posts;
