import React from "react";
import Head from "next/head";
import {
  Flex,
  Button,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Kbd,
  ButtonGroup,
  IconButton,
  Center,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Upload as IconUpload,
  Grid as IconGrid,
  List as IconList,
  Link as IconLink,
} from "react-feather";
import { nanoid } from "nanoid";
import {
  useKeyboardEvent,
  useLocalStorageValue,
  useMediaQuery,
  useMountEffect,
} from "@react-hookz/web";
import { useRouter } from "next/router";
import {
  map,
  filter,
  propEq,
  findIndex,
  isNil,
  move,
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
import ImportDataModal from "../../components/resumes/ImportDataModal";
import EmptyResumes from "../../components/resumes/EmptyResumes";
import Table from "../../components/misc/Table";

import { DEFAULT_VALUES } from "../../lib/constants";

import { Resume, Template, Fields, View } from "../../types";

import SearchInput from "../../components/misc/SearchInput";

function ResumeNewButton() {
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });

  useKeyboardEvent(
    "n",
    (e) => {
      const isBody = e.target["tagName"] === "BODY";
      if (isBody) {
        handleOnSubmit();
      }
    },
    [],
    { event: "keyup" }
  );

  function handleOnSubmit() {
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: "Untitled resume",
    };
    setResumes([...resumes, resume]);
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Button mr="-px" data-cy="new_resume_btn" onClick={handleOnSubmit}>
          New
        </Button>
      </PopoverTrigger>
      <PopoverContent width="unset">
        <PopoverBody display="inline-flex" alignItems="center">
          <Text marginInlineEnd="2" fontSize="sm">
            Press
          </Text>
          <Kbd>N</Kbd>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function ImportDataButton() {
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOnImport(fields: Fields) {
    const resume = {
      ...fields,
      id: nanoid(),
      title: "Untitled",
      icon: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      design: {
        template: Template.berlin,
        spacing: 1,
      },
    };
    setResumes([...resumes, resume]);
    onClose();
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <IconButton
        aria-label="Import"
        data-cy="import-button"
        onClick={onOpen}
        icon={<IconUpload size={20} />}
      />
      <ImportDataModal
        isOpen={isOpen}
        onClose={onClose}
        onImport={handleOnImport}
      />
    </>
  );
}

function ResumeGrid() {
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
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
  const isSmallDevice = useMediaQuery("only screen and (max-width: 30em)");
  const columnHelper = createColumnHelper<Resume>();
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
          <Link href={`/resumes/${info.getValue()}`} passHref>
            <Button size="sm" leftIcon={<IconLink size={16} />}>
              Open
            </Button>
          </Link>
        ),
      }),
    ],
    [columnHelper]
  );

  React.useEffect(() => {
    if (and(isSmallDevice, equals(view, "grid"))) {
      setView("list");
    }
    if (and(isSmallDevice, equals(view, "list"))) {
      setColumnVisibility({ updatedAt: false });
    } else {
      setColumnVisibility({});
    }
  }, [isSmallDevice, view]);

  function handleOnDelete(id: string) {
    const nextResumes = resumes.filter((item) => item.id !== id);
    setResumes(nextResumes);
  }

  function handleOnDuplicate(id: string) {
    const resume = resumes.find((item) => equals(item.id, id));
    const value = {
      ...resume,
      id: nanoid(),
      title: `${resume.title} copy`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setResumes([...resumes, value]);
  }

  function handleOnTitleChange(id: string, nextValue: string) {
    const nextResumes = map((item) => {
      if (equals(item.id, id)) {
        return {
          ...item,
          title: nextValue,
          updatedAt: Date.now(),
        };
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  function handleOnIconChange(id: string, emoji: string) {
    const nextResumes = map((item) => {
      if (equals(item.id, id)) {
        return {
          ...item,
          icon: emoji,
          updatedAt: Date.now(),
        };
      }
      return item;
    }, resumes);
    setResumes(nextResumes);
  }

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const from = findIndex(propEq("id", active.id))(resumes);
      const to = findIndex(propEq("id", over.id))(resumes);
      const nextResumes = move(from, to, resumes);
      setResumes(nextResumes);
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
          gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
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
                    onDuplicate={handleOnDuplicate}
                    onTitleChange={handleOnTitleChange}
                    onIconChange={handleOnIconChange}
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
            display={["none", "inline-flex"]}
            size="sm"
            aria-label="Grid view"
            icon={<IconGrid size={20} />}
            onClick={() => setView("grid")}
            isActive={equals(view, "grid")}
          />
          <IconButton
            display={["none", "inline-flex"]}
            size="sm"
            aria-label="List view"
            icon={<IconList size={20} />}
            onClick={() => setView("list")}
            isActive={equals(view, "list")}
          />
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached>
          <ResumeNewButton />
          <ImportDataButton />
        </ButtonGroup>
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
