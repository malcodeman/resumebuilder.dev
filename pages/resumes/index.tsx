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
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Search as IconSearch,
  Upload as IconUpload,
  Grid as IconGrid,
  List as IconList,
  X as IconX,
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
import * as R from "ramda";
import {
  DndContext,
  PointerSensor,
  DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useController, useForm } from "react-hook-form";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Cell } from "react-table";

import Layout from "../../components/Layout";
import ResumeItem from "../../components/resumes/ResumeItem";
import ImportDataModal from "../../components/resumes/ImportDataModal";
import Table from "../../components/misc/Table";

import { DEFAULT_VALUES } from "../../lib/constants";

import { Resume, Template, Fields, View } from "../../types";

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
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const { field } = useController({ name: "search", control: form.control });
  const searchInputRef = React.useRef(null);
  const [view, setView] = React.useState<View>("grid");
  const [hiddenColumns, setHiddenColumns] = React.useState([]);
  const isSmallDevice = useMediaQuery("only screen and (max-width: 30em)");
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Edited",
        accessor: "updatedAt",
        Cell: function updatedAtCell(props: Cell) {
          return (
            <>
              {formatDistanceToNow(props.value, {
                addSuffix: true,
              })}
            </>
          );
        },
      },
      {
        accessor: "id",
        Cell: function idCell(props: Cell) {
          return (
            <Link href={`/resumes/${props.value}`} passHref>
              <Button size="sm" leftIcon={<IconLink size={16} />}>
                Open
              </Button>
            </Link>
          );
        },
      },
    ],
    []
  );

  useKeyboardEvent(
    "s",
    (e) => {
      const isBody = e.target["tagName"] === "BODY";
      if (isBody && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    [],
    { event: "keyup" }
  );

  React.useEffect(() => {
    if (isSmallDevice && view === "grid") {
      setView("list");
    }
    if (isSmallDevice && view === "list") {
      setHiddenColumns(["updatedAt"]);
    } else {
      setHiddenColumns([]);
    }
  }, [isSmallDevice, view]);

  function handleOnDelete(id: string) {
    const nextResumes = resumes.filter((item) => item.id !== id);
    setResumes(nextResumes);
  }

  function handleOnDuplicate(id: string) {
    const resume = resumes.find((item) => item.id === id);
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
    const nextResumes = R.map((item) => {
      if (item.id === id) {
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
    const nextResumes = R.map((item) => {
      if (item.id === id) {
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
      const from = R.findIndex(R.propEq("id", active.id))(resumes);
      const to = R.findIndex(R.propEq("id", over.id))(resumes);
      const nextResumes = R.move(from, to, resumes);
      setResumes(nextResumes);
    }
  }

  if (R.isNil(resumes)) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (R.isEmpty(resumes)) {
    return (
      <Flex flexDirection="column" alignItems="center" padding="4">
        <Text>No Resumes</Text>
        <Text fontSize="small">Create a new resume to get started.</Text>
      </Flex>
    );
  }

  const filteredResumes = R.filter(
    (item) => R.includes(R.toLower(field.value), R.toLower(item.title)),
    resumes
  );

  function renderResumes() {
    if (R.isEmpty(filteredResumes)) {
      return <Text>No resumes found</Text>;
    }
    if (view === "grid") {
      return (
        <Grid
          gap="8"
          gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
          data-cy="resumes_grid"
        >
          <DndContext id="dnd" sensors={sensors} onDragEnd={handleOnDragEnd}>
            <SortableContext items={filteredResumes}>
              {R.map(
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
        hiddenColumns={hiddenColumns}
      />
    );
  }

  return (
    <>
      <Flex mb="4">
        <InputGroup size="sm">
          <InputLeftElement>
            <IconSearch size={16} />
          </InputLeftElement>
          <Input
            {...field}
            ref={searchInputRef}
            placeholder={`Search ${resumes.length} resumes...`}
            borderRadius="md"
            variant="filled"
          />
          <InputRightElement>
            {R.isEmpty(field.value) ? (
              <Kbd>S</Kbd>
            ) : (
              <IconButton
                size="xs"
                aria-label="Clear"
                icon={
                  <IconX
                    size={16}
                    onClick={() => form.setValue("search", "")}
                  />
                }
              />
            )}
          </InputRightElement>
        </InputGroup>
        <IconButton
          display={["none", "inline-flex"]}
          size="sm"
          aria-label="Grid view"
          ml="4"
          mr="2"
          icon={<IconGrid size={20} />}
          onClick={() => setView("grid")}
          isActive={view === "grid"}
        />
        <IconButton
          display={["none", "inline-flex"]}
          size="sm"
          aria-label="List view"
          icon={<IconList size={20} />}
          onClick={() => setView("list")}
          isActive={view === "list"}
        />
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
        <Flex justifyContent="flex-end" mb="4">
          <ButtonGroup size="sm" isAttached>
            <ResumeNewButton />
            <ImportDataButton />
          </ButtonGroup>
        </Flex>
        <ResumeGrid />
      </Layout>
    </>
  );
}

export default Dashboard;
