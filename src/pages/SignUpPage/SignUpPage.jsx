import {SignUpHeader} from "@/pages/SignUpPage/components/SignUpHeader.jsx";
import {SignUpForm} from "@/pages/SignUpPage/components/SignUpForm.jsx";

export const SignUpPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SignUpHeader/>
            <main className="flex-1 flex items-center justify-center p-4">
                <SignUpForm/>
            </main>
        </div>
    );
}