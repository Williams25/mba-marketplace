import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustom } from "@/components/InputCustom";
import { InputPassword } from "@/components/InputPassword";
import { FormProviderCustom } from "@/components/FormProviderCustom";
import { FooterAuth } from "@/components/FooterAuth";
import { Mail, MoveRight, Phone, User } from "lucide-react";
import { mailRegex, phoneRegex } from "@/utils/regex";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QUERY_PARAMS } from "@/constants/QueryParams";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { phoneMask } from "@/utils/masks";
import { ERRORS_MESSAGES } from "@/constants/ErrorsMessages";
import { AttachmentFile } from "@/components/AttachmentFile";
import { sellersService } from "@/services/sellersService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

const schema = z
  .object({
    email: z
      .string()
      .regex(mailRegex, { message: ERRORS_MESSAGES.EMAIL_INVALID })
      .email({ message: ERRORS_MESSAGES.EMAIL_INVALID }),
    password: z
      .string({ message: ERRORS_MESSAGES.PASSWORD_INVALID })
      .min(1, { message: ERRORS_MESSAGES.PASSWORD_INVALID }),
    phone: z
      .string()
      .regex(phoneRegex, { message: ERRORS_MESSAGES.PHONE_INVALID })
      .min(15, { message: ERRORS_MESSAGES.PHONE_INVALID })
      .max(15, { message: ERRORS_MESSAGES.PHONE_INVALID }),
    passwordConfirmation: z.string(),
    name: z
      .string({ message: ERRORS_MESSAGES.NAME_INVALID })
      .min(3, { message: ERRORS_MESSAGES.NAME_INVALID }),
    fileAvatar: z.instanceof(File).nullish(),
    avatarId: z.string().optional()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: ERRORS_MESSAGES.CONFIRM_PASSWORD_INVALID
  });

export type ISignUpFormData = z.infer<typeof schema>;

const initialValuesForm: ISignUpFormData = {
  email: "",
  phone: "",
  name: "",
  password: "",
  passwordConfirmation: "",
  avatarId: "",
  fileAvatar: null
};

export const SignUp = () => {
  const [params] = useSearchParams();
  const email = params.get(QUERY_PARAMS.EMAIL);
  const phone = params.get(QUERY_PARAMS.PHONE);
  const name = params.get(QUERY_PARAMS.NAME);

  const navigate = useNavigate();

  const methods = useForm<ISignUpFormData>({
    resolver: zodResolver(schema),
    values: {
      ...initialValuesForm,
      email: email || "",
      phone: phone || "",
      name: name || ""
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sellersService.create
  });

  const handleSignUp = async (data: ISignUpFormData) => {
    try {
      const response = await mutateAsync(data);
      toast.success(`Seller cadastrado com sucesso!`, {
        action: {
          label: "Login",
          onClick: () =>
            navigate(
              `${DEFAULT_ROUTES.PUBLIC.SIGN_IN}?${QUERY_PARAMS.EMAIL}=${response.seller.email}`
            )
        }
      });

      methods.reset({ ...initialValuesForm });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast.error(
        axiosError.response?.data?.message ||
          `Erro ao cadastrar seller - ${data.email}`
      );
    }
  };

  return (
    <>
      <Helmet title="SignUp" />

      <div className="h-full items-start justify-start w-full flex flex-col gap-6">
        <div className="w-full">
          <h1 className="font-bold text-2xl">Crie sua conta</h1>
          <p className="font-medium text-base text-gray-500 ">
            Informe os seus dados pessoais e de acesso
          </p>
        </div>

        <FormProviderCustom
          methods={methods}
          onSubmit={methods.handleSubmit(handleSignUp)}
          className="w-full"
        >
          <fieldset>
            <legend className="gray-500 text-lg font-semibold mb-5">
              Perfil
            </legend>

            <AttachmentFile
              id="fileAvatar"
              className="mb-4"
              classNameLabel="h-32"
              disabled={isPending}
            />

            <InputCustom
              label="Nome"
              id="name"
              placeholder="Seu nome completo"
              startIcon={<User />}
              className="mb-4"
              disabled={isPending}
            />

            <InputCustom
              label="Telefone"
              id="phone"
              placeholder="(00) 00000-0000"
              startIcon={<Phone />}
              className="mb-4"
              mask={phoneMask}
              minLength={15}
              maxLength={15}
              disabled={isPending}
            />
          </fieldset>

          <fieldset>
            <legend className="gray-500 text-lg font-semibold my-5">
              Acesso
            </legend>
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

            <InputPassword
              label="Confirmar Senha"
              id="passwordConfirmation"
              placeholder="Confirme a senha"
              className="mb-4"
              disabled={isPending}
            />
          </fieldset>

          <Button
            type="submit"
            className="mt-4 w-full flex items-center justify-between text-sm font-bold"
            size={"lg"}
            disabled={isPending}
          >
            {isPending ? "Cadastrando..." : "Cadastrar"} <MoveRight />
          </Button>
        </FormProviderCustom>

        <FooterAuth
          title="Já tem uma conta?"
          labelButton="Acessar"
          link={DEFAULT_ROUTES.PUBLIC.SIGN_IN}
        />
      </div>
    </>
  );
};
