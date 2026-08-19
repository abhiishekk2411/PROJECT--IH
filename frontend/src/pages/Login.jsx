import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Phone, KeyRound, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 4) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Sprout className="h-16 w-16 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-surface-900 font-serif">
          {t('brand.name')}
        </h2>
        <p className="mt-2 text-center text-lg text-surface-600">
          {t('brand.tagline')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-primary-900/5 sm:rounded-2xl sm:px-10 border border-primary-100">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-surface-700">
                  {t('auth.mobileNumber')}
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-6 w-6 text-surface-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form-input pl-11 text-lg py-3"
                    placeholder={t('auth.enterNumber')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={phone.length !== 10}
              >
                {t('auth.getOtp')} <ArrowRight className="ml-2 h-6 w-6" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-fade-in">
              <div>
                <label htmlFor="otp" className="block text-lg font-medium text-surface-700">
                  {t('auth.enterOtp')} +91 {phone}
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-6 w-6 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="form-input pl-11 text-lg py-3 tracking-[1em] font-bold text-center"
                    placeholder="••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={otp.length !== 4}
              >
                {t('auth.verifyLogin')}
              </button>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="text-primary-600 hover:text-primary-800 text-base font-medium"
                >
                  {t('auth.changeNumber')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
