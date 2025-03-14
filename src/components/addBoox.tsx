import { Image, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./label";
import { Input } from "./ui/input";



interface AddBookProps {
    categoryName: string;
    setBoox: React.Dispatch<React.SetStateAction<any>>;
    Book: any;
    handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;

}

export const AddBook = ({
    categoryName,
    setBoox,
    Book,
    handleUpload,
    onChange,
}: AddBookProps) => {
    const addBook = async () => {
        const data = await fetch("http://localhost:7000/boox/", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(Book),
        });
        const newItem: any = await data.json();
        window.location.reload();
    };

    return (
        <Dialog>
            <DialogTitle className=" text-center ">
                <DialogTrigger asChild>
                    <Button variant="destructive" className="rounded-full p-[10px]">
                        <Plus />
                    </Button>
                </DialogTrigger>

                <div className="text-center text-sm font-medium mt-6 ">
                    <h4>Add new Dish to </h4>
                    <h4>{categoryName}</h4>
                </div>
            </DialogTitle>
            <DialogContent className="flex flex-col gap-6 p-6">
                <DialogHeader className="pb-4 grid gap-4">
                    <DialogTitle>Add new dish to {categoryName}</DialogTitle>
                </DialogHeader>

                <div className="flex gap-6">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="BookName">Book name</Label>
                        <Input
                            id="BookName"
                            name="name"
                            type="text"
                            placeholder="Type Book name..."
                            onChange={onChange}
                        />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="BookPrice">Book price</Label>
                        <Input
                            id="BookPrice"
                            name="price"
                            type="number"
                            placeholder="Enter price..."
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full  gap-1.5">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        rows={4}
                        cols={50}
                        className="border rounded-md py-2 px-4  text-sm font-normal "
                        placeholder="List ingredients..."
                        onChange={onChange}
                    ></textarea>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <h1 className="text-sm">Book image</h1>
                    {Book?.image !== "" ? (
                        <div
                            className={`bg-cover bg-center rounded-md h-[138px] `}
                            style={{ backgroundImage: `url(${Book?.image})` }}
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
                                addBook();
                            }}
                        >
                            Add book
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
