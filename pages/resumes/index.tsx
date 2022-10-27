import React from "react";
import Head from "next/head";
import {
  Flex,
  Button,
  Grid,
  Text,
  ButtonGroup,
  IconButton,
  Center,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  FiGrid,
  FiList,
  FiLink,
  FiMoreHorizontal,
  FiCopy,
} from "react-icons/fi";
import { useMediaQuery, useMountEffect } from "@react-hookz/web";
import {
  map,
  filter,
  isNil,
  isEmpty,
  toLower,
  includes,
  equals,
  and,
  length,
} from "ramda";
import {
  DndContext,
  PointerSensor,
  DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { createColumnHelper, VisibilityState } from "@tanstack/react-table";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Layout from "../../components/Layout";
import ResumeItem from "../../components/resumes/ResumeItem";
import EmptyResumes from "../../components/resumes/EmptyResumes";
import Table from "../../components/misc/Table";

import useResumes from "../../hooks/useResumes";
import useDashboard from "../../hooks/useDashboard";
import useDateFnsLocale from "../../hooks/useDateFnsLocale";

import { Resume, View } from "../../types";

import SearchInput from "../../components/misc/SearchInput";
import DeleteResumeMenuItem from "../../components/resumes/DeleteResumeMenuItem";
import CreateNewResumeButtonGroup from "../../components/resumes/CreateNewResumeButtonGroup";
import CopyLinkMenuItem from "../../components/resumes/CopyLinkMenuItem";

function ResumeGrid() {
  const { t } = useTranslation();
  const { resumes, duplicate, remove, changeTitle, changeIcon, move } =
    useResumes({ initializeWithStorageValue: false });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [search, setSearch] = React.useState("");
  const [view, setView] = React.useState<View>("grid");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const isSmallDevice = useMediaQuery("(max-width: 48em)");
  const columnHelper = createColumnHelper<Resume>();
  const toast = useToast();
  const handleOnDelete = React.useCallback(
    (id: string) => {
      remove(id);
      toast({
        description: t("resume_deleted"),
        isClosable: true,
      });
    },
    [remove, toast, t]
  );
  const { locale } = useDateFnsLocale();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("title", {
        header: t("title"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("updatedAt", {
        header: t("edited"),
        cell: (info) =>
          t("edited_time", {
            time: formatDistanceToNow(info.getValue(), {
              addSuffix: true,
              locale,
            }),
          }),
      }),
      columnHelper.accessor("id", {
        header: "",
        cell: (info) => (
          <Stack spacing="2" direction="row">
            <Link href={`/resumes/${info.getValue()}`} passHref>
              <Button display={["none", "inline-flex"]} size="sm">
                {t("open")}
              </Button>
            </Link>
            <Menu>
              <MenuButton
                size="sm"
                as={IconButton}
                aria-label="More options"
                icon={<FiMoreHorizontal />}
              />
              <MenuList>
                <Link href={`/resumes/${info.getValue()}`} passHref>
                  <MenuItem display={["flex", "none"]} icon={<FiLink />}>
                    {t("open")}
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => duplicate(info.getValue())}
                  icon={<FiCopy />}
                >
                  {t("duplicate")}
                </MenuItem>
                <CopyLinkMenuItem id={info.getValue()} />
                <DeleteResumeMenuItem
                  onDelete={() => handleOnDelete(info.getValue())}
                />
              </MenuList>
            </Menu>
          </Stack>
        ),
      }),
    ],
    [columnHelper, duplicate, handleOnDelete, locale, t]
  );

  React.useEffect(() => {
    if (and(isSmallDevice, equals(view, "list"))) {
      setColumnVisibility({ updatedAt: false });
    } else {
      setColumnVisibility({});
    }
  }, [isSmallDevice, view]);

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      move(active.id, over.id);
    }
  }

  if (isNil(resumes)) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isEmpty(resumes)) {
    return <EmptyResumes />;
  }

  const filteredResumes = filter(
    (item) => includes(toLower(search), toLower(item.title)),
    resumes
  );

  function renderResumes() {
    if (isEmpty(filteredResumes)) {
      return <Text>{t("no_resumes_found")}</Text>;
    }
    if (equals(view, "grid")) {
      return (
        <Grid
          gap="8"
          gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          data-cy="resumes-grid"
        >
          <DndContext id="dnd" sensors={sensors} onDragEnd={handleOnDragEnd}>
            <SortableContext items={filteredResumes}>
              {map(
                (item) => (
                  <ResumeItem
                    key={item.id}
                    resume={item}
                    onDelete={handleOnDelete}
                    onDuplicate={(id) => duplicate(id)}
                    onTitleChange={(id, title) => changeTitle(id, title)}
                    onIconChange={(id, icon) => changeIcon(id, icon)}
                  />
                ),
                filteredResumes
              )}
            </SortableContext>
          </DndContext>
        </Grid>
      );
    }
    return (
      <Table
        data={filteredResumes}
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    );
  }

  return (
    <>
      <Flex mb="4">
        <SearchInput
          mr="2"
          placeholder={t("search_n_resumes", { n: length(resumes) })}
          value={search}
          onChangeValue={(nextValue) => setSearch(nextValue)}
          onClear={() => setSearch("")}
        />
        <ButtonGroup mr="2" size="sm" isAttached>
          <IconButton
            size="sm"
            aria-label="Grid view"
            icon={<FiGrid />}
            onClick={() => setView("grid")}
            isActive={equals(view, "grid")}
          />
          <IconButton
            size="sm"
            aria-label="List view"
            icon={<FiList />}
            onClick={() => setView("list")}
            isActive={equals(view, "list")}
          />
        </ButtonGroup>
        <CreateNewResumeButtonGroup />
      </Flex>
      {renderResumes()}
    </>
  );
}

function Dashboard() {
  const { setDashboard } = useDashboard();

  useMountEffect(() => {
    setDashboard(true);
  });

  return (
    <>
      <Head>
        <title>Dashboard | resumebuilder.dev</title>
      </Head>
      <Layout>
        <ResumeGrid />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Dashboard;
