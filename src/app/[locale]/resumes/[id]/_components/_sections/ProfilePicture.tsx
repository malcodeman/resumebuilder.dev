import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { equals, find, isEmpty } from "ramda";
import { CameraIcon, EditIcon, Trash2Icon } from "lucide-react";
import { useProfilePicture } from "hooks/useProfilePicture";
import { AddProfilePictureModal } from "app/[locale]/resumes/[id]/_components/_sections/AddProfilePictureModal";
import { Template } from "types";
import { CONSTANTS } from "lib/constants";

type Props = {
  template: Template;
};

function ProfilePicture(props: Props) {
  const { template } = props;
  const t = useTranslations();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const profilePicture = useProfilePicture();
  const isPictureSupported = template
    ? equals(template, "berlin") ||
      equals(template, "tokyo") ||
      equals(template, "nairobi")
    : false;
  const templateTitle = template
    ? find((item) => equals(item.template, template), CONSTANTS.TEMPLATES_LIST)
        .title
    : "";

  return (
    <>
      {isEmpty(profilePicture.value) ? (
        <Tooltip
          label={t("template_does_not_support_profile_picture", {
            template: templateTitle,
          })}
          aria-label={t("template_does_not_support_profile_picture", {
            template: templateTitle,
          })}
          isDisabled={isPictureSupported}
        >
          <Button
            size="sm"
            width="full"
            leftIcon={<CameraIcon size={16} />}
            onClick={onOpen}
            data-testid="add-profile-picture-button"
            isDisabled={!isPictureSupported}
          >
            {t("add_profile_picture")}
          </Button>
        </Tooltip>
      ) : (
        <>
          <Flex mb="4" justifyContent="center">
            <Avatar
              size="xl"
              backgroundColor="transparent"
              src={profilePicture.value}
              opacity={isPictureSupported ? "initial" : "0.4"}
            />
          </Flex>
          <Tooltip
            label={t("template_does_not_support_profile_picture", {
              template: templateTitle,
            })}
            aria-label={t("template_does_not_support_profile_picture", {
              template: templateTitle,
            })}
            isDisabled={isPictureSupported}
          >
            <ButtonGroup
              size="sm"
              width="full"
              spacing="4"
              isDisabled={!isPictureSupported}
            >
              <Button
                width="full"
                leftIcon={<EditIcon size={16} />}
                onClick={onOpen}
                data-testid="change-profile-picture-button"
              >
                {t("change")}
              </Button>
              <Button
                width="full"
                leftIcon={<Trash2Icon size={16} />}
                onClick={() => profilePicture.set("")}
                data-testid="delete-profile-picture-button"
              >
                {t("delete")}
              </Button>
            </ButtonGroup>
          </Tooltip>
        </>
      )}
      <AddProfilePictureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export { ProfilePicture };
