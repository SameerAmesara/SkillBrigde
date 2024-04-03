export interface User {
  id: string;
  name: string;
}

export interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  imageUrl: string;
  ratings: string;
  bio: string;
  email: string;
  phoneNumber: string;
  experience: string;
  pay: string;
  expertise: string;
  resume: string;
  availability: string;
  termsAccepted: string;
}

export type NewMentor = Partial<Mentor>;
export interface UserDetails {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  dob: Date;
  profession: string;
  companyName: string;
  stripeCustomerId: string;
}

export interface DiscussionReply {
  id: string;
  userId: string;
  replyText: string;
  timestamp: Date;
  userName?: string;
  userImage?: string;
}

export interface NewDiscussionReply {
  userId: string;
  replyText: string;
}

export interface Discussion {
  id: string;
  title: string;
  userId: string;
  content: string;
  tags: string[];
  timestamp: Date;
  likedBy: string[];
  dislikedBy: string[];
  replies: DiscussionReply[];
  userName: string;
  userImage: string;
}

export interface DiscussionSearchAndFilter {
  searchText: string;
  sortBy: DiscussionSortByOptions;
}

export interface NewDiscussion {
  title: string;
  userId: string;
  content: string;
  tags: string[];
}

export type DiscussionSortByOptions = "newest" | "oldest" | "mostLiked";

export type NewUser = Omit<UserDetails, "id">;

export interface Transaction {
  id: string;
  amount: number;
  userId: string;
  stripeTransactionId: string;
  paymentMethodId: string;
  description: string;
  createdAt: Date;
}
