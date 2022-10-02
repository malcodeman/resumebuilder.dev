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
import { useTranslation } from "next-i18next";

import useResume from "../../hooks/useResume";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangeSlugModal(props: props) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: { slug: "" },
    resolver: yupResolver(
      yup
        .object({
          slug: yup
            .string()
            .required(t("slug_is_required"))
            .max(21, t("slug_is_too_long"))
            .matches(
              /^[A-Za-z0-9_-]+$/,
              t("slug_must_match_the_following_regex", { regex: "A-Za-z0-9_-" })
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
        description: t("slug_changed"),
        isClosable: true,
      });
      router.push(`/resumes/${resume.id}`);
    } else {
      form.setError("slug", { message: t("slug_taken") });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalHeader>{t("change_slug")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isInvalid}>
              <FormLabel>{t("slug")}</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon borderRadius="md">resumes/</InputLeftAddon>
                <Input
                  variant="filled"
                  borderRadius="md"
                  data-cy="slug-input"
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
              {t("cancel")}
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              type="submit"
              data-cy="change-button"
              isDisabled={or(!form.formState.isDirty, isInvalid)}
            >
              {t("change")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
      <ModalFooter />
    </Modal>
  );
}
export default ChangeSlugModal;
