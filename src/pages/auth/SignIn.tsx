import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustom } from "@/components/InputCustom";
import { InputPassword } from "@/components/InputPassword";
import { FormProviderCustom } from "@/components/FormProviderCustom";
import { FooterAuth } from "@/components/FooterAuth";
import { Mail, MoveRight } from "lucide-react";
import { mailRegex } from "@/utils/regex";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QUERY_PARAMS } from "@/constants/QueryParams";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { ERRORS_MESSAGES } from "@/constants/ErrorsMessages";
import { sessionService } from "@/services/session";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

const schema = z.object({
  email: z
    .string()
    .regex(mailRegex, { message: ERRORS_MESSAGES.EMAIL_INVALID })
    .email({ message: ERRORS_MESSAGES.EMAIL_INVALID }),
  password: z
    .string({ message: ERRORS_MESSAGES.PASSWORD_INVALID })
    .min(1, { message: ERRORS_MESSAGES.PASSWORD_INVALID })
});

export type ISignInFormData = z.infer<typeof schema>;

export const SignIn = () => {
  const [params] = useSearchParams();
  const email = params.get(QUERY_PARAMS.EMAIL);

  const navigate = useNavigate();

  const methods = useForm<ISignInFormData>({
    resolver: zodResolver(schema),
    values: {
      email: email || "",
      password: ""
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sessionService.getSession
  });

  const handleSignIn = async (data: ISignInFormData) => {
    try {
      await mutateAsync(data);
      navigate(DEFAULT_ROUTES.PRIVATE.HOME);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message);
    }
  };

  return (
    <>
      <Helmet title="SignIn" />

      <div className="h-full items-start justify-start w-full flex flex-col gap-6">
        <div className="w-full">
          <h1 className="font-bold text-2xl">Acesse sua conta</h1>
          <p className="font-medium text-base text-gray-500 ">
            Informe seu e-mail e senha para entrar
          </p>
        </div>

        <FormProviderCustom
          methods={methods}
          onSubmit={methods.handleSubmit(handleSignIn)}
          className="w-full"
        >
          <InputCustom
            label="E-mail"
            id="email"
            placeholder="Seu e-mail cadastrado"
            startIcon={<Mail />}
            className="mb-4"
            disabled={isPending}
          />

          <InputPassword
            label="Senha"
            id="password"
            placeholder="Sua senha de acesso"
            className="mb-4"
            disabled={isPending}
          />

          <Button
            type="submit"
            className="mt-4 w-full flex items-center justify-between text-sm font-bold"
            size={"lg"}
            disabled={isPending}
          >
            {isPending ? "Acessando..." : "Acessar"} <MoveRight />
          </Button>
        </FormProviderCustom>

        <FooterAuth
          title="Ainda não tem uma conta?"
          labelButton="Cadastrar"
          link={DEFAULT_ROUTES.PUBLIC.SIGN_UP}
        />
      </div>
    </>
  );
};
