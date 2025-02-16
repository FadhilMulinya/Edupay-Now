'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaWallet } from 'react-icons/fa';
import { ConnectWallet, useAddress, useConnectionStatus } from "@thirdweb-dev/react";


interface FormData {
  name: string;
  email: string;
  password: string;
  walletAddress: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    walletAddress: '',
  });
  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (address) {
      setFormData(prev => ({ ...prev, walletAddress: address }));
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-50 p-10 rounded-xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-sm"
      >
        <div>
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create Your Edupay Account
          </motion.h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <InputField
              icon={<FaUser className="text-blue-400" />}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              icon={<FaEnvelope className="text-blue-400" />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              icon={<FaLock className="text-blue-400" />}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {address && (
              <InputField
                icon={<FaWallet className="text-blue-400" />}
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
                value={formData.walletAddress}
                onChange={handleChange}
                disabled
              />
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <ConnectWallet 
              theme="dark"
              btnTitle="Connect Wallet"
              modalTitle="Choose your wallet"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform"
              disabled={connectionStatus !== "connected"}
            >
              Complete Registration
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
            Sign in here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ icon, type, name, placeholder, value, onChange, disabled }) => (
  <motion.div 
    className="relative"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700 transition duration-300 ease-in-out"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
    />
  </motion.div>
);

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const BackgroundAnimation = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const intervalId = setInterval(animateParticles, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-500 opacity-30"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, particle.speedX * 10, 0],
            y: [0, particle.speedY * 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 3 + 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default RegisterPage;