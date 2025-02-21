import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { signInWithPassword } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { useState } from 'react';
import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  username: zod.string().min(1, { message: 'username is required!' }),

  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(1, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function CenteredSignInView() {
  const password = useBoolean();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ username: data.username, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  const renderHead = (
    <Stack alignItems="center" spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Admin Panelə giriş et</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        placeholder="İstifadəçi adınızı daxil edin"
        name="username"
        label="Istifadəçi adı"
        InputLabelProps={{ shrink: true }}
      />

      <Stack spacing={1.5}>
        <Field.Text
          name="password"
          label="Şifrə"
          placeholder="6+ xarakter daxil edin"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Stack>
  );

  return (
    <div className="flex flex-col justify-center shadow-2xl p-6 rounded-2xl">
      {renderLogo}

      {renderHead}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </div>
  );
}
