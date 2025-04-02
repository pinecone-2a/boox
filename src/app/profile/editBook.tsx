import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Book } from "../types/types";

const Condition = ["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"];
const Genre = [
  "FICTION",
  "NON_FICTION",
  "MYSTERY",
  "THRILLER",
  "ROMANCE",
  "SCIENCE",
  "FANTASY",
  "HORROR",
  "BIOGRAPHY",
  "HISTORY",
  "SELF_HELP",
  "CHILDREN",
];

export const EditBook = ({ id }: { id: string }) => {
  const { user } = useUser();
  const [book, setBook] = useState<Book | null>(null);
  const [localCover, setLocalCover] = useState<File | null>(null);

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`/api/books/singlebook?id=${id}`);
      const data = await res.json();
      setBook(data);
    }
    fetchBook();
  }, [id]);
  console.log(book);
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload-cover");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/duyu7drmj/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalCover(file); // Store file for later upload
      setBook((prevBook) =>
        prevBook ? { ...prevBook, cover: URL.createObjectURL(file) } : null
      );
    }
  };

  const editBook = async (formData: FormData) => {
    if (!book) return;

    let coverUrl = book.cover;
    if (localCover) {
      coverUrl = await uploadImageToCloudinary(localCover);
    }
    console.log(coverUrl);
    console.log(uploadImageToCloudinary);
    const updatedBook = {
      id,
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      genre: formData.get("genre") as string,
      description: formData.get("description") as string,
      condition: formData.get("condition") as string,
      cover: coverUrl,
    };

    await fetch("/api/books/singlebook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });
    window.location.reload();
  };

  if (!book) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full p-[10px] w-10 h-10">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6 p-6">
        <DialogHeader className="pb-4 grid gap-4">
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form action={editBook}>
          <div className="flex gap-6 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Book Name</Label>
              <Input
                id="title"
                name="title"
                defaultValue={book.title}
                type="text"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                defaultValue={book.author}
                type="text"
              />
            </div>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="genre">Genre</Label>
              <select
                id="genre"
                name="genre"
                className="border rounded-md py-2 px-1"
                defaultValue={book.genre}
              >
                {Genre.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="condition">Condition</Label>
              <select
                id="condition"
                name="condition"
                className="border rounded-md py-2 px-1"
                defaultValue={book.condition}
              >
                {Condition.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1.5 mb-4">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="border rounded-md py-2 px-4 text-sm font-normal"
              defaultValue={book.description}
            ></textarea>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <h1 className="text-sm">Book Image</h1>
            {book.cover ? (
              <div
                className="bg-contain bg-no-repeat bg-center rounded-md h-[138px]"
                style={{ backgroundImage: `url(${book.cover})` }}
              ></div>
            ) : (
              <Label
                htmlFor="image"
                className="h-[138px] border border-dashed rounded-md bg-blue-50 flex flex-col items-center justify-center p-4 gap-2 cursor-pointer"
              >
                <div className="rounded-full p-2 bg-background">
                  <Image />
                </div>
                <h3 className="text-sm cursor-pointer">
                  Choose a file or drag & drop it here
                </h3>
              </Label>
            )}

            <Input
              id="image"
              name="image"
              type="file"
              className=""
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button type="submit">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
