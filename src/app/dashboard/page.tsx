interface Book {
  image: string;
}

interface BookSectionProps {
  sectionName: string;
  bookList: Book[];
}

export default function BookLists() {
  const wishlistBooks: Book[] = [
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
  ];

  const matchesBooks: Book[] = [
    { image: "image 8.jpg" },
    { image: "image 9.png" },
    { image: "image 10.png" },
    { image: "image 11.png" },
    { image: "image 12.png" },
  ];

  return (
    <div className="p-6">
      <BookSection sectionName="Wishlist" bookList={wishlistBooks} />
      <BookSection sectionName="Matches" bookList={matchesBooks} />
    </div>
  );
}

function BookSection({ sectionName, bookList }: BookSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{sectionName}</h2>
      <div className="w-[377px] h-[112px] flex gap-4 p-4 bg-yellow-400 rounded-2xl">
        {bookList.map((book: Book, index: number) => (
          <div key={index}>
            <img
              src={book.image}
              alt={`${sectionName} book ${index + 1}`}
              className="w-[64px] h-[99px] object-cover rounded-xl shadow-lg mt-[-10px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
