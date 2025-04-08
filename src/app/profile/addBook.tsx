import { useState } from "react";
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
import { Plus, Image } from "lucide-react";
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

export const AddNewBook = () => {
  const { user } = useUser();
  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    cover: "",
    author: "",
    genre: "",
    description: "",
    condition: "",
    ownerId: "",
    owner: undefined,
  });
  const [localcover, setLocalCover] = useState<File | null>(null);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload-cover");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/duyu7drmj/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      setBook((prevBook) => ({ ...prevBook, cover: imageUrl }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBook((prevBook) => ({
        ...prevBook,
        cover: URL.createObjectURL(file),
      }));
      setLocalCover(file);
    }
  };

  const addNewBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form default behavior

    const title = (event.target as HTMLFormElement).name.valueOf();
    const author = (event.target as HTMLFormElement).author.value;
    const genre = (event.target as HTMLFormElement).genre.value;
    const description = (event.target as HTMLFormElement).description.value;
    const condition = (event.target as HTMLFormElement).condition.value;
    const cover = localcover ? await uploadImageToCloudinary(localcover) : "";

    const bookData: Book = {
      id: "",
      title,
      author,
      genre,
      description,
      condition,
      cover,
      ownerId: user?.id || "",
      owner: undefined,
    };

    const response = await fetch("api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      window.location.reload(); // Reload the page after successful submission
    } else {
      // Handle errors if needed
      console.error("Failed to add book.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full p-[10px] w-10 h-10">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6 p-6">
        <DialogHeader className="pb-4 grid gap-4">
          <DialogTitle>Add new Book</DialogTitle>
        </DialogHeader>

        {/* The Form */}
        <form onSubmit={addNewBook}>
          <div className="flex gap-6 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="bookName">Book name</Label>
              <Input
                id="bookName"
                name="name"
                type="text"
                placeholder="Book name"
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Author names"
                required
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
                required
              >
                <option value="">Select</option>
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
                required
              >
                <option value="">Select</option>
                {Condition.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1.5 mb-4">
            <Label htmlFor="description" className="mb-1">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="border rounded-md py-2 px-4 text-sm font-normal"
              placeholder="Description of the book"
              required
            ></textarea>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <h1 className="text-sm">Book image</h1>
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
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-6">
            <Button type="submit">Add Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
