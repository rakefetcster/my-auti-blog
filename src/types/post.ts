export interface Post {
  _id?: string;
  title: string;
  headline: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  readingTime: string;
  language: string;
}
export interface PostFormData {
  _id: string;
  headline: string;
  content: string;
  category: string;
  summary: string;
  date: string;
  readingTime: string;
}

export interface PostCardProps {
  post: {
    _id: string;
    title: string;
    summary: string;
    content: string;
    date: string;
    category: string;
    readingTime: string;
  };
  bgColor: string;
  icon: string;
}
