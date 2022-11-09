import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { equals } from "ramda";
import Link from "next/link";

import useResume from "../../hooks/useResume";

type props = BreadcrumbProps & {
  currentPage: "about" | "employment" | "education";
};

function StepsNavigation(props: props) {
  const { currentPage, ...rest } = props;
  const { t } = useTranslation();
  const { resume } = useResume();
  const id = resume?.id;
  return (
    <Breadcrumb {...rest} separator={<FiChevronRight />}>
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
