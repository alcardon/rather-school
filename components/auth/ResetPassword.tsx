"use client";

import { useAuth, VIEWS } from "@/components/auth/authProvider";
import { useSupabase } from "@/components/auth/supabase-provider";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function ResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { setView } = useAuth();

  const toast = useToast();

  async function resetPassword({ email }) {
    const { supabase } = useSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    });

    toast.closeAll();

    toast({
      title: error?.message || "Password reset instructions sent.",
      status: error ? "error" : "success",
      isClosable: true,
      position: "top-right",
    });

    setView(VIEWS.SIGN_IN);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Stack align={"center"}>
          <Heading lineHeight={1.1} fontSize={{ base: "1xl", md: "2xl" }}>
            Forgot Password? 🔒
          </Heading>
          <Text color={"gray.600"}>
            Enter your email and we′ll send you instructions to reset your
            password
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(resetPassword)}>
          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.email)} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                type="text"
              />
              <FormErrorMessage>
                {errors.email?.message.toString()}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"right"}
              >
                <Link color={"blue.400"} onClick={() => setView(VIEWS.SIGN_IN)}>
                  <ChevronLeftIcon />
                  Back to login
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                isLoading={isSubmitting}
                type="submit"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Send Reset Link
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
