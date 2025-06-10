import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  console.log('LoginPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (isRegister) {
      console.log('Registering with:', { email, password });
      // Mock registration logic
    } else {
      console.log('Logging in with:', { email, password });
      // Mock login logic, e.g., navigate to dashboard
      // For demo: navigate('/dashboard');
    }
    // On successful login/registration, you would typically redirect
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <img src="https://placehold.co/150x50/007bff/white?text=AppLogo" alt="Application Logo" className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400">Sign in to continue to your dashboard.</p>
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{isRegister ? 'Create an Account' : 'Login'}</CardTitle>
          <CardDescription>
            {isRegister ? 'Fill in the details below to create your account.' : 'Enter your credentials to access your account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isRegister && (
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </form>
          <Separator className="my-6" />
          <div className="text-center">
            <Button variant="link" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 dark:text-gray-400 text-center justify-center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;