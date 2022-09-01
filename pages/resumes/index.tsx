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
  Grid as IconGrid,
  List as IconList,
  Link as IconLink,
  MoreHorizontal as IconMoreHorizontal,
  Copy as IconCopy,
} from "react-feather";
import {
  useLocalStorageValue,
  useMediaQuery,
  useMountEffect,
} from "@react-hookz/web";
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

import Layout from "../../components/Layout";
import ResumeItem from "../../components/resumes/ResumeItem";
import EmptyResumes from "../../components/resumes/EmptyResumes";
import Table from "../../components/misc/Table";

import useResumes from "../../hooks/useResumes";

import { Resume, View } from "../../types";

import SearchInput from "../../components/misc/SearchInput";
import DeleteResumeMenuItem from "../../components/resumes/DeleteResumeMenuItem";
import CreateNewResumeButtonGroup from "../../components/resumes/CreateNewResumeButtonGroup";

function ResumeGrid() {
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
        description: "Resume deleted.",
        isClosable: true,
      });
    },
    [remove, toast]
  );
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("updatedAt", {
        header: "Edited",
        cell: (info) =>
          formatDistanceToNow(info.getValue(), {
            addSuffix: true,
          }),
      }),
      columnHelper.accessor("id", {
        header: "",
        cell: (info) => (
          <Stack spacing="2" direction="row">
            <Link href={`/resumes/${info.getValue()}`} passHref>
              <Button display={["none", "inline-flex"]} size="sm">
                Open
              </Button>
            </Link>
            <Menu>
              <MenuButton as={Button} size="sm">
                <IconMoreHorizontal size="20" />
              </MenuButton>
              <MenuList>
                <Link href={`/resumes/${info.getValue()}`} passHref>
                  <MenuItem
                    display={["flex", "none"]}
                    icon={<IconLink size="20" />}
                  >
                    Open
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => duplicate(info.getValue())}
                  icon={<IconCopy size="20" />}
                >
                  Duplicate
                </MenuItem>
                <DeleteResumeMenuItem
                  onDelete={() => handleOnDelete(info.getValue())}
                />
              </MenuList>
            </Menu>
          </Stack>
        ),
      }),
    ],
    [columnHelper, duplicate, handleOnDelete]
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
      return <Text>No resumes found</Text>;
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
          placeholder={`Search ${length(resumes)} resumes...`}
          value={search}
          onChangeValue={(nextValue) => setSearch(nextValue)}
          onClear={() => setSearch("")}
        />
        <ButtonGroup mr="2" size="sm" isAttached>
          <IconButton
            size="sm"
            aria-label="Grid view"
            icon={<IconGrid size={20} />}
            onClick={() => setView("grid")}
            isActive={equals(view, "grid")}
          />
          <IconButton
            size="sm"
            aria-label="List view"
            icon={<IconList size={20} />}
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
  const [_showDashboard, setShowDashboard] = useLocalStorageValue(
    "showDashboard",
    false,
    {
      initializeWithStorageValue: false,
    }
  );

  useMountEffect(() => {
    setShowDashboard(true);
  });

  return (
    <>
      <Head>
        <title>resumebuilder.dev</title>
      </Head>
      <Layout>
        <ResumeGrid />
      </Layout>
    </>
  );
}

export default Dashboard;
