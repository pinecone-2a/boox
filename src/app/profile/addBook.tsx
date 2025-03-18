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
  const [book, setBook] = useState({
    name: "",
    author: "",
    genre: "",
    condition: "",
    description: "",
    image: "",
  });

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      setBook((prevBook) => ({ ...prevBook, image: imageUrl }));
    }
  };

  const addNewBook = async () => {
    const data = await fetch("http://localhost:3000/api/books", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(book),
    });
    const newItem = await data.json();
    window.location.reload();
  };
  console.log(book);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-full p-[10px]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6 p-6">
        <DialogHeader className="pb-4 grid gap-4">
          <DialogTitle>Add new Book</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bookName">Book name</Label>
            <Input
              id="bookName"
              name="name"
              type="text"
              placeholder="Book name"
              onChange={onChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              type="text"
              placeholder="Author names"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="genre">Genre</Label>
            <select
              id="genre"
              name="genre"
              className="border rounded-md py-2 px-4"
              onChange={onChange}
            >
              <option value="">Select Genre</option>
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
              className="border rounded-md py-2 px-4"
              onChange={onChange}
            >
              <option value="">Select Condition</option>
              {Condition.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="border rounded-md py-2 px-4 text-sm font-normal"
            placeholder="Description of the book"
            onChange={onChange}
          ></textarea>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <h1 className="text-sm">Book image</h1>
          {book.image ? (
            <div
              className="bg-cover bg-center rounded-md h-[138px]"
              style={{ backgroundImage: `url(${book.image})` }}
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
            onChange={handleFileUpload}
          />
        </div>

        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button onClick={addNewBook}>Add Book</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
