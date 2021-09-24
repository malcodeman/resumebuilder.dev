import React from "react";
import Head from "next/head";
import {
  Flex,
  Button,
  useDisclosure,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Kbd,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { Upload } from "react-feather";
import { nanoid } from "nanoid";
import { useKeyboardEvent, useLocalStorageValue } from "@react-hookz/web";
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

import Layout from "../components/Layout";
import NewResumeModal from "../components/resumes/NewResumeModal";
import ResumeItem from "../components/resumes/ResumeItem";
import ImportDataModal from "../components/ImportDataModal";

import { DEFAULT_VALUES } from "../lib/constants";

import { Resume, Template, Fields } from "../types";

function ResumeNewButton() {
  const router = useRouter();
  const [resumes, setResumes] = useLocalStorageValue<Resume[]>("resumes", [], {
    initializeWithStorageValue: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useKeyboardEvent(
    "n",
    (e) => {
      const isBody = e.target["tagName"] === "BODY";
      if (isBody) {
        onOpen();
      }
    },
    [],
    { event: "keyup" }
  );

  function handleOnSubmit(data: { title: string }) {
    const resume = {
      ...DEFAULT_VALUES,
      id: nanoid(),
      title: data.title,
    };
    setResumes([...resumes, resume]);
    onClose();
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button mr="-px" data-cy="new_resume_btn" onClick={onOpen}>
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
      <NewResumeModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleOnSubmit}
      />
    </>
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
      meta: {
        template: Template.berlin,
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
        icon={<Upload size={20} />}
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

  if (R.isEmpty(resumes) || R.isNil(resumes)) {
    return (
      <Flex flexDirection="column" alignItems="center" padding="4">
        <Text>No Resumes</Text>
        <Text fontSize="small">Create a new resume to get started.</Text>
      </Flex>
    );
  }
  return (
    <Grid
      gap="8"
      gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
      data-cy="resumes_grid"
    >
      <DndContext id="dnd" sensors={sensors} onDragEnd={handleOnDragEnd}>
        <SortableContext items={resumes}>
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
            resumes
          )}
        </SortableContext>
      </DndContext>
    </Grid>
  );
}

function Home() {
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

export default Home;
