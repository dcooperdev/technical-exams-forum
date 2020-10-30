export interface Like {
  user: string;
  createdDate: Date;
}

export interface Comment {
  user: string;
  comment: string;
  createdDate: Date;
}

export interface Publication {
  _id?: string;
  title: string;
  body: string;
  image: string;
  owner?: string;
  likes?: [
      Like
  ],
  comments?: [
      Comment
  ],
  published?: boolean;
  createdDate?: Date;
}
