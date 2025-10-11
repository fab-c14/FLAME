import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Code,
  Divider,
} from "@chakra-ui/react";

const Documentation = () => {
  return (
    <Box as="article" py={8} px={4}>
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={6}>
          FLAME — Docs & Getting Started
        </Heading>

        <Text mb={4}>
          This guide helps students and instructors get the most out of FLAME.
          It covers quick setup, editor basics, how batches and assignments
          work, the instructor workflow, and common troubleshooting steps.
        </Text>

        <Heading as="h3" size="md" mt={6} mb={2}>
          Quick Start (Students)
        </Heading>
        <UnorderedList mb={4}>
          <ListItem>
            Register for an account and confirm your email (if required).
          </ListItem>
          <ListItem>
            Log in and open the Editor from the top navigation.
          </ListItem>
          <ListItem>
            Select the language, open an assignment or start a practice problem,
            type your solution and run the provided test cases.
          </ListItem>
          <ListItem>
            Submit when green — the system records your submission and test
            history.
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Editor Basics
        </Heading>
        <Text mb={3}>
          The Editor provides a focused coding space with support for multiple
          languages. Key features:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Language selector — pick the language for compilation/execution.
          </ListItem>
          <ListItem>
            Test runner — run your code against pre-defined testcases and see
            pass/fail output.
          </ListItem>
          <ListItem>
            Auto-saving & submission history — each run and submission is kept
            so you can review changes and results.
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Working with Batches & Assignments
        </Heading>
        <Text mb={3}>
          Batches are instructor-managed groups (courses or lab sections).
          Assignments are posted to batches. Students join batches to get
          assignment access and submit work.
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Join a batch using a code or link from your instructor.
          </ListItem>
          <ListItem>
            Open an assignment to view instructions, sample I/O, and testcases.
          </ListItem>
          <ListItem>
            Submit code directly from the editor; results are auto-graded when
            testcases are defined.
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Instructor Workflow
        </Heading>
        <Text mb={3}>
          Instructors can create batches, add assignments, and inspect
          submissions. Key steps:
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Create a batch for your course and invite students via link or code.
          </ListItem>
          <ListItem>
            Create assignments with description, starter code, and testcases.
            Use private testcases for grading accuracy.
          </ListItem>
          <ListItem>
            Monitor student progress via analytics and export reports for
            grading or attendance.
          </ListItem>
          <ListItem>
            Provide feedback through submission comments and allow resubmissions
            where appropriate.
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Grading & Testcases
        </Heading>
        <Text mb={3}>
          Design testcases to cover required behavior and edge cases. Use a mix
          of visible (student-facing) and hidden testcases for final grading.
        </Text>
        <UnorderedList mb={4}>
          <ListItem>
            Visible tests help students verify correctness while coding.
          </ListItem>
          <ListItem>
            Hidden tests preserve grading integrity and are run on final
            submission.
          </ListItem>
          <ListItem>
            Set reasonable time/memory limits for automated runs.
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Integrations & Export
        </Heading>
        <Text mb={4}>
          You can export grades and submission logs for LMS integration or
          record-keeping. Contact the development team for custom integrations
          (LMS APIs, CSV formats, etc.).
        </Text>

        <Heading as="h3" size="md" mt={4} mb={2}>
          Troubleshooting & FAQs
        </Heading>
        <UnorderedList mb={4}>
          <ListItem>
            I can't run my code — Check language selection and ensure your code
            compiles locally. Also check console output for runtime errors.
          </ListItem>
          <ListItem>
            Submissions not appearing — ensure you're signed into the correct
            account and you joined the correct batch.
          </ListItem>
          <ListItem>
            Tests timing out — try optimizing your code for complexity or
            contact the instructor to review testcase limits.
          </ListItem>
        </UnorderedList>

        <Divider my={6} />
        <Heading as="h3" size="md" mt={4} mb={2}>
          Contact & Contribution
        </Heading>
        <Text mb={4}>
          For feature requests or bug reports, open an issue on the project
          repository. Instructors interested in pilot programs or custom
          integrations can reach out via the project's contact info.
        </Text>
      </Container>
    </Box>
  );
};

export default Documentation;
