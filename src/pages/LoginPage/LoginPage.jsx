import {Button} from "@/components/ui/button.jsx";
import {LoginHeader} from "@/pages/LoginPage/components/LoginHeader.jsx";
import {LoginForm} from "@/pages/LoginPage/components/LoginForm.jsx";

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <LoginHeader/>
            <main className="flex-1 flex items-center justify-center p-4">
                <LoginForm/>
            </main>
        </div>
    );
}