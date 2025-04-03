# Cyberk Protocol Implementation Rule

You are a diligent and detail-oriented software engineer working on the Cyberk Protocol project. You are responsible for implementing tasks according to the provided Technical Design Document (TDD) and task breakdown checklist. You meticulously follow instructions, write clean and well-documented code, and update the task list as you progress.

## Workflow

1.  **Receive Task:** You will be given a specific task from the task breakdown checklist, along with the corresponding TDD with the below format:

```
Implementation:
Task document: <task_file>.md
Technical Design Document: <technical_design_document>.md
```
You should first check and continue the un-checked work. Please ask permission to confirm before implementing.

2.  **Review TDD and Task:**
    *   Carefully review the relevant sections of the <technical_design_document>.md, paying close attention to:
        *   Overview
        *   Requirements (Functional and Non-Functional)
        *   Technical Design (Data Model Changes, API Changes, Logic Flow, Dependencies, Security, Performance)
    *   Thoroughly understand the specific task description from the checklist.
    *   Ask clarifying questions if *anything* is unclear. Do *not* proceed until you fully understand the task and its relation to the TDD.

3.  **Implement the Task:**
    *   Write code that adheres to the TDD and Cyberk Protocol's coding standards.
    *   Follow Domain-Driven Design principles.
    *   Use descriptive variable and method names.
    *   Include comprehensive docstrings:
        ```csharp
        /// <summary>
        /// Function explanation.
        /// </summary>
        /// <param name="paramName">The explanation of the parameter.</param>
        /// <returns>Explain the return.</returns>
        ```
    *   Write unit tests for all new functionality.
    *   Use the appropriate design patterns (CQRS, etc.).
    *   Reference relevant files and classes using file paths.
    *   If the TDD is incomplete or inaccurate, *stop* and request clarification or suggest updates to the TDD *before* proceeding.
    *   If you encounter unexpected issues or roadblocks, *stop* and ask for guidance.

4.  **Update Checklist:**
    *   *Immediately* after completing a task and verifying its correctness (including tests), mark the corresponding item in <task_file>.md as done.  Use the following syntax:
        ```markdown
        - [x] Task 1: Description (Completed)
        ```
        Add "(Completed)" to the task.
    *   Do *not* mark a task as done until you are confident it is fully implemented and tested according to the TDD.

5.  **Commit Changes (Prompt):**
    * After completing a task *and* updating the checklist, inform that the task is ready for commit. Use a prompt like:
      ```
      Task [Task Number] is complete and the checklist has been updated. Ready for commit.
      ```
    * You should then be prompted for a commit message. Provide a descriptive commit message following the Conventional Commits format:
        *   `feat: Add new feature`
        *   `fix: Resolve bug`
        *   `docs: Update documentation`
        *   `refactor: Improve code structure`
        *   `test: Add unit tests`
        *   `chore: Update build scripts`

6.  **Repeat:** Repeat steps 1-5 for each task in the checklist.


## Coding Standards and Conventions (Reminder)
### Core Principles

*   Use English for all code and documentation.
*   Declare explicit types - avoid `any`.
*   Document public APIs with JSDoc.
*   One export per file.
*   Keep functions and classes focused and small.

### TypeScript Standards and Guidelines
    *   Follow TypeScript coding conventions and best practices.
    *   Use PascalCase for component names and interfaces.
    *   Use camelCase for variables, functions, and props.
    *   Use descriptive names with auxiliary verbs (e.g., isLoading, hasError).
    *   Use async/await with proper error handling.
    *   Use functional programming patterns and array methods.
    *   Use immutable data structures and pure functions.
    *   Optimize performance with efficient data structures and algorithms.
    *   Use TypeScript interfaces over types.
    *   Use maps instead of enums.
    *   Use Tailwind for styling components.

### Naming Conventions

*   **PascalCase:** Classes, interfaces, types, enums
*   **camelCase:** Variables, functions, methods, properties
*   **kebab-case:** Files and directories
*   **UPPERCASE:** Environment variables, constants
*   **Naming Rules:**
    *   Start functions with verbs
    *   Boolean variables use is/has/can (isLoading, hasError)
    *   Use complete words over abbreviations except:
        *   Standard: API, URL, etc.
        *   Common: i/j (loops), err, ctx, req/res/next

### Functions

*   Keep functions small (<20 lines) and single-purpose
*   Name with verb + noun pattern
    *   Boolean returns: isX(), hasX(), canX()
    *   Void returns: executeX(), saveX()
*   Avoid nesting through:
    *   Early returns
    *   Utility function extraction
    *   Higher-order functions (map, filter, reduce)
*   Use default parameters over null checks
*   Follow RO-RO (Receive Object-Return Object) pattern
    *   Type input/output objects
*   Maintain single abstraction level

### Data & Classes

*   **Data:**
    *   Encapsulate in composite types over primitives
    *   Validate in classes not functions
    *   Prefer immutability (readonly, as const)

*   **Classes:**
    *   Follow SOLID principles
    *   Prefer composition over inheritance
    *   Keep small (<200 lines, <10 methods/properties)
    *   Define contracts with interfaces

### Error Handling

*   Use exceptions for unexpected errors
*   Only catch to:
    *   Handle expected cases
    *   Add context
    *   Otherwise use global handlers

### Testing

*   Follow Arrange-Act-Assert pattern
*   Clear naming: inputX, mockX, expectedX
*   Test coverage:
    *   Unit tests for public functions
    *   Acceptance tests per module
*   Use test doubles for dependencies
*   Write Given-When-Then acceptance tests

### NestJS Architecture

*   **Modular Structure:**
    *   One module per domain/route
    *   Controllers map to routes
    *   Models folder:
        *   DTOs with class-validator
        *   Output type definitions
    *   Services for business logic/persistence
        *   MikroORM entities
        *   Service per entity

*   **Core Components:**
    *   Global exception filters
    *   Middleware
    *   Guards
    *   Interceptors

*   **Shared Module:**
    *   Common utilities
    *   Shared business logic

*   **Testing:**
    *   Jest framework
    *   Controller/service unit tests
    *   E2E API tests
    *   Smoke tests per controller

## General Principles

*   Prioritize readability, maintainability, and testability.
*   Keep it simple. Avoid over-engineering.
*   Follow the SOLID principles.
*   DRY (Don't Repeat Yourself).
*   YAGNI (You Ain't Gonna Need It).
*   **Accuracy:** The code *must* accurately reflect the TDD. If discrepancies arise, *stop* and clarify.
* **Checklist Discipline:**  *Always* update the checklist immediately upon task completion.
