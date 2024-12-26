
import { Button } from '@/components/ui/button'
import { Book } from 'lucide-react'
import {Link} from "react-router-dom";

export function LoginHeader() {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <Link to={"/"} className="flex items-center space-x-2">
                    <Book className="h-6 w-6" />
                    <span className="text-xl font-semibold">H2Lib</span>
                </Link>

                <nav className="flex items-center space-x-6">
                    <Link to={"/pricing"} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Pricing
                    </Link>
                    <Link to={"/support"} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Support
                    </Link>
                    <Link to={"/contact"} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Contact Us
                    </Link>
                    <Button variant="ghost" asChild>
                        <Link to={"/login"}>Login</Link>
                    </Button>
                    {/*<Button asChild>
                        <Link to={"/get-started"}>Get Started</Link>
                    </Button>*/}
                    <Button asChild>
                        <Link to={"/signup"}>Sign Up</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}

