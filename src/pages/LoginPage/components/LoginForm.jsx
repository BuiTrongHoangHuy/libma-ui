import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from 'react-router-dom'
import {Book} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {loginSchema} from '@/lib/schemas'
import {loginApi} from "@/pages/LoginPage/api/loginApi.js";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        const response = await loginApi({email: data.email, password: data.password})
        if (response.data.code === 200) {
            const token = response.data?.data?.access_token;
            localStorage.setItem("tokenLibma", token);
        }
        console.log('Login submitted:', response)
        console.log("Login successful, navigating...");
        window.location.href = "/library";
        navigate(`/library`);
        setIsLoading(false)
        // Here you would typically send the data to your backend for authentication
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                    <Book className="h-6 w-6"/>
                </div>
                <CardTitle className="text-2xl">Manager Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-text/md/medium">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-text/md/medium">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-[#4DC0C0] hover:bg-[#45aeae]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

