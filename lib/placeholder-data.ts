export const users = [
  {
    id: "user1",
    name: "ゆう",
    email: "yuu@nextmail.com",
    password: "password1",
    icon: "/public/icons/S__27050004.jpge",
    birthday: "1990/04/02",
  },
  {
    id: "user2",
    name: "すずき",
    email: "suzuki@nextmail.com",
    password: "password2",
    icon: "/public/icons/...",
    birthday: "2000/06/15",
  },
  {
    id: "abcd",
    name: "abcd",
    email: "abcd@nextmail.com",
    password: "password",
    icon: "/public/icons/...",
    birthday: "2000/01/01",
  },
  {
    id: "test-1",
    name: "test-1",
    email: "test-1@nextmail.com",
    password: "password",
    icon: "/public/icons/...",
    birthday: "2000/01/01",
  },
  {
    id: "test-2",
    name: "test-2",
    email: "test-2@nextmail.com",
    password: "password",
    icon: "/public/icons/...",
    birthday: "2000/01/01",
  },
  {
    id: "cdab",
    name: "cdab",
    email: "cdab@nextmail.com",
    password: "password",
    icon: "/public/icons/...",
    birthday: "2000/01/01",
  },
];

export const fellow_travelers = [
  {
    id: 1,
    user_id: "user1",
    fellow_id: "user2",
  },
];

export const tripboards_users = [
  {
    id: 1,
    user_id: "user1",
    board_id: "trip1",
  },
];

export const trip_boards = [
  {
    id: "trip1",
    title: "1の旅行",
    startday: "2024-05-03",
    endday: "2024-05-05",
    thumbnail: "/public/images/...",
    owner_id: "user1",
    last_update: "2024-05-09T00:00:00Z",
  },
];

export const trip_cards = [
  {
    id: "card1",
    board_id: "trip1",
    memo: "温泉気持ちよかった〜",
    thumbnail_id: 1,
    location_point: { x: 36.3564, y: 138.6178 },
  },
];

export const card_pictures = [
  {
    id: "picture1",
    card_id: "card1",
    picture: "/public/images/2832_10_l.jpg",
    photo_date: "2024-05-04",
  },
];
