"use client";

import { Card } from "@/components/ui/card";
import { Bar } from "./bar";
import { AddNewBook } from "./addBook";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Book } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Delete, DeleteIcon, Edit, Trash } from "lucide-react";
import { EditBook } from "./editBook";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [data, setData] = useState<Book[]>([]);
  const user = useUser();
  const [open, setOpen] = useState(false);

  async function getFetchData() {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  console.log(data);

  const deleteBook = async (id: string) => {
    await fetch(`/api/books/singlebook?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleDelete = (bookId: string) => {
    deleteBook(bookId);
    setOpen(false);
  };
  return (
    <div className="w-full max-w-md mx-auto p-4 pb-18">
      <Card className="p-6 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              className="w-full h-full object-cover"
              src={user.user?.imageUrl}
              alt="Profile"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mt-4">{user.user?.fullName}</h2>
      </Card>

      <div className="mt-6 pb-4">
        <h3 className="text-lg font-semibold">Your Books</h3>
        <div className="mt-4 space-y-4">
          {data.map((book: Book, index: number) => (
            <Card key={index} className="flex items-center p-4">
              <div className="flex items-center space-x-4 w-full">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold">{book.title}</h4>
                  <p className="text-sm text-gray-500 mb-1">{book.author}</p>
                  <Badge className="">{book.condition}</Badge>
                </div>
                <div className="flex gap-3">
                  <EditBook id={book.id} />
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <div className="size-10 bg-black rounded-full flex items-center justify-center">
                        <Trash className="text-white" strokeWidth={1} />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                          Are you sure?
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                          This action cannot be undone. This will permanently
                          delete your books and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button
                          onClick={() => setOpen(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDelete(book.id)}
                        >
                          Yes, Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
          <div className="bg-card text-card-foreground flex-col gap-6 rounded-xl border shadow-sm flex items-center p-4 space-x-4">
            <AddNewBook />
          </div>
        </div>
      </div>
      <Bar />
    </div>
  );
}
