# Python: practical engineering guide

> Examples target modern Python 3. Exact behavior and available APIs depend on the Python version and installed packages. Consult the official documentation for the version your project supports.

## 1. Learn the data model before frameworks

Core built-in types include numbers, strings, booleans, lists, tuples, dictionaries, and sets. Understand mutability: a list or dictionary can be changed in place, while strings and tuples are immutable. Assignment binds a name to an object; it does not necessarily copy that object.

```python
original = {"tags": ["docs"]}
alias = original
alias["tags"].append("python")

assert original["tags"] == ["docs", "python"]
```

If independent nested data is required, choose a deliberate copy strategy. A shallow copy duplicates only the outer container; a deep copy recursively copies supported nested objects, which may not be appropriate for every object graph.

## 2. Functions, errors, and interfaces

Keep functions focused and make important assumptions explicit. Use exceptions for exceptional failure paths and catch the narrowest useful exception type. Avoid bare `except:` because it can hide programming errors and intercept signals such as interruption.

```python
def parse_port(raw: str) -> int:
    try:
        port = int(raw)
    except ValueError as exc:
        raise ValueError("port must be an integer") from exc

    if not 1 <= port <= 65535:
        raise ValueError("port must be between 1 and 65535")
    return port
```

Validate at external boundaries, but avoid repeating identical validation in every internal function if a validated type or clear interface already guarantees the invariant.

## 3. Modules and environments

- Put reusable code in importable modules and keep command-line entry points small.
- Use a virtual environment to isolate project dependencies.
- Declare dependencies and versions using the project's chosen packaging tool.
- Avoid relying on the current working directory or machine-specific absolute paths.
- Keep secrets out of source files and package artifacts.
- Pin dependencies for reproducible deployments where appropriate, and update them through a reviewed process.

## 4. Files and resources

Use context managers for resources that must be closed, such as files:

```python
from pathlib import Path

def read_text(path: Path) -> str:
    with path.open("r", encoding="utf-8") as file:
        return file.read()
```

Use explicit text encoding when portability matters. For untrusted or large files, consider size limits and streaming instead of loading all content into memory.

## 5. Type hints

Type hints communicate expected interfaces and help static analysis tools catch certain classes of mistakes. Python does not automatically enforce annotations at runtime. Use annotations to improve clarity, then combine them with tests and runtime validation where inputs cross trust boundaries.

```python
def average(values: list[float]) -> float:
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)
```

## 6. Testing

The standard `unittest` library provides test cases, assertions, fixtures, and test discovery. Other frameworks may provide different ergonomics; choose based on project needs.

Test:
- expected valid inputs;
- empty and malformed inputs;
- boundary values;
- exceptions and error messages when they are part of the contract;
- file/network/database boundaries using suitable test doubles or integration environments.

Do not mock every dependency by default. A test that mocks the behavior it is supposed to verify provides little confidence.

## 7. Concurrency choices

Python offers several models including synchronous code, threads, processes, and asynchronous I/O. They solve different problems. Threads can help with blocking I/O; processes can use multiple CPU cores for CPU-heavy work; async code helps coordinate many concurrent I/O operations when the libraries involved support it. Measure and understand the runtime model before choosing.

## 8. Python project review checklist

- [ ] Supported Python versions are documented.
- [ ] Dependencies are isolated and declared.
- [ ] Functions expose clear contracts and errors.
- [ ] Files and other resources are closed reliably.
- [ ] External inputs are validated.
- [ ] Type hints clarify important interfaces.
- [ ] Tests cover boundaries and failure cases.
- [ ] Logs avoid secrets and sensitive values.
- [ ] Packaging and execution do not depend on a developer's machine.

## Official references

- Python Tutorial: https://docs.python.org/3/tutorial/
- Built-in types: https://docs.python.org/3/library/stdtypes.html
- Errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- `unittest`: https://docs.python.org/3/library/unittest.html
- `venv`: https://docs.python.org/3/library/venv.html
- Typing: https://docs.python.org/3/library/typing.html

Last reviewed for this chapter: 2026-10-16.
