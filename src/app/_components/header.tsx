import { Menu } from "lucide-react"


export const Header = ()=> {
    return <div>
        <div className="flex justify-between text-2xl font-bold bg-amber-10 shadow m-4">
            <h1>Boox</h1>
                <Menu/>
        </div>
    </div>
}
