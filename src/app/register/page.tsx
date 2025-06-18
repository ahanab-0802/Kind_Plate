import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Register - SharePlate',
  description: 'Join the SharePlate community. Register as a restaurant, household, or NGO to start sharing and receiving surplus food.',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 inline-block p-3 bg-primary/10 rounded-full">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Join SharePlate</CardTitle>
          <CardDescription className="text-md">
            Create an account to start sharing or receiving surplus food.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
