import React from 'react';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
  variant?: 'navbar' | 'footer' | 'auth';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className,
  onClick,
  variant = 'navbar'
}) => {
  const defaultClasses = {
    navbar: "w-40 sm:w-44 lg:w-48 h-auto object-cover object-top cursor-pointer",
    footer: "w-48 sm:w-56 h-auto object-contain cursor-pointer",
    auth: "w-56 sm:w-64 h-auto object-contain cursor-pointer"
  };

  const finalClassName = className || defaultClasses[variant];

  if (variant === 'navbar') {
    return (
      <div onClick={onClick} className="flex items-center group shrink-0 cursor-pointer overflow-hidden h-[40px] sm:h-[46px] lg:h-[50px]">
        <img
          src="/brand/relief-ai-pakistan-logo.png"
          alt="Relief AI Pakistan - Emergency & Relief Network"
          className="w-40 sm:w-44 lg:w-48 h-auto object-cover object-top mix-blend-multiply transition-opacity duration-200 group-hover:opacity-95"
          style={{ mixBlendMode: 'multiply' }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div onClick={onClick} className="flex items-center group shrink-0 cursor-pointer">
      <img
        src="/brand/relief-ai-pakistan-logo.png"
        alt="Relief AI Pakistan - Emergency & Relief Network"
        className={`${finalClassName} transition-opacity duration-200 group-hover:opacity-95 mix-blend-multiply`}
        style={{ mixBlendMode: 'multiply' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
