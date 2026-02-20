+++
date = '2026-02-06T14:14:55Z'
title = 'Go CLI Quickstart'
hideReply = true
+++

## Modules

Go modules are the standard way to manage dependencies and versioning.

### Initialize a module

Creates a `go.mod` file that tracks your module name and dependencies.

```bash
go mod init github.com/user/myproject
```

### Tidy dependencies

Downloads missing dependencies, removes unused ones, and updates `go.mod` and `go.sum`.

```bash
go mod tidy
```

### Download dependencies

Fetches all dependencies to the local cache without building.

```bash
go mod download
```

### Vendor dependencies

Copies all dependencies into a `vendor/` directory. Useful for reproducible builds or offline work.

```bash
go mod vendor
```

---

## Building & Running

### Run without building a binary

Compiles and runs in one step. Useful during development.

```bash
go run main.go
go run .                  # run package in current dir
go run ./cmd/myapp        # run package in subdirectory
```

### Build a binary

Compiles the package and outputs an executable. Default name matches the module or directory.

```bash
go build                  # outputs binary in current dir
go build -o myapp         # specify output name
go build ./cmd/myapp      # build a specific package
```

### Install globally

Builds and places the binary in `$GOPATH/bin` (or `$GOBIN`). Make sure this is in your `$PATH`.

```bash
go install                        # install current module
go install github.com/user/tool@latest   # install remote tool
```

---

## Testing

### Run tests

Runs all tests in the current package. Use `./...` to run tests recursively.

```bash
go test              # current package
go test ./...        # all packages recursively
go test ./pkg/...    # all packages under pkg/
```

### Verbose output

Shows each test name and result as it runs.

```bash
go test -v ./...
```

### Run specific tests

Use `-run` with a regex to filter test names.

```bash
go test -run TestFoo           # tests matching "TestFoo"
go test -run TestFoo/subtest   # specific subtest
```

### Coverage

Generate a coverage report. Use `-coverprofile` to save results for viewing.

```bash
go test -cover ./...
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out     # view in browser
go tool cover -func=coverage.out     # print per-function stats
```

### Race detector

Detects data races at runtime. Slower but catches concurrency bugs.

```bash
go test -race ./...
```

### Benchmarks

Runs benchmark functions (named `BenchmarkXxx`). `-bench .` runs all benchmarks.

```bash
go test -bench .
go test -bench BenchmarkFoo -benchmem   # include memory stats
```

---

## Formatting & Linting

### Format code

Rewrites source files to canonical Go style. Always run before committing.

```bash
go fmt ./...
```

### Vet for suspicious code

Static analysis that catches common mistakes (printf format errors, unreachable code, etc.).

```bash
go vet ./...
```

---

## Dependencies

### Add a dependency

Import it in your code, then run `go mod tidy`, or fetch it explicitly.

```bash
go get github.com/spf13/cobra
```

### Add a specific version

Pin to a version, commit, or branch.

```bash
go get github.com/spf13/cobra@v1.8.0
go get github.com/spf13/cobra@latest
go get github.com/user/repo@commitsha
```

### Update dependencies

Update a single dependency or all dependencies.

```bash
go get -u github.com/spf13/cobra       # update one
go get -u ./...                         # update all direct deps
go get -u all                           # update everything
```

### Remove a dependency

Delete the import from your code, then tidy.

```bash
go mod tidy
```

### List dependencies

Show all direct and indirect dependencies.

```bash
go list -m all
```

### Why is this dependency here?

Trace why a module is required.

```bash
go mod why github.com/some/module
```

---

## Information & Docs

### Show documentation

View docs for a package or symbol in the terminal.

```bash
go doc fmt
go doc fmt.Println
go doc -all fmt           # full package docs
```

### List packages

Show packages matching a pattern.

```bash
go list ./...                   # all packages in module
go list -m -versions github.com/spf13/cobra   # available versions
```

### Environment info

Print Go environment variables. Useful for debugging path issues.

```bash
go env
go env GOPATH GOBIN GOOS GOARCH
```

---

## Cross-Compilation

Go can compile for different OS/architecture combinations by setting `GOOS` and `GOARCH`.

```bash
GOOS=linux GOARCH=amd64 go build -o myapp-linux
GOOS=windows GOARCH=amd64 go build -o myapp.exe
GOOS=darwin GOARCH=arm64 go build -o myapp-mac
```

List all supported platforms:

```bash
go tool dist list
```

---

## Workspaces

Workspaces let you work on multiple modules simultaneously without publishing them.

### Initialize a workspace

Creates a `go.work` file.

```bash
go work init
```

### Add modules to workspace

Adds local module directories to the workspace.

```bash
go work use ./myapp ./mylib
```

### Sync workspace

Updates the workspace to match module requirements.

```bash
go work sync
```

---

## Useful Flags

### Build flags

```bash
go build -v              # print package names as they compile
go build -x              # print commands being executed
go build -ldflags "-s -w"   # strip debug info (smaller binary)
go build -tags mytag     # build with custom build tag
```

### Test flags

```bash
go test -timeout 30s     # fail if tests take too long
go test -short           # skip long-running tests
go test -count 1         # disable test caching
go test -shuffle on      # randomize test order
```
