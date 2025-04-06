import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AUTH_LOGIN_URL } from '@/config/api.config';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Logo component
const Logo = () => (
  <motion.div variants={itemVariants} className="mb-4 text-center">
    <img 
      src="logo-1.png" 
      alt="Company Logo" 
      className="mx-auto mb-2 w-20 h-20"
      onError={(e) => {
        console.error("Logo failed to load");
        e.currentTarget.style.display = 'none';
      }}
    />
    <h1 className="text-3xl font-fauna mb-2 text-black dark:text-white">Welcome back</h1>
    <p className="text-black/70 dark:text-white/70 text-sm">Sign in to continue to your account</p>
  </motion.div>
);

// Google login button component
const GoogleLoginButton = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => (
  <motion.div variants={itemVariants}>
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-12 relative bg-white dark:bg-white/10 text-black dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20"
    >
      {isLoading ? (
        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54L20.0303 3.115C17.9502 1.19 15.2353 0 12.0003 0C7.31533 0 3.25533 2.69 1.28033 6.60999L5.27033 9.70999C6.21533 6.86 8.87033 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 16.02 17.34 17.27 16.08 18.08L19.945 21.095C22.2 19.02 23.49 15.93 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.29C5.02498 13.57 4.88498 12.8 4.88498 12C4.88498 11.2 5.01998 10.43 5.26498 9.71L1.27498 6.61C0.460076 8.24002 0.000175476 10.06 0.000175476 12C0.000175476 13.94 0.460076 15.76 1.27498 17.39L5.26498 14.29Z" fill="#FBBC05" />
          <path d="M12.0004 24C15.2404 24 17.9654 22.94 19.9454 21.095L16.0804 18.08C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.87043 19.25 6.21543 17.14 5.27043 14.29L1.28043 17.39C3.25543 21.31 7.31543 24 12.0004 24Z" fill="#34A853" />
        </svg>
      )}
      Sign in with Google
    </Button>
  </motion.div>
);

interface ValidationErrors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

interface ApiResponse {
  message?: string;
  errors?: ValidationErrors;
  token?: string;
}

// Main login form component
const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(AUTH_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        handleLoginError(response.status, data);
        return;
      }

      await login(data.token);
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      navigate('/portfolio');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Failed to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (status: number, data: ApiResponse) => {
    switch (status) {
      case 400:
        toast({
          title: "Invalid request",
          description: data.message || "Please check your input information",
          variant: "destructive",
        });
        break;
      case 401:
        toast({
          title: "Authentication failed",
          description: "The email or password you entered is incorrect",
          variant: "destructive",
        });
        break;
      case 422:
        handleValidationErrors(data.errors);
        break;
      case 429:
        toast({
          title: "Too many attempts",
          description: "You have made too many login attempts. Please wait a few minutes before trying again.",
          variant: "destructive",
        });
        break;
      default:
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
    }
  };

  const handleValidationErrors = (errors: ValidationErrors) => {
    if (!errors) return;

    if (errors.email === 'notFound') {
      toast({
        title: "Email not found",
        description: "This email is not registered in our system. Please check your email or create a new account.",
        variant: "destructive",
      });
    } else if (errors.email?.startsWith('needLoginViaProvider:')) {
      const provider = errors.email.split(':')[1];
      toast({
        title: "Wrong login method",
        description: `This account was created with ${provider}. Please use the "${provider}" login option instead.`,
        variant: "destructive",
      });
    } else if (errors.password === 'incorrectPassword') {
      toast({
        title: "Incorrect password",
        description: "The password you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    } else {
      Object.entries(errors).forEach(([field, message]) => {
        toast({
          title: `${field.charAt(0).toUpperCase() + field.slice(1)} error`,
          description: message as string,
          variant: "destructive",
        });
      });
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate Google login process
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast({
        title: "Google login successful",
        description: "You have been logged in with Google.",
      });
      navigate('/portfolio');
    }, 1500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <Logo />

      <Form {...form}>
        <motion.form
          variants={containerVariants}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="text-xs text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:underline transition-all duration-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-black hover:bg-black/80 text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <LogIn className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-5 w-5" />
              )}
              Sign in
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-200 dark:bg-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-gray-500 dark:text-white/70 bg-white dark:bg-transparent">Or continue with</span>
            </div>
          </motion.div>

          <GoogleLoginButton isLoading={isGoogleLoading} onClick={handleGoogleLogin} />

          <motion.div
            variants={itemVariants}
            className="pt-2 text-center text-sm text-gray-500 dark:text-white/70"
          >
            Don't have an account?{" "}
            <Link
              to="/create-account"
              className="text-black dark:text-white hover:underline transition-all duration-300 inline-flex items-center"
            >
              Create account
              <UserPlus className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
