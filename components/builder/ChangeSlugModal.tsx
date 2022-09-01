import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputLeftAddon,
  useToast,
  useMergeRefs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { and, or } from "ramda";

import useResume from "../../hooks/useResume";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangeSlugModal(props: props) {
  const { isOpen, onClose } = props;
  const form = useForm({
    defaultValues: { slug: "" },
    resolver: yupResolver(
      yup
        .object({
          slug: yup
            .string()
            .required("Slug is required")
            .max(21, "Slug is too long")
            .matches(
              /^[A-Za-z0-9_-]+$/,
              `Slug must match the following: "A-Za-z0-9_-"`
            ),
        })
        .required()
    ),
  });
  const { resume, changeSlug } = useResume();
  const toast = useToast();
  const router = useRouter();
  const initialRef = React.useRef(null);
  const slugInputRefs = useMergeRefs(form.register("slug").ref, initialRef);
  const isInvalid = Boolean(form.formState.errors.slug);

  React.useEffect(() => {
    if (and(isOpen, resume)) {
      form.reset({ slug: resume.id });
    }
  }, [form, isOpen, resume]);

  function onSubmit(values: { slug: string }) {
    const resume = changeSlug(values.slug);
    if (resume) {
      toast({
        description: "Slug changed",
        isClosable: true,
      });
      router.push(`/resumes/${resume.id}`);
    } else {
      form.setError("slug", { message: "Slug taken" });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalHeader>Change slug</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isInvalid}>
              <FormLabel>Slug</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon borderRadius="md">resumes/</InputLeftAddon>
                <Input
                  variant="filled"
                  borderRadius="md"
                  {...form.register("slug")}
                  ref={slugInputRefs}
                />
              </InputGroup>
              <FormErrorMessage>
                {form.formState.errors.slug?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" mr="2" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              type="submit"
              isDisabled={or(!form.formState.isDirty, isInvalid)}
            >
              Change
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
      <ModalFooter />
    </Modal>
  );
}
export default ChangeSlugModal;
