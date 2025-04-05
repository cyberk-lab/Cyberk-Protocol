import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AUTH_REGISTER_URL } from '@/config/api.config';

interface GoogleAuthResponse {
  token: string;
  error?: string;
}

const CreateAccountForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ') || firstName;

      const response = await fetch(AUTH_REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 400:
            toast({
              title: "Invalid request",
              description: data.message || "Please check your input",
              variant: "destructive",
            });
            break;
          case 422:
            if (data.errors) {
              Object.entries(data.errors).forEach(([field, message]) => {
                toast({
                  title: `${field.charAt(0).toUpperCase() + field.slice(1)} error`,
                  description: message as string,
                  variant: "destructive",
                });
              });
            }
            break;
          case 429:
            toast({
              title: "Too many attempts",
              description: "Please try again later",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Error",
              description: "An unexpected error occurred",
              variant: "destructive",
            });
        }
        return;
      }

      // Registration successful, log in the user
      await login(data.token);
      
      toast({
        title: "Account created",
        description: "You have successfully created an account.",
      });
      navigate('/portfolio');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Open Google OAuth popup
      const googleAuthWindow = window.open(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/google`,
        'google-auth',
        'width=500,height=600'
      );

      if (!googleAuthWindow) {
        throw new Error('Failed to open Google authentication window');
      }

      const authResult = await new Promise<GoogleAuthResponse>((resolve, reject) => {
        window.addEventListener('message', async (event) => {
          if (event.origin !== import.meta.env.VITE_API_URL) return;
          
          if (event.data.error) {
            reject(new Error(event.data.error));
            return;
          }

          if (event.data.token) {
            resolve(event.data);
            googleAuthWindow.close();
          }
        });
      });

      // Login with the received token
      await login(authResult.token);
      
      toast({
        title: "Google sign up successful",
        description: "You have created an account with Google.",
      });
      navigate('/portfolio');
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-4 text-center">
        <img 
          src="logo-1.png" 
          alt="Company Logo" 
          className="mx-auto mb-2 w-20 h-20"
          onError={(e) => {
            // Fallback if logo fails to load
            console.error("Logo failed to load");
            e.currentTarget.style.display = 'none';
          }}
        />
        <h1 className="text-3xl font-fauna mb-2 text-black dark:text-white">Create Account</h1>
        <p className="text-black/70 dark:text-white/70 text-sm">Sign up to get started</p>
      </motion.div>

      <motion.form
        variants={containerVariants}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-black dark:text-white">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            placeholder="Your name"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            autoComplete="new-password"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-black dark:text-white">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 bg-white dark:bg-white/10 border-gray-300 dark:border-white/20 focus:border-black dark:focus:border-white/40 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            autoComplete="new-password"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-black hover:bg-black/80 text-white transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <UserPlus className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-5 w-5" />
            )}
            Create Account
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

        <motion.div variants={itemVariants}>
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="w-full h-12 relative bg-white dark:bg-white/10 text-black dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20"
          >
            {isGoogleLoading ? (
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
            Sign up with Google
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-2 text-center text-sm text-gray-500 dark:text-white/70"
        >
          Already have an account?{" "}
          <Link
            to="/"
            className="text-black dark:text-white hover:underline transition-all duration-300 inline-flex items-center"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Sign in
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default CreateAccountForm;
