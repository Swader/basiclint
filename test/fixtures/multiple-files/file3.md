# Printing "Hello, World!" in Assembly Language

In this tutorial, we'll learn how to print "Hello, World!" using assembly
language on a Unix-like operating system with the x86_64 architecture.

## Prerequisites

- Basic understanding of assembly language.
- An assembler like **NASM** installed on your system.
- A linker like **ld**.

## The Assembly Code

Create a file named `hello.asm` and add the following code:

```assembly
section .data
    msg db "Hello, World!", 0xA  ; The string to print with a newline character
    len equ $ - msg              ; Compute the length of the string

section .text
    global _start

_start:
    ; Write the message to stdout
    mov eax, 1      ; System call number for sys_write
    mov edi, 1      ; File descriptor (stdout)
    mov rsi, msg    ; Address of the string to output
    mov edx, len    ; Number of bytes
    syscall         ; Make the system call

    ; Exit the program
    mov eax, 60     ; System call number for sys_exit
    xor edi, edi    ; Exit code 0
    syscall         ; Make the system call
```

## Explanation

- **Data Section (`section .data`)**:
  - `msg db "Hello, World!", 0xA`: Defines the message string with a newline character.
  - `len equ $ - msg`: Calculates the length of `msg`.
  
- **Text Section (`section .text`)**:
  - `global _start`: Defines the entry point of the program.
  
- **_start**:
  - **System Call `sys_write`**:
    - `mov eax, 1`: System call number for `write`.
    - `mov edi, 1`: File descriptor for standard output.
    - `mov rsi, msg`: Pointer to the message string.
    - `mov edx, len`: Length of the message.
    - `syscall`: Calls the kernel.

  - **System Call `sys_exit`**:
    - `mov eax, 60`: System call number for `exit`.
    - `xor edi, edi`: Exit status `0`.
    - `syscall`: Exits the program.

## Assembling and Running the Program

1. **Assemble the code**:

   ```bash
   nasm -f elf64 hello.asm -o hello.o
   ```

2. **Link the object file**:

   ```bash
   ld hello.o -o hello
   ```

3. **Run the executable**:

   ```bash
   ./hello
   ```

   You should see the following output:

   ```bash
   Hello, World!
   ```

## Conclusion

You've successfully written and executed an assembly program that prints "Hello,
World!" to the console. This simple program demonstrates how system calls are
used in assembly to interact with the operating system.
