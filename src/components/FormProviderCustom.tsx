import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider as HookFormProvider,
  UseFormReturn,
} from "react-hook-form";

export interface FormProvidersProps<T extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
  noValidate?: boolean;
  className?: string;
}

export function FormProviderCustom<T extends FieldValues>({
  children,
  methods,
  noValidate,
  onSubmit,
  className,
}: FormProvidersProps<T>) {
  return (
    <HookFormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        noValidate={typeof noValidate === "undefined" ? true : noValidate}
        autoComplete="false"
        method="POST"
        className={className || ""}
      >
        {children}
      </form>
    </HookFormProvider>
  );
}
