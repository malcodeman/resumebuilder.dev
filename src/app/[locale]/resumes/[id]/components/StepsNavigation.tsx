import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { equals } from "ramda";
import useResume from "hooks/useResume";
import { Link } from "navigation";

type props = BreadcrumbProps & {
  currentPage: "about" | "employment" | "education";
};

function StepsNavigation(props: props) {
  const { currentPage, ...rest } = props;
  const t = useTranslations();
  const { resume } = useResume();
  const id = resume?.id;
  return (
    <Breadcrumb {...rest} separator={<ChevronRightIcon size={16} />}>
      <BreadcrumbItem
        sx={{
          a: {
            color: equals(currentPage, "about") ? "blue.500" : "inherit",
          },
        }}
      >
        <BreadcrumbLink as={Link} href={`/resumes/${id}/about`}>
          {t("personal_details")}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        sx={{
          a: {
            color: equals(currentPage, "employment") ? "blue.500" : "inherit",
          },
        }}
      >
        <BreadcrumbLink as={Link} href={`/resumes/${id}/employment`}>
          {t("employment")}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        sx={{
          a: {
            color: equals(currentPage, "education") ? "blue.500" : "inherit",
          },
        }}
      >
        <BreadcrumbLink as={Link} href={`/resumes/${id}/education`}>
          {t("education")}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default StepsNavigation;
