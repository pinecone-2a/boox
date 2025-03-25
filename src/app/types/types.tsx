export type Book = {
    id: string|undefined;
    title: string;
    cover: string;
    author: string;
    genre: string;
    description: string;
    condition: string;
    ownerId: string|undefined;
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
    liked: boolean;
}