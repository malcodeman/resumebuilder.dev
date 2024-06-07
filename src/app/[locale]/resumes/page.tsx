"use client";
import React from "react";
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
  GridIcon,
  ListIcon,
  LinkIcon,
  MoreHorizontalIcon,
  CopyIcon,
} from "lucide-react";
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
import { createColumnHelper, VisibilityState } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Layout from "components/Layout";
import ResumeItem from "app/[locale]/resumes/_components/ResumeItem";
import EmptyResumes from "app/[locale]/resumes/_components/EmptyResumes";
import Table from "components/misc/Table";
import useResumes from "hooks/useResumes";
import useLocalStorage from "hooks/useLocalStorage";
import useDateFnsLocale from "hooks/useDateFnsLocale";
import { Resume, View } from "types";
import SearchInput from "components/misc/SearchInput";
import DeleteResumeMenuItem from "app/[locale]/resumes/_components/DeleteResumeMenuItem";
import CreateNewResumeButtonGroup from "app/[locale]/resumes/_components/CreateNewResumeButtonGroup";
import CopyLinkMenuItem from "app/[locale]/resumes/_components/CopyLinkMenuItem";
import ResumeTitleColumn from "app/[locale]/resumes/_components/ResumeTitleColumn";
import { Link } from "navigation";

function ResumeGrid() {
  const t = useTranslations();
  const { resumes, duplicate, remove, changeTitle, changeIcon, move } =
    useResumes();
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
  const isSmallDevice = useMediaQuery("(max-width: 48em)", {
    initializeWithValue: false,
  });
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
      columnHelper.display({
        id: "editable",
        header: t("title"),
        cell: (info) => {
          const icon = info.row.original.icon;
          const title = info.row.original.title;
          const id = info.row.original.id;
          return (
            <ResumeTitleColumn
              icon={icon}
              title={title}
              onChangeIcon={(nextValue: string) => changeIcon(id, nextValue)}
              onChangeTitle={(nextValue: string) => changeTitle(id, nextValue)}
            />
          );
        },
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
      columnHelper.display({
        id: "menu",
        header: "",
        cell: (info) => (
          <Stack spacing="2" direction="row">
            <Link href={`/resumes/${info.row.original.id}`} passHref>
              <Button display={["none", "inline-flex"]} size="sm">
                {t("open")}
              </Button>
            </Link>
            <Menu>
              <MenuButton
                size="sm"
                as={IconButton}
                aria-label="More options"
                data-testid="resume-more-options-menu-button"
                icon={<MoreHorizontalIcon size={16} />}
              />
              <MenuList>
                <Link href={`/resumes/${info.row.original.id}`} passHref>
                  <MenuItem
                    display={["flex", "none"]}
                    icon={<LinkIcon size={16} />}
                  >
                    {t("open")}
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => duplicate(info.row.original.id)}
                  icon={<CopyIcon size={16} />}
                  data-testid="duplicate-menu-item"
                >
                  {t("duplicate")}
                </MenuItem>
                <CopyLinkMenuItem id={info.row.original.id} />
                <DeleteResumeMenuItem
                  onDelete={() => handleOnDelete(info.row.original.id)}
                />
              </MenuList>
            </Menu>
          </Stack>
        ),
      }),
    ],
    [
      columnHelper,
      locale,
      t,
      changeIcon,
      changeTitle,
      duplicate,
      handleOnDelete,
    ]
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
      move(active.id.toString(), over.id.toString());
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
          data-testid="search-input"
          placeholder={t("search_n_resumes", { n: length(resumes) })}
          value={search}
          onChangeValue={(nextValue) => setSearch(nextValue)}
          onClear={() => setSearch("")}
        />
        <ButtonGroup mr="2" size="sm" isAttached>
          <IconButton
            size="sm"
            aria-label="Grid view"
            icon={<GridIcon size={16} />}
            onClick={() => setView("grid")}
            isActive={equals(view, "grid")}
            data-testid="grid-view-icon-button"
          />
          <IconButton
            size="sm"
            aria-label="List view"
            icon={<ListIcon size={16} />}
            onClick={() => setView("list")}
            isActive={equals(view, "list")}
            data-testid="list-view-icon-button"
          />
        </ButtonGroup>
        <CreateNewResumeButtonGroup />
      </Flex>
      {renderResumes()}
    </>
  );
}

function Dashboard() {
  const viewDashboard = useLocalStorage("view-dashboard");

  useMountEffect(() => {
    viewDashboard.set(true);
  });

  return (
    <Layout>
      <ResumeGrid />
    </Layout>
  );
}

export default Dashboard;
