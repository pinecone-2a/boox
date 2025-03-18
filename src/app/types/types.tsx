export type Book = {
    id: String;
    title: String;
    cover: String;
    author: String;
    genre: String;
    condition: String;
    ownerId: String;
}
export type User = {
    id: String;
    name: String;
    email: String;
}
export type Swipe = {
    id: String;
    bookId: String;
    userId: String;
    liked: Boolean;
}
export type Match = {
    id: String;
    like1Id: String;
    like2Id: String;
    status: String;
}