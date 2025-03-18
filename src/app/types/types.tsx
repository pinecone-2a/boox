export type Book = {
    id: string;
    title: string;
    cover: string;
    author: string;
    genre: string;
    description: string;
    condition: string;
    ownerId: string;
}
export type User = {
    id: string;
    name: string;
    email: string;
}
export type Swipe = {
    id: string;
    bookId: string;
    userId: string;
    liked: Boolean;
}
export type Match = {
    id: string;
    like1Id: string;
    like2Id: string;
    status: string;
}