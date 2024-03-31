"use client";
import { CSSProperties, FormEvent, ReactNode, RefObject } from "react";

type WrapperProps = {
  children: ReactNode;
  currentStep: number;
  className?: string;
};

interface FormStepProps {
  children: ReactNode;
  position: number;
  className?: string;
}

type MultiStepFormProps = {
  children: ReactNode;
  currentStep: number;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  className?: string;
  wrapperClassName?: string;
  formRef?: RefObject<HTMLFormElement> ;
};

const DEFAULT_TRANSITION = "[transition:_transform_500ms_ease-out]";

export const FormStep = ({ children, position, className }: FormStepProps) => {
  const itemStyle = {
    transform: `translateX(${position * 100}%)`,
  } as CSSProperties;

  return (
    <div
      className={`absolute h-full w-full [transition:_opacity_300ms_ease-out] ${className}`}
      style={itemStyle}
    >
      {children}
    </div>
  );
};

function Wrapper({ children, currentStep, className }: WrapperProps) {
  const wrapperStyles: CSSProperties = {
    transform: `translateX(-${currentStep * 100}%)`,
  };

  return (
    <div
      style={wrapperStyles}
      className={`absolute h-full w-full ${DEFAULT_TRANSITION} ${className}`}
    >
      {children}
    </div>
  );
}

function MultiStepForm({
  children,
  currentStep,
  handleSubmit,
  className,
  wrapperClassName,
  formRef
}: MultiStepFormProps) {
  return (
    <form
      className={`relative flex h-[calc(100vh-6rem)] w-full overflow-x-hidden ${className}`}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Wrapper currentStep={currentStep} className={wrapperClassName}>
        {children}
      </Wrapper>
    </form>
  );
}

export default MultiStepForm;
