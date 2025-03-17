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
import { useState } from "react";

export const AddNewBook = () => {
    const [book, setBook] = useState({
        name: "",
        description: "",
        image: "",
    });

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBook((prevBook) => ({ ...prevBook, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const addNewBook = async () => {
        const data = await fetch("http://localhost:3000/book/", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(book),
        });
        const newItem: any = await data.json();
        window.location.reload();
    };

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
                        <Label htmlFor="bookName">Author</Label>
                        <Input
                            id="bookName"
                            name="name"
                            type="text"
                            placeholder="Author names"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full  gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        cols={50}
                        className="border rounded-md py-2 px-4  text-sm font-normal "
                        placeholder="Description of the book"
                        onChange={onChange}
                    ></textarea>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <h1 className="text-sm">Book image</h1>
                    {book?.image !== "" ? (
                        <div
                            className={`bg-cover bg-center rounded-md h-[138px] `}
                            style={{ backgroundImage: `url(${book?.image})` }}
                        ></div>
                    ) : (
                        <Label
                            htmlFor="image"
                            className={`h-[138px] border border-dashed rounded-md bg-blue-50 flex flex-col items-center justify-center p-4 gap-2 cursor-pointer`}
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
                        placeholder="Enter image..."
                        className="hidden"
                        onChange={handleUpload}
                    />
                </div>
                <DialogFooter className="pt-6">
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                addNewBook();
                            }}
                        >
                            Add Book
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};