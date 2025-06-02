
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialView = 'login' }: AuthModalProps) => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>(initialView);

  const handleClose = () => {
    setCurrentView('login');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {currentView === 'login' && (
          <LoginForm
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
            onClose={handleClose}
          />
        )}
        
        {currentView === 'register' && (
          <RegisterForm
            onSwitchToLogin={() => setCurrentView('login')}
            onClose={handleClose}
          />
        )}
        
        {currentView === 'forgot-password' && (
          <ForgotPasswordForm
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
