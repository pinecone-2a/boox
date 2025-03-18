import { Menu } from "lucide-react"


export const Header = ()=> {
    return <div>
        <div className="flex justify-between text-2xl font-bold bg-amber-10 shadow m-1">
            <h1>Boox</h1>
                <Menu className="mt-1"/>
        </div>
    </div>
}
